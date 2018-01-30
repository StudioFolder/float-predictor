<template>
    <nav class="nav-brand">
        <router-link to="/" class="logo">
            <img src="../assets/img/aerocene_logo.svg">
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
    @import "~@/assets/css/_variables_and_mixins.scss";
    .nav-brand {
        color: #fff;
        display: block;
        position: absolute;
        top: 0;
        padding: 1em;
        z-index: 20;
    }
    .intro-description {
        max-width: 230px;
    }
    .logo {
        text-transform: uppercase;
        text-decoration: none;
    }
    .read-more {
        display: block;
        margin-top: 1em;
    }
</style>
