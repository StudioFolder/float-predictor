<template>
  <div id="visualization-server">
    <StateRemoteSync/>
    <div class="main-visualization-wrapper">
      <visualization />
      <on-board-navigation />
    </div>
  </div>
</template>

<script>
import onBoardNavigation from 'Parts/OnBoardNavigation';
import visualization from 'Components/Visualization';
import StateRemoteSync from 'Components/StateRemoteSync';

export default {
  name: 'visualization-server',
  data() {
    return {
    };
  },
  components: {
    visualization, StateRemoteSync, onBoardNavigation,
  },
  computed: {
  },
  mounted() {
    // this.$store.commit('flightSimulator/setVisualizationState', 9);
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
