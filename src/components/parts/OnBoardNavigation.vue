<template>
    <div class="onboard-nav" v-show="id > 0">
        <a class="close" href="#">
            <div class="label">Back to global view</div>
            <i class="fp fp-close-w" @click.prevent="onClick"></i>
        </a>
        <div class="header"><div class="title h4">Explorer {{id}}</div></div>
        <div class="body">
            <ul class="explorer-data">
                <li class="explorer-datum">
                    <div class="subtitle">Departed</div>
                    Day {{id}}
                </li>
                <li class="explorer-datum">
                    <div class="subtitle">Distance</div>
                    {{distance}} km
                </li>
                <li class="explorer-datum">
                    <div class="subtitle">Current Speed</div>
                    {{speed}} km/h
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'onboard-navigation',
  computed: {
    id() { return this.$store.state.flightSimulator.focusedExplorer; },
    distance() { return this.$store.state.flightSimulator.focusedExplorerDistance; },
    speed() { return this.$store.state.flightSimulator.focusedExplorerSpeed; },
  },
  methods: {
    onClick() {
      this.$store.commit('flightSimulator/setFocusedExplorer', 0);
      this.$store.commit('flightSimulator/setPlaying', true);
    },
  },
};
</script>
<style lang="scss">
    @import "~css/_variables_and_mixins.scss";
    .onboard-nav {
        position: fixed;
        bottom: $marginBase;
        left: $marginBase;
        width: 170px;
        z-index: 9;
        .close {
            opacity: 1;
            background-color: $lightBlack;
            border-radius: 50%;
            transform: translateY(-50%);
            position: relative;
            padding: 2px;
            cursor: unset;
            &:hover .label {
                opacity: 1;
            }
        }
        i { cursor: pointer }
        .label {
            position: absolute;
            text-align: center;
            width: 80px;
            color: #fff;
            font-size: .9rem;
            text-transform: initial;
            transform: translateY(-100%);
            padding-bottom: 5px;
            margin-left: -25px;
            opacity: 0;
        }
        .header {
            text-align: center;
            background-color: #fff;
            color: $bodyColor;
            padding: 1em 0;
        }
        .title {
            margin: 0;
        }
        .subtitle {
            color: $gray;
            text-transform: uppercase;
            font-size: .7rem;
        }
        .explorer-datum {
            margin: $marginItem 0;
        }
        .body {
            padding: $marginItem;
            font-size: .9rem;
            background-color: $lightBlack;
        }
    }
</style>
