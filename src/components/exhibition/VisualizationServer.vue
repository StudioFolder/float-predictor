<template>
  <div id="visualization-server">
    <StateRemoteSync/>
    <div class="main-visualization-wrapper">
      <on-board-navigation />
      <visualization />
    </div>
  </div>
</template>

<script>
import onBoardNavigation from 'Parts/OnBoardNavigation';
import Visualization from '../Visualization';
import StateRemoteSync from './StateRemoteSync';

export default {
  name: 'VisualizationServer',
  data() {
    return {
    };
  },
  components: {
    Visualization, StateRemoteSync, onBoardNavigation,
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
<style scoped>
</style>
