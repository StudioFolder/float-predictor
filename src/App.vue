<template>
  <div id="app" class="main-application">
    <flightForm></flightForm>
    <router-view/>
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
