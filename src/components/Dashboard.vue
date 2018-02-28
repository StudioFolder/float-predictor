<template>
    <div class="dashboard">
        <on-board-navigation />
        <recentre is-animation-active="isAnimationActive"/>
        <transition name="fade">
            <info-box v-show="isInfoboxOpen" is-animation-active="isAnimationActive"/>
        </transition>
        <flight-dashboard v-show="isAnimationActive" :is-infobox-open="isInfoboxOpen"/>
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
    isInfoboxOpen() { return this.$store.state.general.isInfoBoxOpen; },
    isAnimationActive() { return this.$store.state.flightSimulator.isActive; },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.dashboard {
    // position: fixed;
}
</style>
