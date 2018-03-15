<template>
    <div class="visualization-client">
        <StateRemoteSync/>
        <div class="simulator-content">
            <transition name="fade" mode="out-in">
                <flight-form v-if="isChoosing" key="flight-form"/>
                <save-trip v-else-if="isEndAnimation" key="save-trip"/>
                <dashboard v-else key="dashboard"/>
            </transition>
        </div>
    </div>
</template>
<script>
import dashboard from 'Parts/FlightDashboard';
import flightForm from 'Parts/FlightForm';
import StateRemoteSync from 'Components/StateRemoteSync';
import saveTrip from 'Parts/SaveTrip';

export default {
  name: 'flight-simulator',
  data() {
    return {
      colors: ['#003769', '#2e6a9c', '#0095d7', '#587a98', '#7eafd4', '#b9e5fb', '#656868', '#ffffff'],
    };
  },
  components: {
    flightForm, dashboard, StateRemoteSync, saveTrip,
  },
  computed: {
    isChoosing() { return this.$store.state.general.isChoosingDestination; },
    isEndAnimation() { return this.$store.state.flightSimulator.visualizationState === 4; },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
</style>
