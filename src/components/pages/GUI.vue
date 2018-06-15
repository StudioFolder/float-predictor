<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import HomePage from './HomePage';

export default {
  name: 'GUI',
  extends: HomePage,
  beforeCreate() {
    this.$store.commit('flightSimulator/setGUIVisible', true);
  },
};
</script>
