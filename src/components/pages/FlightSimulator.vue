<template>
  <div class="main-content">
      <!--just the animation here-->
  </div>
</template>

<script>
export default {
  name: 'FlightSimulator',
  created() {
    this.$store.commit('general/setUpperHeight', 0);
    this.$store.commit('general/setBottomHeight', 0);
  },
};
</script>
