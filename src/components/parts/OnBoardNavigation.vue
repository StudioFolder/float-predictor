<template>
    <transition name="fade">
    <div class="onboard-nav shadowed" v-show="id > 0">
        <a class="close" href="#">
            <div class="label">Back to global view</div>
            <i class="fp fp-close-w" @click.prevent="onClick"></i>
        </a>
        <div class="header">
            <i class="fp fp-caret-right prev" @click="goPrevious"></i>
            <div class="title h4">Sculpture {{id}}</div>
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
                <li class="explorer-datum --altitude" v-if="(!isFlightOver)">
                    <div class="subtitle">Altitude</div>
                    {{altitude}} m
                </li>
                <li class="explorer-datum" v-if="(!isFlightOver)">
                    <div class="subtitle">Speed</div>
                    {{speed}} km/h
                </li>
            </ul>
        </div>
    </div>
    </transition>
</template>
<script>
import moment from 'moment';

export default {
  name: 'onboard-navigation',
  computed: {
    day() {
      return moment().add((this.id - 1), 'days').format('MMM Do, YYYY');
    },
    id() { return this.$store.state.flightSimulator.focusedExplorer; },
    distance() {
      return parseInt(this.$store.state.flightSimulator.focusedExplorerDistance, 10).toLocaleString('en');
    },
    altitude() {
      return parseInt(this.$store.state.flightSimulator.focusedExplorerAltitude, 10).toLocaleString('en');
    },
    speed() {
      return parseInt(this.$store.state.flightSimulator.focusedExplorerSpeed, 10).toLocaleString('en');
    },
    isFlightOver() {
      return (this.$store.state.flightSimulator.visualizationState === 4);
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
        width: 190px;
        z-index: 20;
        .close {
            opacity: 1;
            background-color: $lightBlack;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            right: 0;
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
            font-size: .8rem;
            text-transform: initial;
            transform: translateY(-100%);
            padding-bottom: 5px;
            margin-left: -25px;
            opacity: 0;
            -webkit-font-smoothing: antialiased;
        }
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
            font-size: .7rem;
        }
        .explorer-datum {
            margin-bottom: $marginItem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .body {
            padding: $marginItem*2;
            font-size: .9rem;
            background-color: $lightBlack;
        }
        @include medium_down {
            height: 100px;
            width: 100%;
            bottom: 0;
            left: 0;
            box-shadow: none;
            .header {
                background: linear-gradient(to top,
                        rgba(0,0,0,.98) 0%,
                        rgba(0,0,0,.58) 38%,
                        rgba(0,0,0,.1) 80%,
                        rgba(0,0,0,.0)) 100%;
                color: #FFF;
                display: flex;
                flex-flow: row;
                align-items: center;
                padding: $marginItem $marginMobile;
                i {
                    flex: 0 0 auto;
                    width: $itemWidth;
                    height: $itemWidth;
                    content: '';
                    display: block;
                    background-image: url("~Icons/ico-caret-right.svg");
                    background-repeat: no-repeat;
                    background-position: center right;
                    background-size: 35%;
                    &.prev {
                        transform: rotate(180deg);
                    }
                }
                .title {
                    flex: 1 0 auto;
                }
            }
            .close {
                position: fixed;
                top: $marginMobile;
            }
            .body {
                background-color: black;
                padding-top: 0;
            }
            .explorer-data {
                display: flex;
                flex-flow: row;
                .--altitude {
                    display: none;
                }
            }
            .explorer-datum {
                flex: 1 0 auto;
            }
        }
    }
</style>
