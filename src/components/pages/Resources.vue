<template>
    <div class="main-content" :style="{ height: upperHeight }">
        <article role="article" class="article" ref="content">
            <h1 class="entry-title">Resources and API</h1>
            <div class="entry-body">
                <h4>Weather Data</h4>
                <p>
                    The Aerocene Float Predictor computes and visualises the trajectories of
                    floating solar balloons based on real-time forecasts of global wind patterns.
                    Atmospheric data is gathered from NOAA’s Global Forecast System (GFS), a
                    numerical weather prediction system containing a global computer model and
                    variational analysis run by the US National Weather Service (NWS).
                </p>
                <p>
                    The 3D visualisation presents accurate wind parameters (speed and direction at
                    specified height) in three hourly intervals, at different altitude levels that
                    can be explored through the Float Predictor’s user interface. The mathematical
                    model is run four times a day, and outputs a forecast for up to 16 days in the
                    future. The simulation uses the most recent midnight or noon UTC data. The
                    complete dataset includes many other meteorological variables (including
                    atmospheric, oceanic, land/soil and sea ice models) that are distributed
                    through different product types and can be accessed from the
                     <a target="_blank" href="https://www.ncdc.noaa.gov/data-access/model-data/model-datasets/global-forcast-system-gfs">
                        GFS</a> homepage.
                </p>
                <h4>Aerosolar Trajectories</h4>
                <p>
                    Each aerosolar journey that is initiated with the Float Predictor originates a
                    virtual path around the globe. All the trajectories (called “Aeroglyphs”) are
                    saved into a database and exhibited in the <router-link to="gallery">Aeroglyphs
                    Archive</router-link>. Aeroglyphs are stereographic polar projections of the
                    global 3D paths calculated while running the 16-day GFS model.
                </p>
                <p>
                    Aeroglyphs can be accessed (individually or in bulk) through a
                     <a target="_blank" href="http://float.aerocene.org/api/api.php">REST API</a>
                    in JSON format. Each JSON file has a specified structure that contains
                    the following variables:
                </p>
                <ul>
                    <li>
                        <span>id</span>:
                        A progressive numeral that unequivocally identifies each Aeroglyph;
                    </li>
                    <li><span>created</span>:
                        Departure date, expressed as YYYY-MM-DD HH:MM:SS;</li>
                    <li><span>departure</span>:
                        Departure location, expressed as city, country, coordinates;</li>
                    <li><span>destination</span>:
                        Destination location, expressed as city, country, coordinates
                        (only for planned float mode);</li>
                    <li><span>min_dist</span>:
                        Minimum distance from the destination (only for planned float
                        mode);</li>
                    <li><span>min_time</span>:
                        Number of days that passed since the launch when the Aerosolar
                        Sculpture got closer to the destination (for planned float mode);</li>
                    <li><span>speed</span>:
                        Average speed;</li>
                    <li><span>path</span>:
                        List of coordinates expressed in latitude, longitude.</li>
                </ul>
                <h4>3D VISUALISATION</h4>
                <p>
                    The 3D visualisation has been built using
                    <a target="_blank" href="https://threejs.org">three.js</a>, a cross-browser
                    JavaScript library/API used to create and display animated 3D computer graphics
                    in a web browser. It was first released by Ricardo Cabello in April 2010 and
                    since then is being made available as a
                    <a target="_blank" href="https://github.com/mrdoob/three.js/">
                        GitHub repository</a> under the MIT license.
                </p>
                <h4>BASEMAP</h4>
                <p>The basemap is a combination of imagery from NASA’s Visible Earth catalog
                    and Mapbox.</p>
                <h4>GITHUB REPOSITORY</h4>
                <p>
                    The source code of the Aerocene Float Predictor can be accessed on
                    <a
                        href="https://github.com/Aerocene/aerocene-float-predictor">GitHub.
                    </a>
                </p>
            </div>
            <back-to-viz />
        </article>
    </div>
</template>

<script>
import backToViz from 'Parts/BackToViz';

export default {
  name: 'Resources',
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
