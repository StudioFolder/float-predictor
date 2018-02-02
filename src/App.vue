<template>
    <div id="app" class="main-application" :class="{'choosing-destination': isChoosing}">
        <nav-brand/>
        <div class="router-view top">
            <transition>
                <router-view/>
            </transition>
        </div>
        <main-menu />
        <div>
            <div class="cover"></div><!--to prevent interactions-->
            <visualization />
        </div>
        <div class="router-view bottom">
            <transition>
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
    this.transitionName = 'scroll';
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
</style>
