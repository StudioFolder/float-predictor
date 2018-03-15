<template>
    <div class="visualization-client">
        <StateRemoteSync/>
        <div class="simulator-content">
            <flight-form v-if="isChoosing" />
            <dashboard v-else />
        </div>
    </div>
</template>
<script>
import dashboard from 'Parts/FlightDashboard';
import flightForm from 'Components/FlightForm';
import StateRemoteSync from 'Components/StateRemoteSync';

export default {
  name: 'flight-simulator',
  data() {
    return {
      colors: ['#003769', '#2e6a9c', '#0095d7', '#587a98', '#7eafd4', '#b9e5fb', '#656868', '#ffffff'],
    };
  },
  components: {
    flightForm, dashboard, StateRemoteSync,
  },
  computed: {
    isChoosing() { return (this.$store.state.general.isChoosingDestination); },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
</style>
