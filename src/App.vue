<template>
  <div id="app" class="main-application">
    <navigation/>
    <div class="main-content">
      <router-view/>
    </div>
    <dashboard />
  </div>
</template>

<script>

import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

export default {
  components: {
    Dashboard,
    Navigation },
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
