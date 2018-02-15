<template>
    <b-nav vertical class="flight-dashboard">
        <!--tools-->
        <b-nav-item @click="saveScreenshot" class="--rounded">
            <i class="fp fp-camera"></i></b-nav-item>
        <b-nav-item @click="toggleWinds" class="--rounded">
            <i :class="[isWindOn ? 'fp-no-wind' : 'fp-wind', 'fp']"></i></b-nav-item>
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
    };
  },
  computed: {
    isWindOn() { return this.$store.state.flightSimulator.isWindVisible; },
    isPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    elapsedDays() { return this.$store.state.flightSimulator.elapsedDays; },
  },
  methods: {
    saveScreenshot() {
      this.$store.commit('flightSimulator/saveImage');
    },
    toggleWinds() {
      this.$store.commit('flightSimulator/setWindVisible', !this.isWindOn);
    },
    toggleAnimation() {
      this.$store.commit('flightSimulator/setPlaying', !this.isPlaying);
    },
  },
};
</script>
<style lang="scss">
</style>
