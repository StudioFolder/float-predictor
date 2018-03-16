<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" class="instruction-modal"
             centered hide-footer size="lg" title="How To Float">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="instructions-sections">
            <div class="section-title">{{sectionTitle}}</div>
            <div class="main-pagination-wrapper">
                <span class="sections">Sections</span> <span class="main-pagination"></span>
            </div>
        </div>
        <swiper :options="mainSliderOptions" ref="mainSlider">
            <swiper-slide>
                <swiper :options="journeysSliderOptions"
                        ref="journeysSlider"
                        class="internal-slider">
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-0"></div>
            </swiper-slide>
            <swiper-slide>
                <swiper :options="floatSliderOptions"
                        ref="floatSlider"
                        class="internal-slider">
                    <swiper-slide class="how-aerocene-float">
                        <h3 class="title">Aerocene Float Predictor</h3>
                        <div class="description --subtitle --upper">
                            By selecting a departure and a destination point, a ‘Planned Float’ uses
                            8 different routes to determine when would be the best day to launch a
                            Sculpture for going from A to B.
                        </div>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/Instructions_2-1a.gif">
                        </div>
                        <div class="description">
                            This principle was formulated by Archimedes
                            more than twenty centuries ago and in the case
                            of aerosolar scultures, the displaced fluid is
                            air at the ambient temperature. The body immersed
                            in this fluid is the balloon; since the warm air
                            inside the balloon is lighter than the ambient air,
                            the resultant force is a vertical upwards force: the
                            aerostatics force or "lift".
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Planned float vs. Free float</h3>
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
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Departure and Destination</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/Instructions_2-2.gif">
                        </div>
                        <div class="description">
                            Departure and destination points can be selected by typing any city in
                            the world into the entry field.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-1"></div>
            </swiper-slide>
            <swiper-slide>
                <swiper :options="afterJourneySliderOptions"
                        ref="afterJourneySlider"
                        class="internal-slider">
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                    <swiper-slide>
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
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-2"></div>
            </swiper-slide>
        </swiper>
        <div v-show="navIcon === 'scroll'" class="nav-icon --scroll">
            <i class="fp-scroll"></i></div>
        <div v-show="navIcon === 'down'" class="nav-icon --down" @click="goToNextSection">
            <div class="font-small">Go to section {{activeIndex + 2}}</div>
            <i class="fp fp-next-down"></i></div>
    </b-modal>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'instruction-modal',
  components: { swiper, swiperSlide },
  data() {
    return {
      activeIndex: 0,
      journeysSliderBeginning: true,
      journeysSliderEnd: false,
      floatSliderEnd: false,
      afterJourneySliderEnd: false,
      archiveSliderEnd: false,
      mainSliderBaseOptions: {
        direction: 'vertical',
        releaseOnEdges: true,
        slidesPerView: 1,
        autoHeight: true,
        allowTouchMove: false,
        mousewheel: false,
        pagination: {
          el: '.main-pagination',
          type: 'bullets',
          clickable: true,
          renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
        },
      },
      internalSliderOptions: {
        direction: 'vertical',
        releaseOnEdges: true,
        mousewheel: true,
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
          clickable: true,
        },
      },
    };
  },
  computed: {
    navIcon() {
      if (this.activeIndex === 0 && this.journeysSliderBeginning) {
        return 'scroll';
      } else if (
        (this.activeIndex === 0 && this.journeysSliderEnd)
        || (this.activeIndex === 1 && this.floatSliderEnd)
        || (this.activeIndex === 2 && this.afterJourneySliderEnd)
      ) {
        return 'down';
      }
      return '';
    },
    slideHeight() {
      let slideHeight = 639;
      if (window.matchMedia('(max-width: 1200px)').matches) {
        slideHeight = window.innerHeight - 148;
      }
      return slideHeight;
    },
    internalSlideHeight() {
      let internalSlideHeight = 594;
      if (window.matchMedia('(max-height: 568px)').matches) {
        internalSlideHeight = this.slideHeight - 15;
      } else if (window.matchMedia('(max-height: 667px)').matches) {
        internalSlideHeight = this.slideHeight - 15;
      }
      return internalSlideHeight;
    },
    mainSliderOptions() {
      return {
        ...this.mainSliderBaseOptions, height: this.slideHeight,
      };
    },
    journeysSliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-0',
        },
        height: this.internalSlideHeight,
      };
    },
    floatSliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-1',
        },
        height: this.internalSlideHeight,
      };
    },
    afterJourneySliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-2',
        },
        height: this.internalSlideHeight,
      };
    },
    archiveSliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-3',
        },
        height: this.internalSlideHeight,
      };
    },
    sectionTitle() {
      let title = '';
      switch (this.activeIndex) {
        case 0:
          title = '1—Aerosolar Journeys';
          break;
        case 1:
          title = '2—How to Float';
          break;
        case 2:
          title = '3—After Journey';
          break;
        case 3:
          title = '4—Archive';
          break;
        default:
          title = '';
      }
      return title;
    },
  },
  mounted() {
    this.$watch(
      () => this.$refs.mainSlider.swiper.activeIndex,
      (newVal) => {
        this.activeIndex = newVal;
      },
    );
    this.$watch(
      () => this.$refs.journeysSlider.swiper.isBeginning,
      (newStatus) => {
        this.journeysSliderBeginning = newStatus;
      },
    );
    this.$watch(
      () => this.$refs.journeysSlider.swiper.isEnd,
      (newStatus) => {
        this.journeysSliderEnd = newStatus;
      },
    );
    this.$watch(
      () => this.$refs.floatSlider.swiper.isEnd,
      (newStatus) => {
        this.floatSliderEnd = newStatus;
      },
    );
    this.$watch(
      () => this.$refs.afterJourneySlider.swiper.isEnd,
      (newStatus) => {
        this.afterJourneySliderEnd = newStatus;
      },
    );
    this.$watch(
      () => this.$refs.archiveSlider.swiper.isEnd,
      (newStatus) => {
        this.afterJourneySliderEnd = newStatus;
      },
    );
  },
  methods: {
    goToNextSection() {
      this.$refs.mainSlider.swiper.slideNext();
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
$lateralSpace: 7rem;
$lateralSpaceMobile: .5rem;
.instruction-modal {
    .modal-dialog {
        max-width: 1024px;
        @include medium_down {
            margin: 0;
        }
    }
    .carousel-indicators {
        bottom: -25px;
        li {
            height: 10px;
            width: 10px;
            border-radius: 50%;
            margin: 0 10px;
        }
    }
}
.instructions-sections {
    display: flex;
    justify-content: space-between;
    padding-left: $lateralSpace;
    padding-right: $lateralSpace;
    margin-top: -$marginBase/2;
    @include medium_down {
        padding-left: $lateralSpaceMobile;
        padding-right: $lateralSpaceMobile;
        margin-top: 0;
    }
    .main-pagination-wrapper {
        font-size: .8em;
        padding-top: 5px;
    }
    .sections {
        color: $gray;
        @include small_down {
            display: none;
        }
    }
    .section-title {
        width: 50%;
        text-align: left;
        color: $gray;
    }
    .main-pagination {
        width: 50%;
        text-align: right;
    }
}
.internal-slider .swiper-slide {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    padding-left: $lateralSpace;
    padding-right: $lateralSpace;
    @include medium_down {
        padding-left: $lateralSpaceMobile;
        padding-right: $lateralSpaceMobile;
    }
    .title {
        flex: 0 0 auto;
        margin: $marginItem 0;
        @include small_down {
            margin: $marginItem*2 0 $marginItem;
        }
    }
    .animation-wrapper {
        text-align: center;
        flex: 1 1 auto;
        height: 40%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        .animation {
            max-height: 100%;
            max-width: 100%;
            text-align: center;
            &.--big {
                max-width: 130%;
                width: 130%;
                height: auto;
                margin-left: -15%;
            }
        }
    }
    .description {
        flex: 0 0 auto;
        padding: .5em 0;
        overflow: hidden;
        max-width: 35em;
        @include small_down {
            max-width: unset;
            font-size: .9em;
        }
        &.--upper {
            margin-top: 1em;
        }
    }
}
.how-aerocene-float {
    .animation-wrapper {
        margin-right: -90px;
        margin-top: -10px;
    }
    .--subtitle{
        margin-bottom: -90px;
    }
}
.nav-icon {
    position: absolute;
    bottom: 30px;
    left: 50%;
    z-index: 9;
    text-align: center;
    transform: translateX(-50%);
    color: $gray;
    &.--down {
        cursor: pointer;
    }
    @include small_down {
        bottom: 15px;
    }
}
.scroll-icon {
    position: relative;
    width: 100%;
    i {margin: 0 auto}
}
.main-pagination {
    .swiper-pagination-bullet {
        background: transparent;
        border-radius: 0;
        margin-left: .5em;
        height: 20px;
        width: 20px;
    }
}
*[class^="internal-pagination"] {
    position: absolute;
    height: 600px;
    top: 0;
    right: 0.5rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    z-index:10;
    @include medium_down {
        display: none;
    }
    .swiper-pagination-bullet {
        background-color: #fff;
        opacity: .4;
        margin: .5em 0;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
    }
}
</style>
