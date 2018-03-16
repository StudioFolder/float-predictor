<template>
    <div class="info-box">
        <div class="sculpture-gif">
            <img src="~img/instructions/instructions_1-1.gif">
        </div>
        <div class="column-text">
            <p>
                Aerocene Sculptures are air-fuelled balloons for
                solar-powered atmospheric exploration.
                By becoming buoyant only with the heat
                of the Sun and infrared radiation from
                Earth’s surface, the Sculptures can float
                freely across political borders. Different shapes
                and materials have been tested, and several
                Sculptures have been successfully recovered
                after floating hundreds of kilometers.
            </p>
            <p>
                The Aerocene Float Predictor allows for endless virtual
                journeys around the globe without CO2-emissions.
                The system computes and visualises the trajectories
                of floating solar balloons based on real-time forecasts
                of global wind patterns. Aerosolar journeys are a new
                way of travelling in the Aerocene epoch, collaborating
                with the atmosphere instead of industrialising,
                capitalising and restricting it.
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'info-box',
};
</script>

<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .info-box {
        position: absolute;
        z-index: 18; // header 20
        height: 100vh;
        width: 100%;
        padding: 100px $marginMobile $marginMobile;
        background-color: $bodyColor;
        overflow: hidden;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        > div {
            position: relative;
            flex: 1 1 auto;
            display: flex;
            align-items: center;
        }
        .sculpture-gif {
            text-align: center;
            img {
                margin: 0 auto;
                max-height: 300px;
                max-width: 100%;
            }
        }
        .column-text {
            > p {
                flex: 1 1 50%;
                margin: 0;
            }
        }
    }
</style>
