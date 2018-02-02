<template>
    <div id="app" class="main-application" :class="{'choosing-destination': isChoosing}">
        <nav-brand/>
        <div class="router-view top">
            <transition :name="transitionName">
                <router-view/>
            </transition>
        </div>
        <main-menu />
        <div>
            <div class="cover"></div><!--to prevent interactions-->
            <visualization />
        </div>
        <div class="router-view bottom">
            <transition :name="transitionName">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>

import navBrand from './components/NavBrand';
import mainMenu from './components/MainMenu';
import visualization from './components/Visualization';

export default {
  components: {
    visualization,
    mainMenu,
    navBrand },
  name: 'App',
  data() {
    return {
      transitionName: 'scroll',
    };
  },
  computed: {
    isChoosing() { return this.$store.state.general.isChosingDestination; },
  },
  beforeRouteUpdate(to, from, next) {
    const fromTop = from.matched.some(m => m.meta.position === 'top');
    const fromBottom = from.matched.some(m => m.meta.position === 'bottom');
    const toTop = to.matched.some(m => m.meta.position === 'top');
    const toBottom = to.matched.some(m => m.meta.position === 'bottom');
    // from top to top -> fade
    if (fromTop && toTop) {
      this.transitionName = 'fade';
    }
    // from top to bottom -> slide down
    if (fromTop && toBottom) {
      this.transitionName = 'slide-to-bottom';
    }
    // from bottom to top -> slide top
    if (fromBottom && toTop) {
      this.transitionName = 'slide-to-top';
    }
    next();
  },
};
</script>

<style lang="scss">
@import "assets/css/main";

.main-application {
position: relative;
    @include medium_up {
      width: 100vw;
      height: 100vh;
    }
    .main-visualization {
        top: 0;
    }
    &.choosing-destination {
        .main-visualization {
            top: 40%;
        }
    }
}
.main-content {
    width: 100%;
    height: 100%;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
.child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
</style>
