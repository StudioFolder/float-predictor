<template>
  <div id="visualization-server">
    <div class="main-visualization-wrapper">
      <visualization />
      <on-board-navigation />
      <modal-winner />
    </div>
  </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import onBoardNavigation from 'Parts/OnBoardNavigation';
import visualization from 'Components/Visualization';
import modalWinner from 'Modals/ModalWinnerExplorer';

export default {
  name: 'visualizationServer',
  components: {
    visualization, onBoardNavigation, modalWinner,
  },
  mounted() {
    this.$store.commit('flightSimulator/setVisualizationState', 9);
  },
};
</script>
<style>
#visualization-server {
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}
.main-visualization , .main-visualization-wrapper{
  height: 100%;
}

</style>
