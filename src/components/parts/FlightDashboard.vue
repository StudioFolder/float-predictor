<template>
    <b-nav vertical class="flight-dashboard">
        <!--tools-->
        <b-nav-item @click="saveScreenshot" class="--rounded">
            <i class="fp fp-camera"></i></b-nav-item>
        <div class="toggle-winds">
            <b-nav-item @click="toggleWindsPanel" class="--rounded">
                <i class="fp-winds-on fp"></i>
            </b-nav-item>
            <transition name="fade">
            <span class="winds-panel" v-if="isWindsPanelOpen">
                <b-nav-item @click="toggleWinds(2)" class="--rounded">
                    <i class="fp fp-winds-en"></i>
                </b-nav-item>
                <b-nav-item @click="toggleWinds(1)" class="--rounded">
                    <i class="fp fp-winds-on"></i>
                </b-nav-item>
                <b-nav-item @click="toggleWinds(0)" class="--rounded">
                    <i class="fp fp-no-winds"></i>
                </b-nav-item>
            </span>
            </transition>
        </div>
        <b-nav-item @click="toggleAnimation" class="--rounded --play">
            <i :class="[isPlaying ? 'fp-pause' : 'fp-play', 'fp']"></i></b-nav-item>
        <!--explorers-->
        <ul class="explorers-dashboard">
            <explorer
                    v-for="(explorer, id) in activeExplorers"
                    :key="id"
                    :id="id"
                    :explorer="explorer"
                    :day="elapsedDays"> </explorer>
        </ul>
    </b-nav>
</template>

<script>
import Explorer from './Explorer';

export default {
  components: { Explorer },
  name: 'flight-dashboard',
  props: ['isAnimationActive'],
  data() {
    return {
      activeExplorers: [1, 2, 3, 4, 5, 6, 7, 8],
      isWindsPanelOpen: false,
    };
  },
  computed: {
    isPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    elapsedDays() { return this.$store.state.flightSimulator.elapsedDays; },
  },
  methods: {
    saveScreenshot() {
      this.$store.commit('flightSimulator/saveImage');
    },
    toggleWindsPanel() {
      if (this.isWindsPanelOpen) {
        this.$store.commit('flightSimulator/setWinds', 0);
      }
      this.isWindsPanelOpen = !this.isWindsPanelOpen;
    },
    closeWindsPanel() {
      this.isWindsPanelOpen = false;
    },
    toggleWinds(v) {
      this.$store.commit('flightSimulator/setWinds', v);
      this.closeWindsPanel();
    },
    toggleAnimation() {
      this.$store.commit('flightSimulator/setPlaying', !this.isPlaying);
    },
  },
};
</script>
<style lang="scss">
    .toggle-winds {
        position: relative;
    }
    .winds-panel {
        display: flex;
        justify-content: space-evenly;
        flex-flow: row;
        position: absolute;
        top: 0;
        left: -130px;
        height: 32px;
        width: 130px;
        .nav-item {
        }
    }
    .fp-winds-on,
    .fp-winds-en,
    .fp-no-winds {
        width: 30px;
    }
</style>
