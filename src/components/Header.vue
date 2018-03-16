<template>
    <div class="site-header" v-if="isClient">
        <div class="logo">
            <div class="title">Aerocene</div>
            <div class="subtitle">Float Predictor</div>
        </div>
        <b-nav>
            <li class="start-new-journey">
                <a @click.prevent="startNew" href="#" target="_self">
                    <span>Start a new aerosolar journey</span>
                    <i class="fp fp-caret-right"></i>
                    <img src="~img/globe_illustration.svg">
                </a>
            </li>
            <b-nav-item @click="toggleInfoBox" class="--rounded">
                <transition name="fade-icon" mode="out-in">
                    <i v-if="isInfoBoxOpen"
                       class="fp-close-w fp" key="fp-close"></i>
                    <i v-else class="fp-info fp" key="fp-info"></i>
                </transition>
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
    startNew() {
      this.$store.dispatch('flightSimulator/resetVisualization');
      this.$store.commit('general/closeInfoBox');
      this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('general/setFormStatus', true);
      this.$router.push('flight-simulator');
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
    padding: $marginMobile*2/3 $marginMobile;
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
        .start-new-journey a{
            display: flex;
            flex-flow: row;
            align-items: center;
            margin-right: 30px;
            > * {
                margin-left: 5px;
            }
            span {
                max-width: 190px;
                text-align: right;
                color: #FFF;
                line-height: 1.2;
            }
            img {
                max-height: 50px;
            }
        }
    }
}
</style>
