<template>
  <div id="app" class="main-application">
    <navigation/>
    <router-view/>
  </div>
</template>

<script>

import Navigation from './components/Navigation';

export default {
  components: { Navigation },
  name: 'App',
};
</script>

<style lang="scss">
  @import "assets/css/main";
</style>
