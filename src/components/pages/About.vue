<template>
    <div class="main-content">
        <article role="article" class="article" ref="aboutContent">
            <h1 class="entry-title">About</h1>
            <h3 class="entry-subtitle">
                Pellentesque dictum aliquam pulvinar. Suspendisse potenti.
                In condimentum ut ipsum ut mollis. Nulla ut neque tortor.
                Vivamus a purus quis quam fringilla volutpat.
            </h3>
            <div class="entry-body">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque efficitur justo quis augue pulvinar viverra.
                    Aliquam sit amet sodales orci. Nunc tristique diam
                    quis ex venenatis consectetur.
                    Sed imperdiet est iaculis ex dictum malesuada. Quisque et ipsum scelerisque,
                    condimentum diam non, tempus felis.
                    Ut sagittis justo a mauris mattis mollis. Donec sed lectus
                    et lorem sagittis convallis et vitae turpis.
                    Quisque dignissim id dui ac porttitor.
                    Fusce rutrum viverra ipsum, sed commodo felis elementum id. Pellentesque
                    ac condimentum orci. Quisque porta iaculis rutrum. Maecenas vel erat
                    facilisis, rhoncus quam id, consectetur odio. Phasellus et suscipit
                    erat, in bibendum dolor. In hac habitasse platea dictumst. Donec ipsum
                    risus, faucibus id nunc at, rutrum tempus augue. Aliquam erat volutpat.
                </p>
                <p>
                    Pellentesque lacus nisl, interdum sed vehicula cursus, scelerisque et ligula.
                    Vestibulum vitae lacinia est. Praesent molestie elit sed nisl aliquet consequat.
                    Aliquam interdum neque vitae purus venenatis gravida. Aenean vel neque dolor.
                    Proin gravida, magna et auctor congue, erat sem rutrum felis, sit amet ultrices
                    arcu est in ipsum. Proin efficitur, ligula sed tristique vehicula, velit mauris
                    euismod purus, vel cursus enim risus vitae massa. Donec sit amet arcu non lectus
                    elementum pretium. Praesent non nulla congue,
                    tristique urna vitae, ornare lectus.
                    Pellentesque maximus, quam nec pellentesque rutrum, ex nisl fringilla dui, id
                    tincidunt justo velit ac leo. Maecenas accumsan auctor luctus.
                </p>
                <p>
                    Pellentesque dictum aliquam pulvinar. Suspendisse potenti.
                    In condimentum ut ipsum ut mollis. Nulla ut neque tortor.
                    Vivamus a purus quis quam fringilla volutpat. Donec vehicula
                    sed mauris a ultrices. Curabitur maximus velit at tristique
                    faucibus. Donec interdum laoreet mauris quis blandit.
                </p>
            </div>
        </article>
    </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit('general/setUpperHeight', this.$refs.aboutContent.clientHeight);
    });
  },
};
</script>
<style lang="scss">
    @import '~css/_variables_and_mixins.scss';
</style>
