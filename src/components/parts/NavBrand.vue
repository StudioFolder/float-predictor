<template>
    <nav class="nav-brand">
        <div class="logo">
            <div class="title">Aerocene</div><div class="subtitle">Float Predictor</div>
        </div>
        <transition name="fade">
        <p class="intro-description"
           v-if="isDescriptionActive">
            Travel around the earth lifted only by the sun,
            carried only by the wind,
            towards a clean and sustainable future.
        </p>
        </transition>
        <transition name="fade">
        <div v-if="isDescriptionActive">
            <router-link to="/about" class="read-more">read more</router-link>
        </div>
        </transition>
    </nav>
</template>
<script>
export default {
  name: 'navigation',
  computed: {
    isDescriptionActive() {
      return (this.$store.state.general.isChoosingDestination &&
        (this.$route.name === 'flight-simulator' || this.$route.name === 'home-page'));
    },
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import"~css/_typography.scss";
.nav-brand {
    color: #fff;
    display: block;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    padding: $marginBase;
    transition: opacity .2s ease;
    @include medium_down {
        padding-top: 1rem;
    }

    &.--pages {
        opacity: 1;
        .intro-description {
            max-width: 230px;
        }
        .read-more {
            display: block;
        }
    }
    &.--home {
        opacity: 1;
        text-align: center;
        top: 10%;
        @include medium_up {
            left: 50%;
            transform: translateX(-50%);
        }
        .intro-description {
            @extend .h4;
            @include medium_up {
                max-width: 400px;
            }
            @include medium_down {
                text-align: left;
                font-size: 1em;
                line-height: 1.45;
            }
        }
    }
}
.logo {
    @extend %colfax_bold;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1.5rem; // 24px
    .title {
    }
    .subtitle {
        @include medium-up{
            margin-bottom: 2.625rem; // 42px
        }
        color: $gray;
    }
    @include medium_down {
        position: fixed;
        top: $marginBase;
        left: $marginBase;
        text-align: left;
        transform: translateY(-25%);
        font-size: 1rem;
    }
}
.read-more {
    margin-top: 1.5rem;
    display: none;
}
</style>
