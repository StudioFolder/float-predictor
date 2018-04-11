<template>
    <div class="main-content" :style="{ height: upperHeight }">
        <article role="article" class="article" ref="content">
            <h1 class="entry-title">Aerocene Sculptures</h1>
            <h2 class="entry-subtitle">
                Aerocene manifests as a series of air-fuelled Sculptures. They become buoyant only
                by the heat of the Sun and infrared radiation from the surface of Earth.
            </h2>
            <div class="entry-body">
                <p>
                    The Aerocene Foundation has created several Sculptures, experimenting with
                    different shapes and materials, for solar-powered atmospheric exploration.
                    The Sculptures float freely, crossing political borders in different parts of
                    the world. Unlike many other balloon flights, we have been successful in
                    recovering many after they have  floated for hundreds of kilometers. Aerocene
                    Sculptures float in the atmosphere through a principle formulated by Archimedes
                    of Syracuse more than 20 centuries ago:
                </p>
                <p class="cit">
                    &ldquo;Anybody immersed in a fluid experiences a force opposed to its weight of
                    magnitude equal to the weight of the fluid which it displaces.&rdquo;
                </p>
                <p>
                    According to the Archimedean model, buoyancy is achieved when the density of a
                    body is lower than the density of the surrounding fluid. Tapping into an
                    unlimited source of energy (the Sun), an Aerosolar Sculpture is designed to
                    absorb and preserve as much infrared radiation as possible. When the warm air
                    inside the balloon is lighter than the ambient air, the resultant force is a
                    vertical upwards force: the aerostatics force or &lsquo;lift&rsquo;.
                </p>
                <figure>
                    <div class="img-wrapper">
                        <img srcset="~img/gemini-free-flight_27-aug-2016_01_web.jpg 1400w,
                                ~img/gemini-free-flight_27-aug-2016_01_mobile.jpg 800w"
                             sizes="(max-width: 540px) 800px, 1400px"
                             alt=""
                             :height=imgHeight>
                    </div>
                    <div class="img-wrapper">
                        <img srcset="~img/gemini-free-flight_27-aug-2016_02_web.jpg 1400w,
                                ~img/gemini-free-flight_27-aug-2016_02_mobile.jpg 800w"
                             sizes="(max-width: 540px) 800px, 1400px"
                             alt=""
                             :height=imgHeight>
                    </div>
                    <figcaption> <a target="_blank" href="http://aerocene.org/aug-27-schoenfelde-germany">Aerocene
                        Gemini Free Float</a>, August 27th, 2016. Two Aerocene Sculptures (a Gemini
                        and a Tetrahedron Transparent), launched from Schönfelde, Germany, travelled
                        for 605 kilometres over 12 hours, reaching a maximum altitude of 16,283m.
                    </figcaption>
                </figure>
                <p>
                    On a sunny day, due to the partially reflective material of the Aerocene
                    Sculpture, the air inside an envelope will slowly heat up until the inner
                    air density is low enough to provide sufficient
                    lift to overcome gravity and make the
                    envelope rise. Once in the air, an untethered Sculpture can easily rise up
                    to the stratosphere in a couple of hours. Depending on colour, volume of air
                    and geometry, it can reach a variety of altitude levels—from 10 to 30 km above
                    the ground. If the sky is clear, a solar balloon can remain in the air at
                    night, when the Earth reflects back a large amount of the Sun’s radiation
                    accumulated during the day.
                </p>
            </div>
            <back-to-viz />
        </article>
    </div>
</template>

<script>
import backToViz from 'Parts/BackToViz';

export default {
  name: 'aerocenee-explorer',
  components: {
    backToViz,
  },
  data() {
    return {
      upperHeight: 0,
      imgHeight: 0,
    };
  },
  computed: {
  },
  created() {
    this.$store.commit('flightSimulator/setVisualizationState', 6);
    if (window.matchMedia('(max-width: 424px)').matches) {
      this.imgHeight = '150px';
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      /* the viewport is less than 400 pixels wide */
      this.imgHeight = '200px';
    } else {
      this.imgHeight = '378px';
    }
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
};
</script>
