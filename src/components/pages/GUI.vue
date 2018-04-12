<script>
import HomePage from './HomePage';

export default {
  name: 'GUI',
  extends: HomePage,
  beforeCreate() {
    this.$store.commit('flightSimulator/setGUIVisible', true);
  },
};
</script>
