<template>
    <div id="app" class="main-application">
        <site-header />
        <transition appear name="fade" mode="out-in">
            <info-box v-if="isInfoBoxOpen"/>
        </transition>
        <transition appear name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import siteHeader from 'Components/Header';
import infoBox from 'Parts/InfoBox';

export default {
  name: 'App',
  components: { siteHeader, infoBox },
  computed: {
    isInfoBoxOpen() {
      return this.$store.state.general.isInfoBoxOpen;
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/main";
html, body {
    height: 100%;
}
.main-application {
    display: flex;
    flex-flow: column;
    height: 100%;
}
.visualization-client, .home-content, .simulator-content {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column;
}
</style>
