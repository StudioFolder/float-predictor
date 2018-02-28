<template>
    <div class="dashboard">
        <on-board-navigation />
        <recentre />
        <transition name="fade"><info-box v-show="isInfoBoxOpen"></info-box></transition>
        <flight-dashboard v-show="isAnimationActive" :is-animation-active="isAnimationActive" />
    </div>
</template>
<script>
import onBoardNavigation from 'Parts/OnBoardNavigation';
import recentre from 'Parts/Recentre';
import infoBox from 'Parts/InfoBox';
import flightDashboard from 'Parts/FlightDashboard';

export default {
  components: { onBoardNavigation, infoBox, flightDashboard, recentre },
};
</script>
