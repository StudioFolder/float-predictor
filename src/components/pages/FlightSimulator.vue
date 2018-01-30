<template>
  <div class="main-content">
    <flight-form></flight-form>
  </div>
</template>

<script>
import FlightForm from '../FlightForm';
import Visualization from '../Visualization';

export default {
  components: {
    Visualization,
    FlightForm },
  name: 'FlightSimulator',
};
</script>
