<template>
    <div id="app"
         class="main-application"
         :class="{'choosing-destination': isChoosing}"
         ref="mainApplication">
        <nav-brand/>
        <main-menu />
        <div class="router-view top" ref="topContent">
            <transition name="fade"
                    @before-enter="beforeEnter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    >
                <router-view/>
            </transition>
        </div>
        <div class="main-visualization-wrapper" id="middleContent" ref="middleContent">
            <router-link to="/flight-simulator">
                <div class="cover"></div></router-link>
            <flight-form v-if="isChoosing">
            </flight-form>
            <visualization />
        </div>
        <div class="router-view bottom" ref="bottomContent">
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
    isChoosing() { return this.$store.state.general.isChosingDestination; },
    transitionName() { return this.$store.state.general.transitionName; },
  },
  methods: {
    beforeEnter() {
      const mid = document.getElementById('middleContent');
      let offsetTop = 0;

      if (this.transitionName === 'to-middle') {
        offsetTop = window.innerHeight;
      }
      this.scroll(offsetTop, mid);
    },
    afterEnter() {
    },
    beforeLeave() {
    },
    scroll(position, mid) {
      const body = document.querySelector('body');

      Velocity(body, 'scroll', {
        offset: position,
        mobileHA: false,
        duration: 1000,
        begin: () => {
          if (this.transitionName === 'to-middle' && mid.classList.contains('small')) {
            mid.classList.remove('small');
          }
        },
        complete: () => {
          if (this.transitionName !== 'to-middle' && !mid.classList.contains('small')) {
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

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
/*
.router-view.top .middle-to-top-enter-active {
    animation: slide-down 1.2s ease;
}
.router-view.top .top-to-middle-leave-active {
    animation: slide-up 1.2s;
}
@keyframes slide-up {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(0, -160%, 0); // to leverage 3d acceleration
        opacity: 0;
    }
}
@keyframes slide-down {
    0% {
        transform: translate3d(0, -100%, 0); // to leverage 3d acceleration
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}
*/
</style>
