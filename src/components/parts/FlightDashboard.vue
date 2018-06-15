<template>
    <div class="flight-dashboard" :class="{'is-onboard': isOnboard, 'is-open': isAltPanelOpen}">
        <div class="play-animation">
            <div class="hover-text elapsed-days">Day {{elapsedDays}}/16</div>
        </div>
        <winds-panel />
        <div class="separator"></div>
        <div class="explorer-description">
            <p>Aerocene Sculptures</p>
            <p class="desc">
                The Float Predictor launches one Aerocene
                Sculpture every day during the first week
                of floating, predicting their trajectories
                around the globe on a 16-day simulation.
            </p>
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
/**
 * @author Studio Folder - @StudioFolder
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import Explorer from './Explorer';
import windsPanel from './WindsPanel';

export default {
  name: 'flight-dashboard',
  props: ['isInfoboxOpen', 'isOnboard'],
  components: { Explorer, windsPanel },
  data() {
    return {
      activeExplorers: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  computed: {
    winds() { return this.$store.state.flightSimulator.winds; },
    isPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    elapsedDays() { return this.$store.state.flightSimulator.elapsedDays; },
    circumference() { return 35.8 * Math.PI; },
    dashArray() {
      return `${this.circumference * ((this.elapsedDays) / 32)}, 10000`;
    },
    isAltPanelOpen() {
      return this.$store.state.general.isAltPanelOpen;
    },
  },
  methods: {
    toggleWinds(v) {
      this.$store.commit('flightSimulator/setWinds', v);
    },
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    $speed: 10s; // depends on speed
    $r: 25px;
    $pi: 3.14159;
    .flight-dashboard {
        display: flex;
        flex-flow: column;
        width: 100%;
        height: 100%;
        list-style: none;
        padding: $marginMobile $marginMobile*3;
        > * {
            position: relative;
            text-align: center;
            flex: 1 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .play-animation {
            position: relative;
            flex: 0 0 auto;
        }
        .winds-panel {
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            > * {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                width: 100%;
            }
            .wind-buttons > div,
            .wind-labels .hover-text{
                width: 150px;
                text-align: center;
                margin-bottom: 10px;
            }
        }
        .separator {
            flex: 0 1 auto;
            height: 1px;
            background-color: #FFF;
        }
        .explorer-description {
            flex-flow: row wrap;
            align-content: center;
            p {
                flex: 1 1 100%;
                &.desc {
                    font-size: 14px;
                    color: $gray;
                    max-width: 35em;
                    margin-top: 10px;
                }
            }
        }
        .explorers-dashboard {
            display: flex;
            justify-content: space-between;
        }
    }
    .flight-dashboard.is-open {
        height: calc(100vh - 115px);
        overflow: hidden;
        .winds-panel {
            height: 100%;
        }
    }
    .fp-winds-on,
    .fp-winds-en,
    .fp-no-winds {
        width: 35px;
    }
    .play-animation {
        position: relative;
        .elapsed-days {
            display: block;
            line-height: 32px;
            height: 32px;
            font-size: 1.5em;
        }
    }
    .winds-panel {
        .nav-item {
            position: relative;
            transition: background-color .4s ease;
            margin: 0 auto;
            &.isActive {
                background-color: #FFF;
            }
        }
    }
    .explorers-dashboard {
        .explorer-item {
            border: none;
            margin-bottom: 1.4rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity .3s;
            cursor: pointer;
            background-color: transparent;
            &.--focused {
                background-color: transparent;
                circle.progress {
                    stroke-width: 0;
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
                circle.baseline {
                    fill: #FFF;
                }
            }
            .explorer-id {
                position: absolute;
                margin-top: 1px;
                color: $gray;
                font-size: .9rem;
                z-index: 9;
            }
            .explorer-gif {
                width: 15px;
                margin-top: 4px;
                margin-left: 1px;
                img {
                    max-width: 100%;
                }
            }
            .exit-from-onboard {
                i {
                    z-index: 99;
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
                transition: all .4s ease .4s;
                &.progress {
                    stroke-width: 7;
                    r: $r;
                    stroke: $gray;
                    transition: stroke-dasharray $speed linear;
                }
                &.baseline {
                    stroke-width: 1;
                    stroke: #FFF;
                }
            }
        }
    }
</style>
