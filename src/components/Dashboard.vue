<template>
    <div class="dashboard">
        <on-board-navigation />
        <recentre is-animation-active="isAnimationActive"/>
        <transition name="fade">
            <info-box v-show="isInfoboxOpen" is-animation-active="isAnimationActive"/>
        </transition>
        <flight-dashboard
                v-show="isAnimationActive"
                :is-onboard="isOnboard"
                :is-infobox-open="isInfoboxOpen"/>
    </div>
</template>
<script>
import onBoardNavigation from 'Parts/OnBoardNavigation';
import recentre from 'Parts/Recentre';
import infoBox from 'Parts/InfoBox';
import flightDashboard from 'Parts/FlightDashboard';

export default {
  components: { onBoardNavigation, infoBox, flightDashboard, recentre },
  computed: {
    isOnboard() { return this.$store.state.flightSimulator.focusedExplorer > 0; },
    isInfoboxOpen() { return this.$store.state.general.isInfoBoxOpen; },
    isAnimationActive() { return this.$store.state.flightSimulator.isActive; },
  },
};
</script>
<style lang="scss">
</style>
