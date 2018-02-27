<template>
    <div class="main-menu">
        <div class="menu">
            <b-nav vertical>
                <b-nav-item @click="openMenu" class="--rounded --black --correction">
                    <i class="fp fp-menu"></i></b-nav-item>
                <b-nav-item v-show="!isChoosing" @click="toggleInfoBox" class="--rounded">
                    <i :class="[isInfoBoxOpen ? 'fp-close' : 'fp-info', 'fp']"></i></b-nav-item>
                <b-nav-item v-show="!isChoosing" class="--rounded">
                    <a href="#" @click.prevent v-b-modal.instruction-modal>
                        <i class="fp fp-info"></i></a></b-nav-item>
                <b-nav-item v-show="!isChoosing" @click="saveScreenshot" class="--rounded">
                    <i class="fp fp-camera"></i></b-nav-item>
            </b-nav>
            <flight-dashboard v-show="isAnimationActive" :is-animation-active="isAnimationActive">
            </flight-dashboard>
            <transition name="fade"><main-nav v-show="isMenuOpen"></main-nav></transition>
            <transition name="fade"><info-box v-show="isInfoBoxOpen"></info-box></transition>
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
  computed: {
    isMenuOpen() { return this.$store.state.general.isMenuOpen; },
    isAnimationActive() {
      return (this.$store.state.flightSimulator.isActive && this.$route.name === 'flight-simulator');
    },
    isInfoBoxOpen() {
      return this.$store.state.general.isInfoBoxOpen;
    },
    isChoosing() {
      return this.$store.state.general.isChoosingDestination;
    },
  },
  methods: {
    toggleInfoBox() {
      this.$store.commit('general/toggleInfoBox');
    },
    openMenu() {
      this.$store.commit('general/closeInfoBox');
      this.$store.commit('general/toggleMenu');
    },
    saveScreenshot() {
      this.$store.commit('flightSimulator/saveImage');
    },
  },
};
</script>
<style lang="scss">
    @import "~css/_variables_and_mixins.scss";
</style>
