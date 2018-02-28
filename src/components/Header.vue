<template>
    <div class="site-header">
        <main-menu />
        <nav-brand ref="navBrand" />
    </div>
</template>
<script>
import mainMenu from 'Parts/MainMenu';
import navBrand from 'Parts/NavBrand';

export default {
  components: {
    mainMenu, navBrand,
  },
};
</script>
