<template>
    <div id="app" class="main-application">
        <site-header />
        <transition appear name="fade" mode="out-in">
            <info-box v-if="isInfoBoxOpen"/>
        </transition>
        <transition appear name="fade" mode="out-in">
            <router-view/>
        </transition>
        <footer>
            <div class="font-small">
                Aerocene is an open artistic project by <a href="http://tomassaraceno.com/">Studio Tomás Saraceno</a>.
                Design and code by <a href="http://www.studiofolder.it/">Studio Folder</a> and Angelo Semeraro
            </div>
        </footer>
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
.visualization-client {
    flex: 1 1 100%;
}
.home-content, .simulator-content {
    height: 100%;
}
footer {
    padding: 0 $marginMobile;
    text-align: center;
}
</style>
