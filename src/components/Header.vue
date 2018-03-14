<template>
    <div class="site-header" v-if="isClient">
        <div class="logo">
            <div class="title">Aerocene</div>
            <div class="subtitle">Float Predictor</div>
        </div>
        <b-nav>
            <b-nav-item @click="toggleInfoBox" class="--rounded">
                <i :class="[isInfoBoxOpen ? 'fp-close-w' : 'fp-info', 'fp']"></i>
            </b-nav-item>
        </b-nav>
    </div>
</template>
<script>

export default {
  computed: {
    isClient() { return this.$route.name !== 'visualization-server'; },
    isChoosing() { return this.$store.state.general.isChoosingDestination; },
    isInfoBoxOpen() {
      return this.$store.state.general.isInfoBoxOpen;
    },
  },
  methods: {
    toggleInfoBox() {
      this.$store.commit('general/toggleInfoBox');
    },
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import"~css/_typography.scss";
.site-header {
    position: relative;
    z-index: 20;
    background-color: $lightBlack;
    padding: $marginMobile;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    .logo {
        @extend %colfax_bold;
        flex: 1 0 auto;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem; // 24px
        line-height: 1.1;
        color: #FFF;
        .subtitle {
            color: $gray;
        }
    }
    .nav {
        flex: 0 0 auto;
    }
}
</style>
