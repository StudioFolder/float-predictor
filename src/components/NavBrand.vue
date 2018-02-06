<template>
    <nav class="nav-brand">
        <router-link to="/" class="logo">
            <div class="title">Aerocene</div><div class="subtitle">Float Predictor</div>
        </router-link>
        <p class="intro-description">Travel around the earth lifted only by the sun,
            carried only by the wind,
            towards a clean and sustainable future.
        </p>
        <div><router-link to="/about" class="read-more">read more</router-link></div>
    </nav>
</template>
<script>
export default {
  name: 'navigation',
};
</script>
<style lang="scss">
    @import "~css/_variables_and_mixins.scss";
    .nav-brand {
        color: #fff;
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        padding: $marginBase;
        z-index: 20;
        transition: all 1s;
    }
    .intro-description {
        max-width: 230px;
    }
    .logo {
        @extend %colfax_med;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem; // 24px
        .title { margin-bottom: .5rem;
        }
        .subtitle {
            margin-bottom: 2.625rem; // 42px
            color: $gray;
        }
    }
    .read-more {
        display: block;
        margin-top: 1.5rem;
    }
    body.home .read-more {
        display: none;
    }
</style>
