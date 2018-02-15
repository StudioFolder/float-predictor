<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" class="instruction-modal"
             centered hide-footer size="lg" title="Instructions">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="instructions-sections">
            <div class="section-title">{{sectionTitle}}</div>
            <span class="main-pagination"></span>
        </div>
        <swiper :options="mainSliderOptions" ref="mainSlider">
            <div v-show="navIcon === 'scroll'" class="nav-icon --scroll">
                <i class="fp-scroll"></i></div>
            <div v-show="navIcon === 'down'" class="nav-icon --down" @click="goToNextSection">
                <small>Go to section {{activeIndex + 2}}</small>
                <i class="fp-next-down"></i></div>
            <!-- slides -->
            <swiper-slide>
                <swiper :options="journeysSliderOptions"
                        ref="journeysSlider"
                        class="internal-slider">
                    <swiper-slide>
                        <h4 class="title">Aerocene Sculptures</h4>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-1.gif">
                        </div>
                        <div class="description">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Integer vulputate ex mauris,
                            in egestas turpis condimentum eu.
                            Proin rutrum massa sit amet semper viverra.
                            Donec sed velit ac dui vehicula vehicula
                            quis vel felis. Donec nec nulla arcu.
                            In enim ipsum, sagittis quis massa non,
                            pretium consequat nibh.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h4 class="title">How Aerocene Sculptures Float</h4>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-2.gif">
                        </div>
                        <div class="description">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Integer vulputate ex mauris,
                            in egestas turpis condimentum eu.
                            Proin rutrum massa sit amet semper viverra.
                            Donec sed velit ac dui vehicula vehicula
                            quis vel felis. Donec nec nulla arcu.
                            In enim ipsum, sagittis quis massa non,
                            pretium consequat nibh.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h4 class="title">Float Predictor</h4>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-3.gif">
                        </div>
                        <div class="description">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Integer vulputate ex mauris,
                            in egestas turpis condimentum eu.
                            Proin rutrum massa sit amet semper viverra.
                            Donec sed velit ac dui vehicula vehicula
                            quis vel felis. Donec nec nulla arcu.
                            In enim ipsum, sagittis quis massa non,
                            pretium consequat nibh.
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
                        <div class="animation-wrapper">
                            <h4 class="title">Planned float or Free float</h4>
                            <div class="animation-wrapper">
                                <img class="animation"
                                     src="~img/instructions/instructions_2-1a.gif">
                                <img class="animation"
                                     src="~img/instructions/instructions_2-1b.gif">
                            </div>
                            <div class="description">
                                Planned Flights try to reach a specific destination
                                starting from a selected departure point.
                                Free Flights start from a selected departure
                                point to float free with winds.
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h4 class="title">Departure and Destination</h4>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-2.gif">
                        </div>
                        <div class="description">
                            You can choose departure and destination points
                            (the latter only for Planned floats) of your flight.
                            Just click on an entry field in the form and begin
                            typing any city in the world! Alternatively, you
                            can click directly on the globe to choose
                            departure and destination points.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h4 class="title">Float Interface</h4>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-3.gif">
                        </div>
                        <div class="description">
                            When your journey has started, a float interface
                            will appear allowing you to interact with the
                            visualisation, with actions such as: Take a screenshot;
                            Turn on/off winds; Play/Pause the flight;
                            Go on board one Explorer.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h4 class="title">Controlling the Globe</h4>
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
                        <h4 class="title">Lorem Ipsum</h4>
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
                        <h4 class="title">Lorem Ipsum</h4>
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
                        <div class="animation-wrapper">
                            <h4 class="title">Lorem Ipsum</h4>
                            <div class="animation-wrapper">
                                <img class="animation"
                                     src="~img/instructions/instructions_3-1.gif">
                            </div>
                            <div class="description">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Integer vulputate ex mauris,
                                in egestas turpis condimentum eu.
                                Proin rutrum massa sit amet semper viverra.
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="animation-wrapper">
                            <h4 class="title">Aeroglyphs</h4>
                            <img class="animation"
                                 src="~img/instructions/instructions_3-2.gif">
                            <div class="description">
                                Aeroglyphs are graphical depiction of how Aerocene
                                sculptures float around the globe. They created in
                                a vector polar projection that can be downloaded
                                and manipulated. All selected floats in the Float
                                Predictor are automatically stored into the
                                Aeroglyphs Archive, a gallery of all the journeys
                                around the world.
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="animation-wrapper">
                            <h4 class="title">Lorem Ipsum</h4>
                            <div class="animation-wrapper">
                                <img class="animation"
                                     src="~img/instructions/instructions_3-3.gif">
                            </div>
                            <div class="description">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Integer vulputate ex mauris,
                                in egestas turpis condimentum eu.
                                Proin rutrum massa sit amet semper viverra.
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="animation-wrapper">
                            <h4 class="title">Lorem Ipsum</h4>
                            <div class="animation-wrapper">
                                <img class="animation"
                                     src="~img/instructions/instructions_3-4.gif">
                            </div>
                            <div class="description">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Integer vulputate ex mauris,
                                in egestas turpis condimentum eu.
                                Proin rutrum massa sit amet semper viverra.
                            </div>
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
                        <div class="animation-wrapper">
                            <h4 class="title">Lorem Ipsum</h4>
                            <div class="animation-wrapper">
                                <img class="animation"
                                     src="~img/instructions/instructions_4-1.gif">
                            </div>
                            <div class="description">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Integer vulputate ex mauris,
                                in egestas turpis condimentum eu.
                                Proin rutrum massa sit amet semper viverra.
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination-3"></div>
            </swiper-slide>
        </swiper>
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
        height: 600,
        releaseOnEdges: true,
        mousewheel: true,
        slidesPerView: 1,
        autoHeight: true,
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
.instruction-modal {
    .modal-dialog {
        max-width: 1024px;
        margin-bottom: 0;
        margin-top: 20vh;
        height: 80vh;
        overflow: hidden;
        min-height: unset;
    }
    .modal-content {
        height: 100%;
    }
}
.instructions-sections {
    display: flex;
    justify-content: space-around;
    .section-title {
        width: 50%;
        text-align: left;
    }
    .main-pagination {
        width: 50%;
        text-align: right;
    }
}
.internal-slider .swiper-slide {
    display: flex;
    flex-flow: column;
    .title {
        flex: 0 0 auto;
    }
    .animation-wrapper {
        text-align: center;
        flex: 1 1 auto;
        height: 400px;
        .animation {
            max-height: 100%;
        }
    }
    .description {
        flex: 0 0 auto;
        padding: .5em 3em;
        overflow: hidden;
        max-width: 42em;
    }
}
.nav-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 9;
    transform: translateX(-50%);
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
    right: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
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
