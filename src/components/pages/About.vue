<template>
    <div class="main-content" :style="{ height: upperHeight }">
        <article role="article" class="article" ref="content">
            <h1 class="entry-title">About This Tool</h1>
            <h2 class="entry-subtitle">
                &ldquo;One of the oddest sensations of hot air balloon float
                is the feeling of absolute stillness and extreme quiet.
                A paradox: moving with the wind eliminates the feeling
                of wind and thus a feeling of movement.&rdquo;
                <small>Tomás Saraceno<br>Artist and community member</small>
            </h2>
            <div class="entry-body">
                <p>
                    The Aerocene Float Predictor is a global forecasting system that utilises open
                    meteorological data to predict flight paths of aerosolar powered Sculptures
                    circling around the globe without CO2-emissions. Incorporating real-time
                    information from 16-day forecasts of wind speeds at different altitudes,
                    the Float Predictor is a navigational tool used to plan journeys in the
                    Aerocene epoch.
                </p>
                <p>
                    Beginning in 2012, the Float Predictor started as a collaborative project with
                    Aerocene community members, artist Tomás Saraceno and meteorologist Lodovica
                    Illari at the MIT Department of Earth, Atmospheric and
                    Planetary Sciences (<a target="_blank" href="https://eapsweb.mit.edu/">EAPS
                </a>).
                    Together they wanted to explore how
                    to circumnavigate the world using no other resource than the sun.
                    Soon joined by oceanographer Glenn Flierl and research assistant Bill McKenna,
                    they begun examining data from MIR (Montgolfières InfraRouges) solar balloon
                    float
                    conducted by the Centre Nationale d’Etudes Spatiales ( <a target="_blank" href="https://cnes.fr/">CNES</a>), and computing float
                    paths for balloons floating for several weeks at particular heights
                    (or undergoing day-night cycles of rising and falling). After simulating
                    the evolving wind patterns around the globe based on wind forecast data from the
                    U.S. National Oceanic and Atmospheric Administration, the EAPS team created an
                    interactive web interface and thus the Float Predictor was born. You can read
                    more about his collaboration
                     <a target="_blank" href="http://synoptic.mit.edu/aerocene-collaboration/">here</a>.
                </p>
                <p>
                    In late 2017,  <a target="_blank" href="http://www.studiofolder.it/">Studio Folder</a> from Milan, Italy, continued
                    MIT's work by developing a new visualisation environment
                    coupled with modern programming standards and thus creating
                    a more engaging Aerocene Float Predictor experience.
                </p>
                <p>
                    In late 2017, Studio Folder from Milan, Italy, continued MIT's work by
                    developing a new visualisation environment coupled with modern programming
                    standards. Since then, the Float Predictor has been continuously developed by
                    the Aerocene community.
                </p>
            </div>
            <back-to-viz />
        </article>
    </div>
</template>

<script>
import backToViz from 'Parts/BackToViz';

export default {
  name: 'About',
  components: {
    backToViz,
  },
  data() {
    return {
      upperHeight: 0,
    };
  },
  created() {
    this.$store.commit('flightSimulator/setVisualizationState', 6);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
};
</script>
<style>
.entry-subtitle small{
    font-size: .5em;
    display: block;
    margin-top: 2.4em;
}
</style>
