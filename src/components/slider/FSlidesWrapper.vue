<template>
    <div class="f-slider-wrapper" @wheel.stop.prevent="onScroll">
        <div class="f-slider-inner">
            <f-slide id="101">
                <h3 class="title">Aerocene</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_1-1.gif">
                </div>
                <div class="description">
                    Aerocene is an open platform for the development of emissions-free
                    Sculptures floating in the air. Aerosolar journeys are a new way of
                    travelling in the Aerocene epoch, collaborating with the atmosphere
                    instead of industrialising, restricting and capitalising off of it.
                </div>
            </f-slide>
            <f-slide id="102">
                <h3 class="title">Aerocene Sculptures</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_1-2.gif">
                </div>
                <div class="description">
                    Aerocene Sculptures are air-fuelled balloons for solar-powered
                    atmospheric exploration. By becoming buoyant only with the heat of
                    the Sun and infrared radiation from Earth’s surface, the Sculptures
                    can float freely across political borders. Different shapes and
                    materials have been tested, and several Sculptures have been
                    successfully recovered after floating hundreds of kilometers.
                </div>
            </f-slide>
            <f-slide id="103">
                <h3 class="title">Aerocene Float Predictor</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_1-3.gif">
                </div>
                <div class="description">
                    The Float Predictor allows for endless virtual journeys around the globe
                    without CO2-emissions. The system utilises open meteorological data to
                    predict Aerosolar trajectories based on real-time weather forecasts.
                </div>
            </f-slide>
            <f-slide id="201">
                <h3 class="title">Planned Float vs. Free Float</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-1a.gif">
                </div>
                <div class="description">
                    By selecting a departure and a destination point, a ‘Planned Float’
                    uses 8 different routes to determine when would be the best day to
                    launch a Sculpture for going from A to B.
                </div>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-1b.gif">
                </div>
                <div class="description">
                    A ‘Free Float’ just needs a departure point: winds and thermal air
                    currents will do the rest, bringing 8 Sculptures around the globe
                    on a collaborative journey with the atmosphere.
                </div>
            </f-slide>
            <f-slide id="202">
                <h3 class="title">Departure and Destination</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-2.gif">
                </div>
                <div class="description">
                    Departure and destination points can be selected by typing any city in
                    the world into the entry field.
                </div>
            </f-slide>
            <f-slide id="203">
                <h3 class="title">Float Controls</h3>
                <div class="description --upper">
                    When a journey has started, a float control interface will allow
                    you to interact with the visualisation. The simulation will run for 16
                    days, and eight Aerocene Sculptures will be launched, one per day during
                    the first week of float.
                </div>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-3_02.gif">
                </div>
            </f-slide>
            <f-slide id="204">
                <h3 class="title">Go on Board a Sculpture</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-5.gif">
                </div>
                <div class="description">
                    You can jump on board an Aerocene Sculpture and see the Earth pass
                    below you from a different perspective: just click on any sculpture’s
                    icon on the right-hand side of the screen or within the visualisation
                    itself. When on board, real-time float telemetry data will appear.
                </div>
            </f-slide>
            <f-slide id="205">
                <h3 class="title">Understanding Winds</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-6.gif">
                </div>
                <div class="description">
                    The Float Predictor visualises global wind patterns for
                    16 days in the future, at a default altitude of 10,000 m.
                    When the simulation is paused, a slider will allow to
                    visualise the winds at different heights.
                </div>
            </f-slide>
            <f-slide id="206">
                <h3 class="title">Controlling the Globe</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_2-4.gif">
                </div>
                <div class="description">
                    Click (or tap) and drag the globe to tilt the view.
                    Zoom in and out by scrolling (or pinching) on the globe.
                    To go back and follow the paths of all of the Aerocene Sculptures,
                    just click “Re-centre”.
                </div>
            </f-slide>
            <f-slide id="301">
                <h3 class="title">Aeroglyphs</h3>
                <div class="animation-wrapper">
                    <div class="animation-wrapper">
                        <img class="animation"
                             src="~img/instructions/Instructions_3-1.gif">
                    </div>
                </div>
                <div class="description">
                    Each Aerosolar journey produces an Aeroglyph: an air signature that
                    represents the 16-day trajectory of an Aerocene Sculpture around
                    the globe. Aeroglyphs are saved into an archive: a gallery of all
                    the fossil-free journeys around the world.
                </div>
            </f-slide>
            <f-slide id="302">
                <h3 class="title">Save and Share</h3>
                <div class="animation-wrapper">
                    <img class="animation --big"
                         src="~img/instructions/Instructions_3-2.gif">
                </div>
                <div class="description">
                    Aeroglyphs are graphical depiction of how Aerocene
                    sculptures float around the globe. They created in
                    a vector polar projection that can be downloaded
                    and manipulated. All selected floats in the Float
                    Predictor are automatically stored into the
                    Aeroglyphs Archive, a gallery of all the journeys
                    around the world.
                </div>
            </f-slide>
            <f-slide id="303">
                <h3 class="title">Download and APIs</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="~img/instructions/Instructions_3-4.gif">
                </div>
                <div class="description">
                    Besides being saved in our online archive,
                    each Aeroglyph can be downloaded as a JSON file.
                    The entire database of Aerosolar journeys can
                    be accessed via the Aerocene Float Predictor’s APIs.
                </div>
            </f-slide>
        </div>
    </div>
</template>
<script>
import fSlide from './FSlide';

export default {
  name: 'f-slides-wrapper',
  components: { fSlide },
  props: ['currentIndex', 'height'],
  methods: {
    onScroll(e) {
      if (e.deltaY > 10) {
        this.$emit('scrollDown', parseInt(this.id, 10) + 1);
      } else if (e.deltaY < -10) {
        this.$emit('scrollUp', parseInt(this.id, 10) - 1);
      }
    },
  },
};
</script>
<style lang="scss">
</style>
