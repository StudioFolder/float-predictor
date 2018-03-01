<template>
    <div class="main-menu">
        <b-nav vertical>
            <b-nav-item @click="openMenu" class="--rounded --black --correction">
                <i class="fp fp-menu"></i></b-nav-item>
            <div vertical class="onboard-tools">
                <b-nav-item v-show="!isChoosing" @click="toggleInfoBox" class="--rounded">
                    <i :class="[isInfoBoxOpen ? 'fp-close' : 'fp-info', 'fp']"></i></b-nav-item>
                <b-nav-item v-show="!isChoosing" class="--rounded complete-instruction">
                    <a href="#" @click.prevent v-b-modal.instruction-modal>
                        <i class="fp fp-info"></i></a></b-nav-item>
                <b-nav-item v-show="!isChoosing" @click="saveScreenshot" class="--rounded">
                    <i class="fp fp-camera"></i></b-nav-item>
            </div>
        </b-nav>
        <transition name="fade">
            <main-nav v-show="isMenuOpen"></main-nav>
        </transition>
    </div>
</template>
<script>
import infoBox from 'Parts/InfoBox';
import mainNav from 'Parts/MainNav';

export default {
  name: 'main-menu',
  components: { infoBox, mainNav },
  props: ['isChoosing'],
  computed: {
    isMenuOpen() { return this.$store.state.general.isMenuOpen; },
    isAnimationActive() {
      return (this.$store.state.flightSimulator.isActive && this.$route.name === 'flight-simulator');
    },
    isInfoBoxOpen() {
      return this.$store.state.general.isInfoBoxOpen;
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
