<template>
    <div class="visualization-client">
        <StateRemoteSync/>
        <div class="home-content">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                At blanditiis culpa ducimus enim id laudantium natus,
                numquam officia possimus quis repudiandae suscipit
                veritatis vero. Aliquid ipsa itaque nostrum quos rerum.
            </p>
            <div class="call-to-action">
                <router-link to="/client/flight-simulator" class="button --opaque">
                    Start a new<br>aerosolar journey
                </router-link>
            </div>
            <div class="globe-gif">
                <img src="~img/globe_gif_02.gif">
            </div>
        </div>
    </div>
</template>
<script>
import StateRemoteSync from 'Components/StateRemoteSync';

export default {
  name: 'VisualizationClient',
  components: {
    StateRemoteSync,
  },
  computed: {
    isChoosing() { return (this.$store.state.general.isChoosingDestination); },
  },
  created() {
    // eslint-disable-next-line
    setTimeout(()=>{
      this.$store.commit('flightSimulator/setVisualizationState', 0);
      this.$store.commit('general/setFormStatus', true);
    }, 100);
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
.home-content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    text-align: center;
    padding: 0 $marginMobile;
    > * {
        position: relative;
        text-align: center;
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p {
        max-width: 35em;
        margin: 0 auto;
    }
    .call-to-action {
        flex: 0 0 100%;
        .button {
            display: inline-block;
            background-color: $lightBlack;
            padding: $marginItem $marginItem+2;
            text-transform: uppercase;
            color: #FFF;
        }
    }
    .globe-gif img{
        max-height: 160px;
    }
}
</style>
