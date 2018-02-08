<template>
    <div id="app"
         class="main-application"
         :class="{'choosing-destination': isChoosing}">
        <nav-brand/>
        <main-menu />
        <div class="router-view top" id="topContent">
            <transition
                    :name="transitionName"
                    :mode="transitionMode"
                    @before-enter="beforeEnter"
                    @leave ="onLeave"
                    >
                <router-view/>
            </transition>
        </div>
        <div class="main-visualization-wrapper" id="middleContent" :class="{small: isSmall}">
            <router-link to="/flight-simulator">
                <div class="cover"></div></router-link>
            <visualization />
        </div>
        <div class="router-view bottom" id="bottomContent">
            <transition :name="transitionName">
                <router-view/>
            </transition>
        </div>
        <div class="footer modal-contents">
            <instructions>
            </instructions>
        </div>
    </div>
</template>

<script>

import Velocity from 'velocity-animate';
import navBrand from './components/NavBrand';
import mainMenu from './components/MainMenu';
import visualization from './components/Visualization';
import instructions from './components/parts/InstructionsModal';

export default {
  components: {
    visualization,
    mainMenu,
    navBrand,
    instructions,
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
    transitionMode() { return this.$store.state.general.transitionMode; },
    isSmall() { return this.$store.state.general.animationHeight === 'small'; },
  },
  methods: {
    beforeEnter() {
      let offsetTop = 0;
      if (this.transitionName === 'top-to-middle') {
        offsetTop = window.innerHeight;
        this.scroll(offsetTop);
      } else {
        this.scroll(offsetTop);
      }
      // eslint-disable-next-line
      console.log(this.transitionName)
    },
    onLeave(el) {
      if (this.transitionName === 'top-to-middle') {
        if (window.innerHeight < el.offsetHeight) {
          // little adjustment for content higher than the window
          const deltaY = (window.innerHeight - el.offsetHeight);
          Velocity(el, { translateY: `${deltaY}px` }, { duration: 900 }, 'linear');
        }
      } else if (this.transitionName === 'fade-middle-to-top') {
        const height = el.offsetHeight * -1;
        // eslint-disable-next-line
        console.log(height);
        Velocity(el, { translateY: `${height}px` }, { duration: 900 }, 'linear');
        Velocity(el, { height: '0px' }, { duration: 900 }, 'linear');
      }
    },
    scroll(position) {
      const body = document.querySelector('body');

      Velocity(body, 'scroll', {
        offset: position,
        mobileHA: false,
        duration: 900,
        begin: () => {
          if (this.transitionName === 'top-to-middle') {
            this.$store.commit('general/setAnimationHeight', 'normal');
          }
        },
        complete: () => {
          if (this.transitionName !== 'top-to-middle') {
            this.$store.commit('general/setAnimationHeight', 'small');
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/main";

// fade
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}

// middle to top
.middle-to-top-enter {
    height: 100vh;
}
.router-view.top .middle-to-top-enter-active {
    transition: height .6s;
    animation: fade .9s;
}

// fade middle to top
.fade-middle-to-top-enter-active {
    animation: fade .9s;
}
.fade-middle-to-top-leave {
    opacity: 1;
}
.router-view.top .fade-middle-to-top-leave-active {
    opacity: 0;
    // height: 0;
    transition: opacity .9s, height .9s;
}

// top to middle
.router-view.top .top-to-middle-leave-active {
    animation: fade-up .9s;
    // transition: transform .9s;
}

// animations
@keyframes fade {
    0% {
        opacity: 0;
        // transform: translate3d(0, 200px, 0);
    }
    100% {
        opacity: 1;
        // transform: translate3d(0, -200px, 0); // to leverage 3d acceleration
    }
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
