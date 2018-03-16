<template>
    <div class="f-slider instructions-slider" id="instructions-slider">
        <f-slides-wrapper />
        <f-slides-nav />
    </div>
</template>

<script>
import fSlidesWrapper from 'Components/slider/FSlidesWrapper';
import fSlidesNav from 'Components/slider/FSlidesNav';

export default {
  name: 'f-slider',
  components: { fSlidesWrapper, fSlidesNav },
};
</script>

<style lang="scss">
.f-slider.instructions-slider {
    position: relative;
    display: flex;
    max-width: 100%;
    flex-flow: row wrap;
    .f-slider-wrapper {
        flex: 1 1 auto;
    }
    .f-slider-nav {
        flex: 0 0 auto;
    }
}
</style>
