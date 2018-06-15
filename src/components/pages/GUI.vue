<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import VisualizationServer from './VisualizationServer';

export default {
  name: 'GUI',
  extends: VisualizationServer,
  beforeCreate() {
    this.$store.commit('flightSimulator/setGUIVisible', true);
  },
};
</script>
