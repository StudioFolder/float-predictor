<template>
    <div id="app"
         class="main-application" :class="classObject">
        <div class="site-header">
            <main-menu />
            <nav-brand ref="navBrand" />
            <on-board-navigation />
            <recentre />
        </div>
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
                <transition>
                    <visualization />
                </transition>
            </div>
        </div>
        <div class="footer modal-contents">
            <instructions />
            <impressum />
            <modal-winner-explorer />
        </div>
    </div>
</template>

<script>

import navBrand from './components/NavBrand';
import mainMenu from './components/MainMenu';
import visualization from './components/Visualization';
import instructions from './components/parts/InstructionsModal';
import impressum from './components/parts/ImpressumModal';
import modalWinnerExplorer from './components/parts/ModalWinnerExplorer.Vue';
import onBoardNavigation from './components/parts/OnBoardNavigation';
import recentre from './components/parts/Recentre';

export default {
  components: {
    visualization,
    mainMenu,
    navBrand,
    instructions,
    modalWinnerExplorer,
    impressum,
    onBoardNavigation,
    recentre,
  },
  name: 'App',
  data() {
    return {
      offsetHeight: 0,
      transitionEnter: false,
      transitionLeave: false,
      isBottom: false,
    };
  },
  computed: {
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
    },
    afterEnter() {
      // after enter of new element
      if (this.transitionName === 'fade-middle-to-top'/* || this.transitionName === 'to-bottom' */) {
        this.$store.commit('general/setAnimationHeight', 'small');
      } else {
        this.$store.commit('general/setAnimationHeight', 'normal');
      }
      // for the case in which this pages are landing pages
      if (this.$route.name === 'about' || this.$route.name === 'aerocene-explorer') {
        this.$store.commit('general/setAnimationHeight', 'small');
      }

      // animate nav brand
      if (this.$route.name === 'home-page') {
        this.$refs.navBrand.$el.classList.remove('--pages');
        this.$refs.navBrand.$el.classList.add('--home');
      } else {
        this.$refs.navBrand.$el.classList.remove('--home');
        this.$refs.navBrand.$el.classList.add('--pages');
      }

      // set bottom class
      this.isBottom = (this.$route.name === 'gallery');
      this.transitionEnter = false;
    },
    beforeLeave() {
      this.transitionLeave = true;
    },
    onLeave() {
    },
    afterLeave(el) {
      this.transitionLeave = false;
      // set bottom class
      if (el.id === 'gallery') {
        this.isBottom = (this.$route.name === 'gallery');
      }
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/main";
    canvas {
        display: none;
    }
</style>
