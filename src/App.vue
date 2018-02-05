<template>
    <div id="app" class="main-application" :class="{'choosing-destination': isChoosing}">
        <nav-brand/>
        <main-menu />
        <div class="router-view top">
            <transition :name="transitionName">
                <router-view/>
            </transition>
        </div>
        <div class="main-visualization-wrapper">
            <router-link to="/flight-simulator">
                <div class="cover"></div></router-link>
            <flight-form v-if="isChoosing">
            </flight-form>
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
import flightForm from './components/FlightForm';

export default {
  components: {
    visualization,
    mainMenu,
    navBrand,
    flightForm,
  },
  name: 'App',
  computed: {
    isChoosing() { return this.$store.state.general.isChosingDestination; },
    transitionName() { return this.$store.state.general.transitionName; },
  },
};
</script>

<style lang="scss">
@import "assets/css/main";

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
}
</style>
