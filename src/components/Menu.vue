<template>
    <nav class="main-navigation">
        <router-link to="/" class="logo">
            <img src="assets/aerocene_logo.svg">
        </router-link>
        <p class="intro-description">Travel around the earth lifted only by the sun,
            carried only by the wind,
            towards a clean and sustainable future.
        </p>
        <div><router-link to="/about">read more</router-link></div>
    </nav>
</template>
<script>
export default {
  name: 'navigation',
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .main-navigation {
        color: #fff;
    }
    .intro-description {
        max-width: 230px;
    }
    .logo {
        text-transform: uppercase;
        text-decoration: none;
    }
</style>
