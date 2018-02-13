<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" class="instruction-modal"
             centered hide-footer size="lg" title="Instructions">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="instructions-sections">
        </div>
        <!--main slider -->
        <div class="swiper-container main-slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <!--inner slider section 1-->
                    <div class="swiper-container inner-slider">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <video autoplay>
                                    <source src="/static/video/instructions_1-2.mp4"
                                            type="video/mp4">
                                </video>
                            </div>
                            <div class="swiper-slide">
                                <video autoplay>
                                    <source src="/static/video/instructions_1-3.mp4"
                                            type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <!--inner slider section 2-->
                    <div class="swiper-container inner-slider">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <video autoplay>
                                    <source src="/static/video/instructions_2-1a.mp4"
                                            type="video/mp4">
                                </video>
                            </div>
                            <div class="swiper-slide">
                                <video autoplay>
                                    <source src="/static/video/instructions_2-1b.mp4"
                                            type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- If we need scrollbar -->
            <div class="swiper-scrollbar"></div>
        </div>
        <p class="mt-4">
            Slide #: {{ slide }}<br>
        </p>
    </b-modal>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  name: 'instruction-modal',
  components: {},
  data() {
    return {
      slide: 0,
      sliding: null,
      interval: 0,
    };
  },
  methods: {
  },
  mounted() {
    // eslint-disable-next-line
    const mainSlider = new Swiper('.swiper-container.main-slider', {
      // Optional parameters
      direction: 'vertical',
      loop: false,
      mousewheel: false,
      slidesPerView: 1,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // eslint-disable-next-line
    const innerSlider = new Swiper('.swiper-container.inner-slider', {
      // Optional parameters
      direction: 'vertical',
      loop: false,
      mousewheel: true,
      slidesPerView: 1,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
    .instructions-sections {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        margin: 0 0 1em auto;
        span {
            width: 10px;
            margin-left: 20px;
            text-align: center;
            cursor: pointer;
        }
    }
    .carousel-control-next-icon {
    }
    .instruction-modal {
        position: relative;
        width:100%;
        height: 100%;
        .modal-dialog {
            margin-top: $marginBase;
            margin-bottom: 0;
        }
    }
    .swiper-container.main-slider {
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-container.main-slider {
        width: 600px;
        height: 350px;
    }
    .swiper-slide {
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        video {
            width: 100%;
        }
    }
</style>
