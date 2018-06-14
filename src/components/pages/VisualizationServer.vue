<template>
  <div id="visualization-server">
    <StateRemoteSync/>
    <div class="main-visualization-wrapper">
      <visualization />
      <on-board-navigation />
      <modal-winner />
    </div>
  </div>
</template>

<script>
import onBoardNavigation from 'Parts/OnBoardNavigation';
import visualization from 'Components/Visualization';
import StateRemoteSync from 'Components/StateRemoteSync';
import modalWinner from 'Modals/ModalWinnerExplorer';

export default {
  name: 'visualizationServer',
  components: {
    visualization, StateRemoteSync, onBoardNavigation, modalWinner,
  },
  mounted() {
    this.$store.commit('flightSimulator/setVisualizationState', 9);
  },
};
</script>
<style>
#visualization-server {
  height: 100%;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}
</style>
