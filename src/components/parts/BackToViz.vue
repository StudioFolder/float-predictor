<template>
    <transition name="fade">
    <div class="back-to-viz" v-show="isVisible">
        <router-link to="/flight-simulator">
            <img src="~img/globe_illustration.svg">
            <div>Go back to visualization</div>
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
.back-to-viz {
    transition: opacity .4s ease;
    position: absolute;
    top: unset;
    bottom: $marginBase;
    left: $marginBase;
    max-width: 150px;
    a {
        text-decoration: none;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    img {
        max-width: 100%;
        padding: 0 40px 10px;
    }
    div {
        text-align: center;
        font-size: .9em;
    }
}
.fade-middle-to-top-enter-active,
.bottom-to-top-enter-active {
    .back-to-viz{
        opacity: 0;
    }
}
body.gallery .back-to-viz {
    top: calc(#{$marginBase} + 50vh);
    bottom: unset;
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
