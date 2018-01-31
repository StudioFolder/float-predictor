<template>
    <div class="main-menu">
        <div class="menu">
            <b-nav vertical>
                <b-nav-item @click="toggleMenu" class="--rounded --black">
                    <i class="fp fp-menu"></i></b-nav-item>
                <b-nav-item @click="toggleInfoBox" class="--rounded">
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
    toggleMenu() {
      this.$store.commit('general/toggleMenu');
    },
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";

    .main-menu {
        position: fixed;
        top: 0;
        right: 0;
        padding: $marginBase;
        z-index: 20;
    }
    .nav-item {
        margin: .5rem 0;
        &.--rounded {
            background-color: $lightGray;
            width: $itemwidth;
            height: $itemwidth;
            border-radius: 50%;
            a {
                height: 100%;
                text-align: center;
                padding: 0;
            }
            i {
                margin: 0 auto;
                line-height: 2em;
                height: 100%
            }
        }
        &.--black {
            background-color: transparent;
        }
    }
</style>
