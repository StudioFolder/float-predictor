<template>
    <div class="main-visualization">
        <img class="earth_placeholder" src="../assets/img/earth_placeholder_1x.png">
    </div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'visualization',
  computed: {
    animationActive() { return this.$store.state.flightSimulator.isActive; },
    explorers() { return this.$store.state.flightSimulator.explorers; },
  },
  watch: {
    animationActive(isActive) {
      if (isActive) {
        _.each(this.explorers, () => {
          // todo: start explorers and communicate to the dashboard
        });
      }
    },
  },
};
</script>

<style>
    .main-visualization {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .earth_placeholder {
        position: absolute;
        left: 0;
        bottom: 0;
        max-width: 100%;
    }
</style>
