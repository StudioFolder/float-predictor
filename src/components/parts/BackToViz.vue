<template>
    <transition name="fade">
    <div class="back-to-viz" v-show="isVisible">
        <router-link to="/flight-simulator">
            <img src="~img/globe_illustration.svg">
            <div>Go back to <span>visualization</span></div>
            <i class="fp fp-caret-down"></i>
        </router-link>
    </div>
    </transition>
</template>
<script>
export default {
  name: 'back-to-viz',
  computed: {
    isVisible() {
      return (this.$route.name === 'about' || this.$route.name === 'aerocene-explorer' || this.$route.name === 'gallery');
    },
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
$borderWidth: calc((100vw - 36rem)/2); // 36rem is the article max width
.back-to-viz {
    transition: opacity .4s ease;
    position: absolute;
    top: unset;
    bottom: $marginBase;
    left: calc(#{$borderWidth}*-0.5 - 120px/2); // to center the object on various screen
    width: 120px;
    @include large_down {
        box-shadow: 0 0 30px 1px rgba(0,0,0,.5);
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 200%);
        z-index: 9;
        background-color: $lightGray;
        width: 150px;
        padding: $marginItem $marginItem*2;
    }
    a {
        text-decoration: none;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    img {
        max-width: 100%;
        padding: 0 25px 10px;
        @include large_down {
            display: none;
        }
    }
    div {
        text-align: center;
        font-size: .9em;
    }
    i {
        @include large_down {
            display: none;
        }
    }
}
.fade-middle-to-top-enter-active,
.bottom-to-top-enter-active {
    .back-to-viz{
        opacity: 0;
    }
}

body.gallery .back-to-viz {
    position: fixed;
    top: calc(#{$marginBase} + 50vh);
    left: calc(12rem*0.5 - 120px/2); // to center the object on various screen
    bottom: unset;
    @include up(1440px) {
        left: calc(calc((100vw - 1100px)/2)*0.5 - 120px/2);;
    }
    @include down($large) {
        // left: calc(6rem*0.5 - 120px/2); // to center the object on various screen
    }
    @include down($large) {
        position: absolute;
        background-color: $lightBlack;
        top: 0;
        left: 50%;
        transform: translate(-50%, 200%);
        z-index: 9;
    }
    i {
        order: 1;
        transform: rotate(180deg);
    }
    img {
        order: 2;
    }
    div {
        order: 3;
    }
}
</style>
