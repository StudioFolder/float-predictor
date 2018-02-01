<template>
    <div class="info-box">
        <div class="header">
            <div class="list-item">
                Info & Legend
            </div>
        </div>
        <div class="body">
            <ul class="dashboard-legend" v-if="isAnimationActive">
                <li class="list-item">
                    <div class="title">
                        Take a Screenshot
                    </div>
                    <i class="fp fp-caret-right"></i>
                </li>
                <li class="list-item">
                    <div class="title">
                        Turn winds on/off
                    </div>
                    <i class="fp fp-caret-right"></i>
                </li>
                <li class="list-item">
                    <div class="title">
                        Total elapsed day
                        <div class="description">Click to pause and play</div>
                    </div>
                    <i class="fp fp-caret-right"></i>
                </li>
                <li class="list-item">
                    <div class="title">
                        Aerocene explorers
                        <div class="description">Click the icon to go on board.</div>
                    </div>
                    <i class="fp fp-caret-right"></i>
                </li>
            </ul>
            <div class="info-group locations">
                <div class="group-title small">Locations</div>
                <ul>
                    <li>
                        <div class="nav-item --rounded --white"><i class="fp fp-up"></i></div>
                        <div class="title">
                            Departure point
                        </div>
                    </li>
                    <li>
                        <div class="nav-item --rounded --white"><i class="fp fp-down"></i></div>
                        <div class="title">
                            Destination point
                            <div class="description">(for Planned Flight)</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="info-group wind">
                <div class="group-title small">Winds</div>
                <ul>
                    <li>10 km/h</li>
                    <li>50 km/h</li>
                    <li>100 km/h</li>
                </ul>
            </div>
            <div class="info-group globe">
                <div class="group-title small">Globe</div>
                <ul>
                    <li><i class="fp fp-hand"></i>
                        <div class="title">Click and drag the globe with the mouse<br>
                            (or tap with your finger) to tilt the view.</div>
                    </li>
                    <li><i class="fp fp-zoom"></i>
                        <div class="title">Zoom in and out to get a more detailed view.</div>
                    </li>
                    <li><i class="fp"></i>
                        <div class="title">Complete instructions can be found here.</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'info-box',
  computed: {
    isAnimationActive() { return this.$store.state.flightSimulator.isActive; },
  },
};
</script>

<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .info-box {
        background-color: $lightGray;
        position: fixed;
        top: $marginBase + $itemWidth;
        right: $marginBase + $itemWidth + $marginItem;
        width: 13.5rem;
        font-size: .9em;

        .dashboard-legend {
            margin-bottom: $marginBase;
        }
        .list-item {
            height: $itemWidth + $marginItem*2;
            padding-top: 1.25rem;
        }
        .header {
            background-color: #fff;
            color: #000;
            .list-item {
                text-align: center;
            }
        }
        .body .list-item {
            display: flex;
            justify-content: flex-end;
            .title {
                text-align: right;
                margin-right: 1em;
            }
            i {margin-right: $marginItem;}
            .description {
                color: $gray;
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
            ul {
                li {
                    display: flex;
                    align-items: center;
                    padding: $marginItem 0;
                }
            }
        }
    }
</style>
