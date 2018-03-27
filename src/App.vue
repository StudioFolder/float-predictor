<template>
    <div id="app"
         class="main-application" :class="classObject">
        <site-header ref="siteHeader" />
        <dashboard v-show="flightToolsActive"/>
        <div class="site-content" :class="{'--bottom': isBottom}">
            <div class="router-view" ref="content">
                <transition
                        appear
                        :name="transitionName"
                        :mode="transitionMode"
                        @before-enter="beforeEnter"
                        @enter="onEnter"
                        @afterEnter="afterEnter"
                        @before-leave="beforeLeave"
                        @leave="onLeave"
                        @after-leave="afterLeave">
                    <router-view/>
                </transition>
            </div>
            <div class="main-visualization-wrapper"
                 ref="simulator"
                 :class="{'--small': isSmall, '--bottom': isBottom}">
                <div class="cover">
                    <router-link to="/flight-simulator" class="link-to-flight-sim">
                    </router-link>
                </div>
                <visualization v-if="isExhibitionClient" />
            </div>
        </div>
        <site-footer />
    </div>
</template>

<script>
import { TweenLite } from 'gsap';
// eslint-disable-next-line
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import visualization from './components/Visualization';
import siteHeader from './components/Header';
import dashboard from './components/Dashboard';
import siteFooter from './components/Footer';

export default {
  components: {
    visualization,
    siteHeader,
    dashboard,
    siteFooter,
  },
  name: 'App',
  data() {
    return {
      contentOffset: 0,
      transitionEnter: false,
      transitionLeave: false,
      isBottom: false,
      duration: 1,
    };
  },
  computed: {
    flightToolsActive() {
      return this.$route.name === 'flight-simulator';
    },
    isExhibitionClient() {
      return this.$route.name !== 'VisualizationClient';
    },
    transitionName() { return this.$store.state.general.transitionName; },
    transitionMode() { return this.$store.state.general.transitionMode; },
    isSmall() { return this.$store.state.general.animationHeight === 'small'; },
    classObject() { // to synchronize other transitions i put some classes in main app too
      const obj = {
        'choosing-destination': this.$store.state.general.isChoosingDestination,
        'transition-enter': this.transitionEnter,
        'transition-leave': this.transitionLeave,
      };
      obj[`${this.transitionName}-entering`] = this.transitionEnter;
      obj[`${this.transitionName}-leaving`] = this.transitionLeave;
      return obj;
    },
  },
  methods: {
    beforeEnter() {
      this.transitionEnter = true;
    },
    onEnter() {
      if (this.transitionName === 'bottom-to-top') {
        const height = document.querySelector('.bottom-to-top-enter-active article').offsetHeight;
        TweenLite.fromTo(window, this.duration * 2, { scrollTo: height }, { scrollTo: 0 });
      } else if (this.transitionName === 'fade') {
        TweenLite.to(window, this.duration, { scrollTo: 0 });
        this.$store.commit('general/setAnimationHeight', 'small');
      }
    },
    afterEnter() {
      // after enter of new element
      if (this.transitionName === 'fade-middle-to-top') {
        this.$store.commit('general/setAnimationHeight', 'small');
      } else {
        this.$store.commit('general/setAnimationHeight', 'normal');
      }
      // for the cases in which this pages are landing pages
      if (this.$route.name === 'about'
        || this.$route.name === 'aerocene-explorer'
        || this.$route.name === 'resources-and-api') {
        this.$store.commit('general/setAnimationHeight', 'small');
        this.$store.commit('flightSimulator/setVisualizationState', 6);
      } else if (this.$route.name === 'gallery') {
        this.$store.commit('flightSimulator/setVisualizationState', 7);
      }
      // animate nav brand
      if (this.$route.name === 'home-page') {
        this.$refs.siteHeader.$el.classList.remove('--pages');
        this.$refs.siteHeader.$el.classList.add('--home');
      } else {
        this.$refs.siteHeader.$el.classList.remove('--home');
        this.$refs.siteHeader.$el.classList.add('--pages');
      }
      // set bottom class
      this.isBottom = (this.$route.name === 'gallery');
      this.transitionEnter = false;

      // set new content offset
      this.setContentOffset();
    },
    beforeLeave() {
      this.transitionLeave = true;
    },
    onLeave() {
      if (this.transitionName === 'fade-middle-to-top') {
        const height = document.querySelector('.fade-middle-to-top-enter-active article').offsetHeight;
        TweenLite.to('.fade-middle-to-top-leave-active',
          this.duration * 2,
          { y: height });
        TweenLite.from('.fade-middle-to-top-enter-active',
          this.duration * 2,
          { y: height * -1 });
      } else if (this.transitionName === 'top-to-middle') {
        const height = document.querySelector('.top-to-middle-leave-active article').offsetHeight;
        TweenLite.to(window, this.duration, { scrollTo: height });
      } else if (this.transitionName === 'top-to-bottom') {
        const height = document.querySelector('.top-to-bottom-leave-active article').offsetHeight;
        TweenLite.to('.top-to-bottom-leave-active',
          this.duration * 2,
          { y: height * -1 });
      } else if (this.transitionName === 'bottom-to-middle') {
        TweenLite.to(window, this.duration, { scrollTo: 0 });
      }
    },
    afterLeave(el) {
      this.transitionLeave = false;
      // set bottom class
      if (el.id === 'gallery') {
        this.isBottom = (this.$route.name === 'gallery');
      }
    },
    async setContentOffset() {
      const title = await this.getTitleElement();
      let contentOffset = 0;
      if (title) {
        contentOffset = title.offsetTop - title.offsetHeight;
      }
      this.contentOffset = contentOffset;
      if (window.pageYOffset > contentOffset) {
        this.$refs.siteHeader.$el.classList.add('--scroll');
      } else {
        this.$refs.siteHeader.$el.classList.remove('--scroll');
      }
    },
    getTitleElement() {
      return new Promise((resolve) => {
        resolve(document.querySelector('.entry-title'));
      });
    },
    handleScroll() {
      if (window.pageYOffset > this.contentOffset) {
        this.$refs.siteHeader.$el.classList.add('--scroll');
      } else {
        this.$refs.siteHeader.$el.classList.remove('--scroll');
      }
    },
  },
  created() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
};
</script>

<style lang="scss">
@import "assets/css/main";
</style>
