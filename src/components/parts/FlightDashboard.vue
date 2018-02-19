<template>
    <b-nav vertical class="flight-dashboard">
        <!--tools-->
        <b-nav-item @click="saveScreenshot" class="--rounded">
            <i class="fp fp-camera"></i></b-nav-item>
        <div class="toggle-winds">
            <b-nav-item @click="toggleWindsPanel" class="--rounded wind-selector">
                <i :class="windPanelClass" class="fp"></i>
            </b-nav-item>
            <transition name="fade">
                <span class="winds-panel" v-if="isWindsPanelOpen">
                    <b-nav-item @click="toggleWinds(2)" class="--rounded" v-if="winds!==2">
                        <i class="fp fp-winds-en"></i>
                    </b-nav-item>
                    <b-nav-item @click="toggleWinds(1)" class="--rounded" v-if="winds!==1">
                        <i class="fp fp-winds-on"></i>
                    </b-nav-item>
                    <b-nav-item @click="toggleWinds(0)" class="--rounded" v-if="winds!==0">
                        <i class="fp fp-no-winds"></i>
                    </b-nav-item>
                </span>
            </transition>
        </div>
        <div class="play-animation">
            <div v-if="isInfoboxClosed" class="elapsed-days">Day {{elapsedDays}}/16</div>
            <b-nav-item @click="toggleAnimation" class="--rounded --play">
                <svg>
                    <circle class="progress" :style="{ strokeDasharray: dashArray }"></circle>
                    <circle class="baseline"></circle>
                </svg>
                <i :class="[isPlaying ? 'fp-pause' : 'fp-play', 'fp']"></i>
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
    </b-nav>
</template>

<script>
import Explorer from './Explorer';

export default {
  components: { Explorer },
  name: 'flight-dashboard',
  props: ['isAnimationActive'],
  data() {
    return {
      activeExplorers: [1, 2, 3, 4, 5, 6, 7, 8],
      isWindsPanelOpen: false,
    };
  },
  computed: {
    windPanelClass() {
      return {
        'fp-no-winds': this.winds === 0,
        'fp-winds-on': this.winds === 1,
        'fp-winds-en': this.winds === 2,
        inactive: !this.isInfoboxClosed,
      };
    },
    winds() { return this.$store.state.flightSimulator.winds; },
    isPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    elapsedDays() { return this.$store.state.flightSimulator.elapsedDays; },
    isInfoboxClosed() { return !this.$store.state.general.isInfoBoxOpen; },
    circumference() { return 35.8 * Math.PI; },
    dashArray() {
      return `${this.circumference * ((this.elapsedDays) / 16)}, 10000`;
    },
  },
  methods: {
    saveScreenshot() {
      this.$store.commit('flightSimulator/saveImage');
    },
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
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .toggle-winds {
        position: relative;
    }
    .nav-item.--play {
        .nav-link {
            position: relative;
        }
        svg {
            height: 46px;
            width: 46px;
            position: absolute;
            transform: rotate(-86deg);
            top: -6px;
            left: -7px;
            circle {
                cx: 50%;
                cy: 50%;
                r: 16px;
                fill: transparent;
                &.progress {
                    stroke-width: 2;
                    r: 18px;
                    stroke: $textColor;
                    transition: stroke-dasharray 20s; // depends on speed
                }
                &.baseline {
                    stroke-width: 1;
                    stroke: $lightGray;
                }
            }
        }
        &:hover {
            background-color: transparent;
        }
    }
    .nav-item.wind-selector .inactive {
        opacity: .25;
    }
    .winds-panel {
        display: flex;
        justify-content: space-evenly;
        flex-flow: row;
        position: absolute;
        top: 0;
        left: -130px;
        height: 32px;
        width: 130px;
    }
    .fp-winds-on,
    .fp-winds-en,
    .fp-no-winds {
        width: 30px;
    }
    .play-animation {
        position: relative;
        .elapsed-days {
            position: absolute;
            margin: 1.15rem 0 0.65rem;
            line-height: 32px;
            width: auto;
            height: 32px;
            left: -80px;
        }
    }

    $r: 15px;
    $pi: 3.14159;

    .explorers-dashboard .explorer-item {
        margin-bottom: 1.5rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity .3s;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0);
        &:hover {
            background-color: transparent;
            circle.progress {
                stroke: $textColor;
                // stroke-width: 5px;
            }
        }
        &:first-child {
            margin-top: 1rem;
        }
        .explorer-id {
            position: absolute;
            z-index: 10;
            color: $gray;
        }
        .explorer-gif {
            width: 20px;
            margin-top: 6px;
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
            r: $r;
            fill: transparent;
            &.progress {
                stroke-width: 2;
                r: $r+2;
                stroke: $gray;
                transition: stroke-dasharray 20s; // depends on speed
            }
            &.baseline {
                stroke-width: 1;
                stroke: $lightGray;
            }
        }
    }
</style>
