<template>
    <transition name="fade">
    <div class="recentre" v-show="isVisible" @click="onClick">
        <div class="recentre-inner">
            <i class="fp fp-recenter"></i>
        </div>
        Re-centre
    </div>
    </transition>
</template>
<script>
export default {
  name: 'back-to-viz',
  computed: {
    isVisible() {
      return (
        this.$route.name === 'flight-simulator'
        && !this.$store.state.general.isChoosingDestination
        && this.$store.state.flightSimulator.isActive);
    },
  },
  methods: {
    onClick() {
      this.$store.commit('flightSimulator/setFocusedExplorer', 1);
      this.$store.commit('flightSimulator/setPlaying', true);
      setTimeout(() => this.$store.commit('flightSimulator/setFocusedExplorer', 0), 0);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~css/_variables_and_mixins.scss";
.recentre {
    transition: opacity .4s ease;
    position: fixed;
    bottom: $marginBase;
    left: $marginBase;
    cursor: pointer;
    display: flex;
    align-items: center;
    .recentre-inner {
        width: $itemWidth;
        height: $itemWidth;
        border-radius: 50%;
        background-color: $lightGray;
        margin-right: 10px;
    }
    i {
        width: $itemWidth;
        height: $itemWidth;
    }
    &:hover .recentre-inner {
        background-color: white;
    }
}
</style>
