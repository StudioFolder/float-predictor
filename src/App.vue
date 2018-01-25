<template>
  <div id="app">
    <router-view/>
    <flightForm></flightForm>
  </div>
</template>

<script>
import flightForm from './components/FlightForm';

export default {
  name: 'App',
  components: { flightForm },
};
</script>

<style lang="scss">
  @import "assets/css/main";
</style>
