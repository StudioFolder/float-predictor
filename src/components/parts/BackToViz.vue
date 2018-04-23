<template>
    <transition name="fade">
    <div class="back-to-viz"
         @click="disappear"
         :class="classes"
         v-show="isVisible">
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
    classes() {
      return (this.$route.name === 'gallery') ? 'bottom' : 'top';
    },
    isVisible() {
      return (this.$route.name === 'about' || this.$route.name === 'aerocene-explorer' || this.$route.name === 'gallery' || this.$route.name === 'resources-and-api');
    },
  },
  methods: {
    disappear(){

    }
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
$borderWidth: calc((100vw - 36rem)/2); // 36rem is the article max width
.back-to-viz {
    transition: opacity .4s ease;
    top: unset;
    bottom: $marginBase;
    @include medium_up {
        height: 0;
        position: sticky;
        > a {
            position: absolute;
            bottom: 0;
            width: 120px;
            left: calc(#{$borderWidth}*-0.5 - 120px/2); // to center the object on various screen
            padding-bottom: 8px;
        }
    }
    @include medium_down {
        position: absolute;
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
.bottom-to-top-enter-active,
.bottom-to-middle-leaving {
    .back-to-viz{
        opacity: 0;
    }
}
.back-to-viz.bottom {
    top: calc(100px + 50%);
    left: calc(12rem*0.5 - 120px/2); // to center the object on various screen
    bottom: unset;
    @include up(1440px) {
        left: calc(calc((100vw - 1100px)/2)*0.5 - 120px/2);;
    }
    @include medium_up {
        position: fixed;
        width: 120px;
        left: calc(#{$borderWidth}*0.5 - 120px/2); // to center the object on various screen
        z-index: 9;
        > a {
            position: relative;
            bottom: unset;
            width: unset;
            left: unset;
            padding-bottom: unset;
        }
    }
    @include medium_down {
        position: absolute;
        top: $marginBase;
        left: 50%;
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
