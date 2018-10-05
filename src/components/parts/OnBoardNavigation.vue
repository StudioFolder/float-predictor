<template>
    <transition name="fade">
    <div class="onboard-nav shadowed" v-show="id > 0 && visualizationState ===2">
        <div class="header">
            <i class="fp fp-caret-right prev" @click="goPrevious"></i>
            <div class="title h4">Explorer {{id}}</div>
            <i class="fp fp-caret-right next" @click="goNext"></i>
        </div>
        <div class="body">
            <ul class="explorer-data">
                <li class="explorer-datum">
                    <div class="subtitle">Departed</div>
                    {{day}}
                </li>
                <li class="explorer-datum">
                    <div class="subtitle">Distance travelled</div>
                    {{distance}} km
                </li>
                <li class="explorer-datum --altitude">
                    <div class="subtitle">Altitude</div>
                    {{altitude}} m
                </li>
                <li class="explorer-datum">
                    <div class="subtitle">Speed</div>
                    {{speed}} km/h
                </li>
            </ul>
        </div>
    </div>
    </transition>
</template>
<script>
/**
 * @author Studio Folder - @StudioFolder
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import moment from 'moment';

export default {
  name: 'onboard-navigation',
  computed: {
    day() {
      return moment().add((this.id - 1), 'days').format('MMM Do, YYYY');
    },
    id() { return this.$store.state.flightSimulator.focusedExplorer; },
    visualizationState() { return this.$store.state.flightSimulator.visualizationState; },
    distance() {
      return parseInt(this.$store.state.flightSimulator.focusedExplorerDistance, 10).toLocaleString('en');
    },
    altitude() {
      return parseInt(this.$store.state.flightSimulator.focusedExplorerAltitude, 10).toLocaleString('en');
    },
    speed() {
      return parseInt(this.$store.state.flightSimulator.focusedExplorerSpeed, 10).toLocaleString('en');
    },
  },
  methods: {
    onClick() {
      this.$store.commit('flightSimulator/setFocusedExplorer', 0);
      this.$store.commit('flightSimulator/setPlaying', true);
    },
    goNext() {
      const next = (this.id <= 7) ? this.id + 1 : 1;
      this.$store.commit('flightSimulator/setFocusedExplorer', next);
    },
    goPrevious() {
      const prev = (this.id > 1) ? this.id - 1 : 8;
      this.$store.commit('flightSimulator/setFocusedExplorer', prev);
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
        width: 360px;
        z-index: 20;
        font-size: 2rem;
        .header {
            background-color: #fff;
            color: $bodyColor;
            padding: 1em 0;
            text-align: center;
            i {
                display: none;
            }
        }
        .title {
            margin: 0;
            text-align: center;
        }
        .subtitle {
            color: $gray;
            text-transform: uppercase;
            font-size: .6em;
        }
        .explorer-datum {
            margin-bottom: $marginItem;
            font-size: 1em;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .body {
            padding: $marginItem*2;
            font-size: .9em;
            background-color: $lightBlack;
        }
    }
</style>
