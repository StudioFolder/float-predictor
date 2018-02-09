<template>
    <div class="main-menu">
        <div class="menu">
            <b-nav vertical>
                <b-nav-item @click="openMenu" class="--rounded --black --correction">
                    <i class="fp fp-menu"></i></b-nav-item>
                <b-nav-item v-show="isAnimationActive" @click="toggleInfoBox" class="--rounded">
                    <i :class="[isInfoBoxOpen ? 'fp-close' : 'fp-info', 'fp']"></i></b-nav-item>
            </b-nav>
            <flight-dashboard v-show="isAnimationActive" :is-animation-active="isAnimationActive">
            </flight-dashboard>
            <main-nav v-show="isMenuOpen"></main-nav>
            <info-box v-show="isInfoBoxOpen"></info-box>
        </div>
    </div>
</template>
<script>
import infoBox from './parts/InfoBox';
import mainNav from './parts/MainNav';
import flightDashboard from './parts/FlightDashboard';

export default {
  name: 'main-menu',
  components: { infoBox, mainNav, flightDashboard },
  data() {
    return {
      isInfoBoxOpen: false,
    };
  },
  computed: {
    isMenuOpen() { return this.$store.state.general.isMenuOpen; },
    isAnimationActive() { return this.$store.state.flightSimulator.isActive; },
  },
  methods: {
    toggleInfoBox() {
      this.isInfoBoxOpen = !this.isInfoBoxOpen;
    },
    openMenu() {
      this.isInfoBoxOpen = false;
      this.$store.commit('general/toggleMenu');
    },
  },
};
</script>
<style lang="scss">
    @import "~css/_variables_and_mixins.scss";
</style>
