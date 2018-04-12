<template>
    <ul class="flight-dashboard" :class="{'is-onboard': isOnboard, 'flight-over': isFlightOver}">
        <div class="toggle-winds">
            <li class="nav-item --rounded wind-selector" @click="toggleWindsPanel">
                <div class="hover-text">Explore winds</div>
                <a href="#" target="_self" class="nav-link">
                    <i v-if="isMobile" :class="windPanelClass" class="fp"></i>
                    <i v-else :class="[isWindsPanelOpen ? 'fp-close' : windPanelClass, 'fp']"></i>
                </a>
            </li>
            <transition name="fade">
                <winds-panel v-if="(isWindsPanelOpen && !isMobile)" />
                <span class="mobile-winds-panel"
                      v-else-if="(isWindsPanelOpen && isFlightOver && isMobile)">
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
        <div class="play-animation" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
            <transition name="fade">
                <div v-if="((!isInfoboxOpen && !hoverOnPlay) || isMobile)"
                     key="elapsed"
                     class="hover-text elapsed-days">
                    Day {{elapsedDays}}/16
                </div>
                <div v-else-if="(!isInfoboxOpen && hoverOnPlay && !isFlightOver && !isMobile)"
                     key="playpause"
                     class="hover-text">
                    <transition name="fade" mode="out-in">
                        <span v-if="isPlaying" key="pause_sim">Pause simulation</span>
                        <span v-else key="resume_sim">Resume Simulation</span>
                    </transition>
                </div>
                <div v-else-if="(!isInfoboxOpen && hoverOnPlay && isFlightOver && !isMobile)"
                     key="restart"
                     class="hover-text">
                    Restart
                </div>
            </transition>
            <b-nav-item @click="toggleAnimation" class="--rounded --play">
                <svg>
                    <circle
                            class="progress"
                            cx="50%"
                            cy="50%"
                            r="18px"
                            :stroke-dasharray="dashArray">
                    </circle>
                    <circle
                            cx="50%"
                            cy="50%"
                            r="16px"
                            class="baseline">
                    </circle>
                </svg>
                <transition name="fade-icon" mode="out-in">
                    <i key="play" v-if="!isFlightOver"
                       :class="[isPlaying ? 'fp-pause' : 'fp-play', 'fp']"></i>
                    <i key="restart"
                       v-else-if="(isFlightOver && !hoverOnPlay)"
                       class="fp-restart fp"></i>
                    <i key="restartover"
                       v-else-if="(isFlightOver && hoverOnPlay)"
                       class="fp-restart-w fp"></i>
                </transition>
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
        <div class="mobile-explorer-dashboard">
            <li class="nav-item explorer-item --rounded" @click="goMobileOnBoard">
                <i class="fp fp-explorer"></i>
            </li>
        </div>
    </ul>
</template>

<script>
import explorer from 'Parts/Explorer';
import windsPanel from 'Parts/WindsPanel';

export default {
  name: 'flight-dashboard',
  props: ['isInfoboxOpen', 'isOnboard'],
  components: { explorer, windsPanel },
  data() {
    return {
      activeExplorers: [1, 2, 3, 4, 5, 6, 7, 8],
      hoverOnPlay: false,
    };
  },
  computed: {
    windPanelClass() {
      return {
        'fp-no-winds': this.winds === 0,
        'fp-winds-on': this.winds === 1 || this.winds === 3,
        'fp-winds-en': this.winds === 2 || this.winds === 4,
      };
    },
    isMobile() {
      return (window.matchMedia('(max-width: 767px)').matches);
    },
    winds() { return this.$store.state.flightSimulator.winds; },
    isWindsPanelOpen() { return this.$store.state.general.isWindPanelOpen; },
    isPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    elapsedDays() { return this.$store.state.flightSimulator.elapsedDays; },
    circumference() { return 35.8 * Math.PI; },
    dashArray() {
      return `${this.circumference * ((this.elapsedDays) / 16)}, 10000`;
    },
    isFlightOver() {
      return (this.$store.state.flightSimulator.visualizationState === 4);
    },
  },
  methods: {
    toggleWindsPanel() {
      if (!this.isFlightOver && !this.isPlaying) {
        this.$store.commit('flightSimulator/setFocusedExplorer', 1);
        this.$store.commit('flightSimulator/setPlaying', true);
        setTimeout(() => this.$store.commit('flightSimulator/setFocusedExplorer', 0), 0);
        this.$store.commit('general/setAltPanel', false);
      }
      this.$store.commit('general/toggleWindPanel');
    },
    closeWindsPanel() {
      this.$store.commit('general/closeWindsPanel');
    },
    toggleWinds(v) {
      this.$store.commit('flightSimulator/setWinds', v);
      this.closeWindsPanel();
    },
    toggleAnimation() {
      if (this.isFlightOver) {
        this.$store.dispatch('flightSimulator/resetVisualization');
        this.$store.commit('flightSimulator/setVisualizationState', 8);
        this.$store.commit('general/setFormStatus', true);
        this.$store.commit('general/setModalShow', true);
      } else {
        this.$store.commit('flightSimulator/setPlaying', !this.isPlaying);
      }
      this.$store.commit('general/setAltPanel', false);
    },
    goMobileOnBoard() {
      this.$store.commit('flightSimulator/setFocusedExplorer', 1);
    },
    mouseEnter() {
      this.hoverOnPlay = true;
    },
    mouseLeave() {
      this.hoverOnPlay = false;
    },
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    $speed: 10s; // depends on speed
    $r: 15px;
    $pi: 3.14159;

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
                    stroke-width: 5;
                    r: 18px;
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
    .mobile-winds-panel {
        display: flex;
        justify-content: space-evenly;
        flex-flow: row;
        position: absolute;
        top: 0;
        left: -130px;
        height: 32px;
        width: 130px;
        @include medium_down {
            left: 0;
            height: 100px;
            width: 32px;
            flex-flow: column;
            top: -100px;
        }
    }
    .fp-winds-on,
    .fp-winds-en,
    .fp-no-winds {
        width: 30px;
    }
    .play-animation {
        position: relative;
        .hover-text {
            display: block;
            margin-top: 1.15rem;
            margin-bottom: 0.65rem;
            line-height: 32px;
            height: 32px;
            &.elapsed-days {
                font-size: 1em;
                width: 80px;
            }
            @include medium_down {
                &:not(.elapsed-days) {
                    display: none;
                    visibility: hidden;
                    opacity: 0;
                }
            }
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
            &:first-child {
                margin-top: 1rem;
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
                    stroke-dashoffset: 1px;
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
