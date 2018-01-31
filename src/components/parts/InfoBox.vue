<template>
    <div class="info-box">
        <div class="header">
            <div class="list-item">Info & Legend</div>
        </div>
        <div class="body">
            <div class="dashboard-legend" v-if="isAnimationActive">
                <div class="list-item">Take a Screenshot <i class="fp fp-caret-right"></i></div>
                <div class="list-item">Turn winds on/off <i class="fp fp-caret-right"></i></div>
                <div class="list-item">Total elapsed days <i class="fp fp-caret-right"></i></div>
                <div class="list-item">Aerocene explorers <i class="fp fp-caret-right"></i></div>
            </div>
            <div class="info-group locations">
                <div class="group-title small">Locations</div>
                <ul>
                    <li>Departure Point</li>
                    <li>Destination Point<br><span class="subtitle">(for Planned Flight)</span></li>
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
                    <li>
                        Click and drag the globe with the mouse
                        (or tap with your finger) to tilt the view.
                    </li>
                    <li>
                        Zoom in and out to get a more detailed view.
                    </li>
                    <li>
                        Complete instructions
                        can be found here.
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
        top: $marginBase + 3rem;
        right: $marginBase + 3rem;
        width: 13.5rem;
    }
    .header .list-item{
        text-align: center;
        background-color: #fff;
        color: #000;
    }
    .list-item {
        height: 3rem;
        text-align: right;
        padding: 1rem 1em 0;
    }
    .group-title {
        text-transform: uppercase;
        color: $lightGray;
    }
    .info-group {
        padding: .5em;
    }
</style>
