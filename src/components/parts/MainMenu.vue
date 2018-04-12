<template>
    <div class="main-menu">
        <b-nav vertical>
            <b-nav-item @click="openMenu" class="--rounded --black --correction">
                <i class="fp fp-menu"></i></b-nav-item>
            <transition name="fade">
                <div vertical class="onboard-tools" v-show="flightToolsActive">
                    <!--
                <b-nav-item v-show="!isChoosing" class="&#45;&#45;rounded complete-instruction">
                    <a href="#" @click.prevent v-b-modal.instruction-modal>
                        <i class="fp fp-instructions"></i></a></b-nav-item>
                    -->
                    <li class="nav-item --rounded" v-show="!isChoosing" @click="toggleInfoBox">
                        <div class="hover-text">Info and legend</div>
                        <a href="#" target="_self" class="nav-link">
                            <i :class="[isInfoBoxOpen ? 'fp-close' : 'fp-info', 'fp']"></i>
                        </a>
                    </li>
                    <li class="nav-item --rounded" v-show="!isChoosing" @click="saveScreenshot">
                        <div class="hover-text">Take a screenshot</div>
                        <a href="#" target="_self" class="nav-link">
                            <i class="fp fp-camera"></i>
                        </a>
                    </li>
                </div>
            </transition>
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
    flightToolsActive() {
      return this.$route.name === 'flight-simulator';
    },
    isMenuOpen() { return this.$store.state.general.isMenuOpen; },
    isAnimationActive() {
      return (this.$store.state.flightSimulator.isActive && this.$route.name === 'flight-simulator');
    },
    isWindPanelOpen: {
      get() {
        return this.$store.state.general.isWindPanelOpen;
      },
      set(v) {
        this.$store.commit('general/setWindPanel', v);
      },
    },
    isInfoBoxOpen: {
      get() {
        return this.$store.state.general.isInfoBoxOpen;
      },
      set(v) {
        this.$store.commit('general/setInfoBox', v);
      },
    },
  },
  methods: {
    toggleInfoBox() {
      if (this.isInfoBoxOpen) {
        this.isInfoBoxOpen = false;
      } else {
        this.isInfoBoxOpen = true;
        if (this.isWindPanelOpen) {
          this.isWindPanelOpen = false;
        }
      }
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
