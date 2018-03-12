<template>
    <div class="dashboard">
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
import recentre from 'Parts/Recentre';
import infoBox from 'Parts/InfoBox';
import flightDashboard from 'Parts/FlightDashboard';

export default {
  components: { infoBox, flightDashboard, recentre },
  computed: {
    isOnboard() { return this.$store.state.flightSimulator.focusedExplorer > 0; },
    isInfoboxOpen() { return this.$store.state.general.isInfoBoxOpen; },
    isAnimationActive() { return this.$store.state.flightSimulator.isActive; },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.flight-dashboard {
    display: flex;
    flex-flow: column;
    width: 100%;
    list-style: none;
    z-index: 19; // as the main-menu
    padding: 0 $marginBase;
    >* {
        position: relative;
        text-align: center;
        flex: 1 1 auto;
        margin-top: $marginBase;
    }
    .play-animation {
        .--play {
            margin: 0 auto;
        }
    }
    .winds-panel {
        display: flex;
        justify-content: space-evenly;
        flex-flow: row;
    }
    .explorers-dashboard {
        display: flex;
        justify-content: space-between;
    }
}
</style>
