<template>
  <div id="visualization-server">
    <StateRemoteSync/>
  </div>
</template>

<script>
import Visualization from '../Visualization';
import StateRemoteSync from './StateRemoteSync';

export default {
  name: 'VisualizationServer',
  data() {
    return {
    };
  },
  components: {
    Visualization, StateRemoteSync,
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
