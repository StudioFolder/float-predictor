<template>
    <div class="main-content" :style="{height: upperHeight}">
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
            </div>
        </article>
    </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      upperHeight: 0,
    };
  },
  mounted() {
    this.upperHeight = `${this.$refs.aboutContent.clientHeight}px`;
  },
};
</script>
<style lang="scss">
    @import '~css/_variables_and_mixins.scss';
</style>
