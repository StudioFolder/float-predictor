<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" class="instruction-modal"
             centered hide-footer size="lg" title="Instructions">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="instructions-sections">
            <div class="section-title">{{sectionTitle}}</div>
            <div class="main-pagination-wrapper">
                <span class="sections">Sections</span> <span class="main-pagination"></span>
            </div>
        </div>
        <swiper :options="mainSliderOptions" ref="mainSlider">
            <!-- slides -->
            <swiper-slide>
                <swiper :options="journeysSliderOptions"
                        ref="journeysSlider"
                        class="internal-slider">
                    <swiper-slide>
                        <h3 class="title">Aerocene Sculptures</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-1.gif">
                        </div>
                        <div class="description">
                            The Aerocene Foundation has created several
                            sculptures for solar-powered atmospheric
                            exploration. By exploring different shapes
                            and materials, the  sculptures float freely
                            crossing political borders in different part
                            of the world. Dissimilar to many other balloon
                            flights, ,most of them have been successfully
                            recovered after floating hundreds of kilometers.
                        </div>
                    </swiper-slide>
                    <swiper-slide class="how-aerocene-float">
                        <h3 class="title">How Aerocene Sculptures Float</h3>
                        <div class="description --subtitle --upper">
                            Aerocene sculptures float in the atmosphere due
                            to archimedean buoyancy:
                            "Any body immersed in a fluid experiences
                            a force opposed to its weight of magnitude
                            equal to the weight of the fluid which it displaces".
                        </div>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-2.gif">
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
                        <h3 class="title">Float Predictor</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-3.gif">
                        </div>
                        <div class="description">
                            The Float Predictor is the tool we use to foresee
                            where Aerocene sculptures are going to float,
                            depending on wind intensity and direction in
                            location of departure. The Predictor launches
                            8 Explorers, one each day, and follows their journeys
                            through 16 days of travelling.
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-0"></div>
            </swiper-slide>
            <swiper-slide>
                <swiper :options="floatSliderOptions"
                        ref="floatSlider"
                        class="internal-slider">
                    <swiper-slide>
                        <h3 class="title">Planned float or Free float</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-1a.gif">
                        </div>
                        <div class="description">
                            Selecting a specific departing as well as a destination point,
                            a ‘Planned Float’ uses the 8 different routes to visualise
                            the trajectories and determine which would be the optimal
                            way of going from A to B.
                        </div>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-1b.gif">
                        </div>
                        <div class="description">
                            A ‘Free Float’ is guided by the wind and propelled
                            by thermal air currents. These journeys can be seen
                            as representing a new way of travelling in the Aerocene
                            epoch, collaborating with the atmosphere instead
                            of industrialising, capitalising and restricting it.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Departure and Destination</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-2.gif">
                        </div>
                        <div class="description">
                            You can choose departure and destination points
                            (the latter only for Planned floats) of your float.
                            Just click on an entry field in the form and
                            begin typing any city in the world! Alternatively,
                            you can click directly on the globe to choose
                            departure and destination points.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Float Interface</h3>
                        <div class="description --upper">
                            When your journey has started, a float interface
                            will appear allowing you to interact with the
                            visualisation, with actions such as: Take a screenshot;
                            Turn on/off winds; Play/Pause the flight;
                            Go on board one Explorer.
                        </div>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-3_02.gif">
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Controlling the Globe</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-4.gif">
                        </div>
                        <div class="description">
                            You can also interact with the globe.
                            Click on it and drag it with the mouse
                            (or tap with your finger) to tilt the view.
                            Zoom in and out by rolling your mouse wheel
                            (or pinching with your fingers) to get a more detailed view.
                            To go back and follow the Explorers, click “Re-centre”.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Go on Board</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-5.gif">
                        </div>
                        <div class="description">
                            During your journey, you can go on board the
                            Aerocene sculpture, and see the earth pass below
                            you from the sculpture's perspective. To do so,
                            click on the Aerocene icons beneath the Play/pause button,
                            or click on its path on the globe. When you are on board,
                            you can monitor real time data of the flight of
                            the selected Aerocene sculpture. You have access
                            to its departure date, the overall distance
                            it covered, and its current speed.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Understanding Winds</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-6.gif">
                        </div>
                        <div class="description">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Integer vulputate ex mauris,
                            in egestas turpis condimentum eu.
                            Proin rutrum massa sit amet semper viverra.
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
                        <h3 class="title">Selected float</h3>
                        <div class="animation-wrapper">
                            <div class="animation-wrapper">
                                <img class="animation"
                                     src="~img/instructions/instructions_3-1_02.gif">
                            </div>
                        </div>
                        <div class="description">
                            At the end of your journey, a single Explorer’s
                            float will be selected and presented: this is
                            the balloon that, during its float, came
                            closer to the selected Destination point. From
                            this final box, you can see the Aeroglyph of
                            the float, you can register and receive a personal
                            card of your journey, or you can share and
                            download your experience with Float Predictor.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Aeroglyphs</h3>
                        <div class="animation-wrapper">
                            <img class="animation --big"
                                 src="~img/instructions/instructions_3-2.gif">
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
                        <h3 class="title">E-mail and Share</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_3-3_02.gif">
                        </div>
                        <div class="description">
                            If you would like to share an Aeroglyph,
                            just click on the sharing icon and select
                            your social network. Alternatively, you can
                            copy the link on the browser to paste on any
                            of your social networks.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h3 class="title">Download and API</h3>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_3-4.gif">
                        </div>
                        <div class="description">
                            How to download data and usage of the API.
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-2"></div>
            </swiper-slide>
            <swiper-slide>
                <swiper :options="archiveSliderOptions"
                        ref="archiveSlider"
                        class="internal-slider">
                    <swiper-slide>
                        <h3 class="title">The Gallery</h3>
                        <div class="animation-wrapper">
                            <img class="animation --big"
                                 src="~img/instructions/instructions_4-1.gif">
                        </div>
                        <div class="description">
                            Each imaginary Aerocene journey is an
                            "air signature" that we can use to advocate
                            the independence from fossil fuels.
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-3"></div>
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
      mainSliderOptions: {
        direction: 'vertical',
        releaseOnEdges: true,
        slidesPerView: 1,
        autoHeight: true,
        height: 639,
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
        height: 594,
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
    journeysSliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-0',
        },
      };
    },
    floatSliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-1',
        },
      };
    },
    afterJourneySliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-2',
        },
      };
    },
    archiveSliderOptions() {
      return {
        ...this.internalSliderOptions,
        pagination: {
          el: '.internal-pagination-3',
        },
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
.instruction-modal {
    .modal-dialog {
        max-width: 1024px;
        // margin-bottom: 0;
        // display: flex;
        // align-items: flex-end;
        // min-height: 0;
        // height: calc(100vh - 1.75rem);
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
    .main-pagination-wrapper {
        font-size: .8em;
        padding-top: 5px;
    }
    .sections {
        color: $gray;
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
    .title {
        flex: 0 0 auto;
        margin: $marginItem 0;
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
