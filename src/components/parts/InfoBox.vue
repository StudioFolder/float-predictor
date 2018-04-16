<template>
    <div class="info-box shadowed">
        <div class="header">
            Info & Legend
            <div class="close" @click="closeBox"></div>
        </div>
        <div class="body">
            <ul class="dashboard-legend" v-if="isAnimationActive">
                <!--<li class="list-item &#45;&#45;instruction">-->
                    <!--<div class="title">-->
                        <!--Complete Instructions-->
                    <!--</div>-->
                    <!--<i class="fp"></i>-->
                <!--</li>-->
                <li class="list-item --screenshot">
                    <div class="title">
                        Take a screenshot
                        <div class="description">Capture a moment of your float!</div>
                    </div>
                    <i class="fp"></i>
                </li>
                <li class="list-item --winds">
                    <div class="title">
                        Activate winds panel
                        <div class="description">Explore the atmosphere.</div>
                    </div>
                    <i class="fp"></i>
                </li>
                <li class="list-item --elapsed-days">
                    <div class="title">
                        Total elapsed days
                        <div class="description">Click to pause and play.</div>
                    </div>
                    <i class="fp"><svg><circle class="fake-progress"></circle></svg></i>
                </li>
                <li class="list-item --explorers">
                    <div class="title">
                        Aerocene Sculptures
                        <div class="description">Click on an icon to go on board a Sculpture.</div>
                    </div>
                    <i class="fp"></i>
                </li>
            </ul>
            <div class="info-group locations">
                <div class="group-title small">Locations</div>
                <ul>
                    <li>
                        <div class="nav-item --rounded --black">
                            <i class="fp fp-departure"></i></div>
                        <div class="title">Departure point</div>
                    </li>
                    <li>
                        <div class="nav-item --rounded --black">
                            <i class="fp fp-destination"></i></div>
                        <div class="title">Destination point
                            <div class="description">(for Planned Floats)</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="info-group wind">
                <div class="group-title small">Winds ( km/h )</div>
                <div class="wind-legend"></div>
                <div class="wind-legend --enhanced"></div>
                <ul class="list-group horiziontal">
                    <li>0</li>
                    <li>50</li>
                    <li>>200</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'info-box',
  props: ['isAnimationActive'],
  methods: {
    closeBox() {
      this.$store.commit('general/closeInfoBox');
    },
  },
};
</script>

<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .info-box {
        background-color: $lightBlack;
        position: fixed;
        top: calc(#{$marginBase} + #{$itemWidth});
        right: calc(#{$marginBase} + #{$itemWidth} + #{$marginItem});
        width: 13.5rem;
        font-size: .9em;
        z-index: 20;
        @include medium_down {
            display: flex;
            flex-flow: column;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .dashboard-legend {
            margin-bottom: $marginBase;
            @include medium_down {
                margin-bottom: 0;
                display: flex;
                flex-flow: column;
            }
        }
        .list-item {
            height: calc(#{$itemWidth} + #{$marginItem*2});
            padding-top: 1rem;
            &.--elapsed-days {
                margin-top: 0.6rem;
                margin-bottom: 0.3rem;
            }
            @include medium_down {
                padding-top: unset;
                padding: $marginItem 0;
            }
        }
        .header {
            background-color: #fff;
            color: #000;
            text-align: center;
            height: calc(#{$itemWidth} + #{$marginItem*2});
            padding-top: 1rem;
            @include medium_down {
                flex: 0 0 auto;
                height: auto;
                font-size: 1.444rem; // 20.00
                padding: 1.444rem;
            }
            .close {
                width: 2rem;
                height: 2rem;
                background-color: $lightBlack;
                border-radius: 50%;
                position: absolute;
                right: $marginMobile;
                top: 1.444rem;
                background-image: url("~Icons/ico-close-w.svg");
                background-position: center;
                background-repeat: no-repeat;
                opacity: 1;
                @include medium_up {
                    display: none;
                }
            }
        }
        .body {
            @include medium_down {
                flex: 1 0 auto;
                padding: $marginItem;
                display: flex;
                flex-flow: column;
                justify-content: space-around;
            }
            .list-item {
                display: flex;
                justify-content: flex-end;
                @include medium_down {
                    flex-flow: row-reverse;
                }
                .title {
                    text-align: right;
                    margin-right: 1em;
                    @include medium_down {
                        display: flex;
                        align-items: center;
                    }
                }
                i {
                    background-image: url("~Icons/ico-caret-right.svg");
                    margin-right: $marginItem;
                    @include medium_down {
                        width: $itemWidth;
                        height: $itemWidth;
                        background-color: $gray;
                        border-radius: 50%;
                        margin-left: $marginItem*(4/3);
                        margin-right: $marginItem*2;
                    }
                }
                .description {
                    color: $gray;
                }
                &.--instruction {
                    @include medium_down {
                        display: none;
                    }
                }
                &.--screenshot {
                    @include medium_down {
                        order: 2;
                        i {
                            background-image: url("~Icons/ico-camera.svg");
                        }
                    }
                }
                &.--winds {
                    @include medium_down {
                        order: 3;
                        i {
                            background-image: url("~Icons/winds.svg");
                        }
                    }
                }
                &.--elapsed-days {
                    svg {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        overflow: visible;
                        transform: rotate(-90deg);
                    }
                    circle {
                        cx: 50%;
                        cy: 50%;
                        fill: transparent;
                        r: $itemWidth/2 + 2;
                        stroke-width: 5;
                        stroke: $textColor;
                        stroke-dasharray: 80px 100px;
                        @include medium_up {
                            display: none;
                        }
                    }
                    @include medium_down {
                        order: 1;
                        i {
                            background-color: transparent;
                            background-image: url("~Icons/pause.svg");
                            border: 1px solid $lightGray;
                        }
                        .title {
                            display: flex;
                            flex-flow: column;
                            align-items: flex-start;
                        }
                    }
                }
                &.--explorers {
                    @include medium_down {
                        order:4;
                        i {
                            background-image: url("~Icons/ico-camera.svg");
                        }
                        .title {
                            display: flex;
                            flex-flow: column;
                            align-items: flex-start;
                        }
                    }
                }
            }
        }
        .info-group {
            padding: $marginItem;
            .group-title {
                text-transform: uppercase;
                color: $gray;
                margin-bottom: $marginItem;
            }
            .nav-item {
                text-align: center;
                margin: 0;
            }
            .title {
                margin-left: $marginItem;
            }
            .description {
                color: $gray;
            }
            ul li {
                display: flex;
                align-items: center;
                padding: $marginItem 0;
            }
        }
        .wind-legend {
            background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
            height: 5px;
            &.--enhanced {
                background: linear-gradient(to right,
                        rgba(7,58,158,0.7) 0%,
                        rgba(0,244,175,0.7) 35%,
                        rgba(0,247,61,0.7) 56%,
                        rgba(247,230,0,0.7) 77%,
                        rgba(248,0,0,0.7) 100%);
            }
        }
    }
</style>
