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
            <!-- slides -->
            <swiper-slide>
                <swiper :options="internalSliderOptions" ref="journeysSlider">
                    <swiper-slide class="internal-slide">
                        <h4 class="title">Aerocene Sculptures</h4>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-2.gif">
                        </div>
                        <div class="description">
                            The Aerocene Explorer is your personal tool for solar-powered
                            atmospheric exploration: a tethered-flight starter kit offering
                            a new way to sense the environment.
                            Enclosed in a portable backpack is everything you
                            need to float an Explorer sculpture and start exploring the skies.
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_1-3.gif">
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="internal-pagination"></div>
            </swiper-slide>
            <swiper-slide>
                <swiper :options="internalSliderOptions" ref="floatSlider">
                    <swiper-slide>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-3.gif">
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="animation-wrapper">
                            <img class="animation"
                                 src="~img/instructions/instructions_2-5.gif">
                        </div>
                    </swiper-slide>
                </swiper>
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
    };
  },
  computed: {
    sectionTitle() {
      let title = '';
      switch (this.activeIndex) {
        case 0:
          title = '1—Aerosolar Journeys';
          break;
        case 1:
          title = '2—How to Float';
          break;
        default:
          title = '';
      }
      return title;
    },
    mainSliderOptions() {
      return {
        direction: 'vertical',
        mousewheel: false,
        slidesPerView: 1,
        autoHeight: true,
        height: 639,
        pagination: {
          el: '.main-pagination',
          type: 'fraction',
          renderFraction: currentClass => `<span class="${currentClass}"></span>`,
        },
      };
    },
    internalSliderOptions() {
      return {
        direction: 'vertical',
        mousewheel: true,
        slidesPerView: 1,
        autoHeight: true,
        height: 600,
        pagination: {
          el: '.internal-pagination',
        },
      };
    },
  },
  mounted() {
    this.$watch(
      () => this.$refs.mainSlider.swiper.activeIndex,
      (newVal) => {
        this.activeIndex = newVal;
      },
    );
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
.internal-slide {
    display: flex;
    flex-flow: column;
    .title {
        height: 8%;
        display: flex;
        align-items: center;
        margin: 0;
    }
    .animation-wrapper {
        text-align: center;
        height: 80%;
        .animation {
            max-height: 100%;
        }
    }
    .description {
        height: 12%;
        align-items: center;
    }
}
.internal-pagination {
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
