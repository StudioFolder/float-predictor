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
                        Complete Instructions
                    </div>
                    <i class="fp fp-caret-right"></i>
                </li>
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
                <li class="list-item elapsed-days">
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
                        <div class="nav-item --rounded --black">
                            <i class="fp fp-departure"></i></div>
                        <div class="title">Departure point</div>
                    </li>
                    <li>
                        <div class="nav-item --rounded --black">
                            <i class="fp fp-destination"></i></div>
                        <div class="title">Destination point
                            <div class="description">(for Planned Flight)</div>
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
                    <li>>100</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'info-box',
  props: ['isAnimationActive'],
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

        .dashboard-legend {
            margin-bottom: $marginBase;
        }
        .list-item {
            height: calc(#{$itemWidth} + #{$marginItem*2});
            padding-top: 1rem;
            &.elapsed-days {
                margin-top: 0.6rem;
                margin-bottom: 0.3rem;
            }
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
