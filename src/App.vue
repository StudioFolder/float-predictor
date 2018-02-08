<template>
    <div id="app"
         class="main-application"
         :class="{'choosing-destination': isChoosing}">
        <nav-brand/>
        <main-menu />
        <flight-form v-if="isChoosing">
        </flight-form>
        <div class="router-view top" id="topContent">
            <transition
                    :name="transitionName"
                    @before-enter="beforeEnter"
                    @leave ="onLeave"
                    >
                <router-view/>
            </transition>
        </div>
        <div class="main-visualization-wrapper" id="middleContent">
            <router-link to="/flight-simulator">
                <div class="cover"></div></router-link>
            <visualization />
        </div>
        <div class="router-view bottom" id="bottomContent">
            <transition :name="transitionName">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>

import Velocity from 'velocity-animate';
import navBrand from './components/NavBrand';
import mainMenu from './components/MainMenu';
import visualization from './components/Visualization';
import flightForm from './components/FlightForm';

export default {
  components: {
    visualization,
    mainMenu,
    navBrand,
    flightForm,
  },
  name: 'App',
  data() {
    return {
      offsetHeight: 0,
    };
  },
  computed: {
    isChoosing() { return (this.$route.name === 'flight-simulator' && this.$store.state.general.isChoosingDestination); },
    transitionName() { return this.$store.state.general.transitionName; },
  },
  methods: {
    beforeEnter() {
      const mid = document.getElementById('middleContent');
      let offsetTop = 0;

      if (this.transitionName === 'top-to-middle') {
        offsetTop = window.innerHeight;
      }
      this.scroll(offsetTop, mid);
    },
    onLeave(el) {
      if (this.transitionName === 'top-to-middle') {
        if (window.innerHeight < el.offsetHeight) {
          // little adjustment for content higher than the window
          const deltaY = (window.innerHeight - el.offsetHeight);
          Velocity(el, { translateY: `${deltaY}px` }, { duration: 900 }, 'linear');
        }
      }
    },
    scroll(position, mid) {
      const body = document.querySelector('body');

      Velocity(body, 'scroll', {
        offset: position,
        mobileHA: false,
        duration: 900,
        begin: () => {
          if (this.transitionName === 'top-to-middle' && mid.classList.contains('small')) {
            mid.classList.remove('small');
          }
        },
        complete: () => {
          if (this.transitionName !== 'top-to-middle' && !mid.classList.contains('small')) {
            mid.classList.add('small');
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/main";

.main-application {
    transition: padding-top .9s ease;
    padding-top: 0;
    &.choosing-destination {
        padding-top: 40vh;
    }
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .6s ease;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
.middle-to-top-enter {
    height: 100vh;
}
.router-view.top .middle-to-top-enter-active {
    transition: height .6s;
    animation: fade-down .9s;
}
@keyframes fade-down {
    0% {
        opacity: 0;
        // transform: translate3d(0, 200px, 0);
    }
    100% {
        opacity: 1;
        // transform: translate3d(0, -200px, 0); // to leverage 3d acceleration
    }
}
.router-view.top .top-to-middle-leave-active {
    animation: fade-up .9s;
    // transition: transform .9s;
}
@keyframes fade-up {
    0% {
        opacity: 1;
        // transform: translate3d(0, 0, 0);
    }
    100% {
        opacity: 0;
        // transform: translate3d(0, -200px, 0); // to leverage 3d acceleration
        height: 100vh;
    }
}
</style>
