<template>
    <div id="app" class="main-application">
        <nav-brand/>
        <div class="router-view">
            <router-view/>
        </div>
        <main-menu />
        <visualization />
    </div>
</template>

<script>

import navBrand from './components/NavBrand';
import mainMenu from './components/MainMenu';
import visualization from './components/Visualization';

export default {
  components: {
    visualization,
    mainMenu,
    navBrand },
  name: 'App',
};
</script>

<style lang="scss">
  @import "assets/css/main";

  .main-application {
    position: relative;
    @include medium_up {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  }
  .main-content {
    width: 100%;
    height: 100%;
  }
</style>
