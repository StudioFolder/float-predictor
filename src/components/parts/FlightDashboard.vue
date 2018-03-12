<template>
    <div class="flight-dashboard" :class="{'is-onboard': isOnboard}">
        <div class="play-animation">
            <div v-if="!isInfoboxOpen" class="hover-text elapsed-days">Day {{elapsedDays}}/16</div>
            <b-nav-item @click="toggleAnimation" class="--rounded --play">
                <svg>
                    <circle class="progress" :style="{ strokeDasharray: dashArray }"></circle>
                    <circle class="baseline"></circle>
                </svg>
                <i :class="[isPlaying ? 'fp-pause' : 'fp-play', 'fp']"></i>
            </b-nav-item>
        </div>
        <div class="winds-panel">
            <b-nav-item @click="toggleWinds(2)" class="--rounded">
                <i class="fp fp-winds-en"></i>
            </b-nav-item>
            <b-nav-item @click="toggleWinds(1)" class="--rounded">
                <i class="fp fp-winds-on"></i>
            </b-nav-item>
            <b-nav-item @click="toggleWinds(0)" class="--rounded">
                <i class="fp fp-no-winds"></i>
            </b-nav-item>
        </div>
        <!--explorers-->
        <ul class="explorers-dashboard">
            <explorer
                    v-for="(explorer, id) in activeExplorers"
                    :key="id"
                    :id="id"
                    :explorer="explorer"
                    :day="elapsedDays"> </explorer>
        </ul>
    </div>
</template>

<script>
import Explorer from './Explorer';

export default {
  name: 'flight-dashboard',
  props: ['isInfoboxOpen', 'isOnboard'],
  components: { Explorer },
  data() {
    return {
      activeExplorers: [1, 2, 3, 4, 5, 6, 7, 8],
      isWindsPanelOpen: true,
    };
  },
  computed: {
    windPanelClass() {
      return {
        'fp-no-winds': this.winds === 0,
        'fp-winds-on': this.winds === 1,
        'fp-winds-en': this.winds === 2,
      };
    },
    winds() { return this.$store.state.flightSimulator.winds; },
    isPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    elapsedDays() { return this.$store.state.flightSimulator.elapsedDays; },
    circumference() { return 35.8 * Math.PI; },
    dashArray() {
      return `${this.circumference * ((this.elapsedDays) / 32)}, 10000`;
    },
  },
  methods: {
    toggleWindsPanel() {
      this.isWindsPanelOpen = !this.isWindsPanelOpen;
    },
    closeWindsPanel() {
      this.isWindsPanelOpen = false;
    },
    toggleWinds(v) {
      this.$store.commit('flightSimulator/setWinds', v);
      this.closeWindsPanel();
    },
    toggleAnimation() {
      this.$store.commit('flightSimulator/setPlaying', !this.isPlaying);
    },
    goMobileOnBoard() {
      this.$store.commit('flightSimulator/setFocusedExplorer', 1);
    },
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    $speed: 10s; // depends on speed
    $r: 30px;
    $pi: 3.14159;

    .toggle-winds {
        position: relative;
    }
    .nav-item.--play {
        .nav-link {
            position: relative;
        }
        svg {
            height: 100px;
            width: 100px;
            position: absolute;
            transform: rotate(-86deg);
            top: -16px;
            left: -19px;
            circle {
                cx: 50%;
                cy: 50%;
                r: 32px;
                fill: transparent;
                &.progress {
                    stroke-width: 5;
                    r: 36px;
                    stroke: $textColor;
                    transition: stroke-dasharray $speed;
                }
                &.baseline {
                    stroke-width: 1;
                    stroke: $lightGray;
                }
            }
        }
        &:hover {
            background-color: transparent;
            i {
                &.fp-pause {
                    background-image: url("~Icons/ico-pause-w.svg");
                }
                &.fp-play {
                    background-image: url("~Icons/play-w.svg");
                }
            }
        }
    }
    .nav-item.wind-selector .inactive {
        opacity: .25;
    }
    .fp-winds-on,
    .fp-winds-en,
    .fp-no-winds {
        width: 30px;
    }
    .play-animation {
        position: relative;
        .elapsed-days {
            display: block;
            margin: 1.15rem 0 0.65rem;
            line-height: 32px;
            height: 32px;
            font-size: 1em;
        }
    }
    .explorers-dashboard {
        .explorer-item {
            margin-bottom: 1.4rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity .3s;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0);
            &:hover, &.--focused {
                background-color: transparent;
                circle.progress {
                    stroke-width: 4px;
                    &[data-explorer="0"] {
                        stroke: #003769;
                    }
                    &[data-explorer="1"] {
                        stroke: #2e6a9c;
                    }
                    &[data-explorer="2"] {
                        stroke: #0095d7;
                    }
                    &[data-explorer="3"] {
                        stroke: #587a98;
                    }
                    &[data-explorer="4"] {
                        stroke: #7eafd4;
                    }
                    &[data-explorer="5"] {
                        stroke: #b9e5fb;
                    }
                    &[data-explorer="6"] {
                        stroke: #656868;
                    }
                    &[data-explorer="7"] {
                        stroke: #ffffff;
                    }
                }
            }
            .explorer-id {
                position: absolute;
                margin-top: 1px;
                color: $gray;
                font-size: .9rem;
            }
            .explorer-gif {
                width: 15px;
                margin-top: 4px;
                margin-left: 1px;
                img {
                    max-width: 100%;
                }
            }
            svg {
                height: calc(#{$itemWidth} + 10px);
                width: calc(#{$itemWidth} + 10px);
                transform: rotate(-86deg);
                position: absolute;
            }
            circle {
                cx: 50%;
                cy: 50%;
                r: ($r - 2);
                fill: transparent;
                &.progress {
                    stroke-width: 2;
                    r: $r;
                    stroke: $gray;
                    transition: stroke-dasharray $speed;
                }
                &.baseline {
                    stroke-width: 1;
                    stroke: $lightGray;
                }
            }
        }
    }
</style>
