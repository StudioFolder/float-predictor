<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" centered hide-footer size="lg" title="Instructions">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="instructions-sections">
            Sections
            <span @click="changeSlide(0)">1</span>
            <span @click="changeSlide(3)">2</span>
            <span @click="changeSlide(5)">3</span>
            <span @click="changeSlide(7)">4</span>
        </div>
        <b-carousel id="instructions-carousel"
                    style="text-shadow: 1px 1px 2px #333;"
                    controls
                    indicators
                    :interval=interval
                    background="#E1E1E1"
                    img-width="1024"
                    img-height="480"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
        >

            <!-- Text slides with image -->
            <b-carousel-slide caption="First slide"
                              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                              img-src="https://lorempixel.com/1024/480/technics/2/"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/4/">
                <h1>Hello world!</h1>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
            </b-carousel-slide>
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
            </b-carousel-slide>
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
            </b-carousel-slide>
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
            </b-carousel-slide>
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
            </b-carousel-slide>
            <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
            </b-carousel-slide>

            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid
             to prevent browser default image alignment -->
            <b-carousel-slide>
                <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                     src="https://lorempixel.com/1024/480/technics/5/" alt="image slot">
            </b-carousel-slide>

            <!-- Slide with blank fluid image to maintain slide aspect ratio -->
            <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
                    ut lacus vel interdum.
                </p>
            </b-carousel-slide>
        </b-carousel>
        <p class="mt-4">
            Slide #: {{ slide }}<br>
        </p>
    </b-modal>
</template>

<script>
export default {
  name: 'instruction-modal',
  data() {
    return {
      slide: 0,
      sliding: null,
      interval: 0,
    };
  },
  methods: {
    onSlideStart() { // optional slide argument
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    changeSlide(val) {
      this.slide = val;
    },
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
        background-image: url("");
    }
</style>
