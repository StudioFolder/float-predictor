<template>
    <div class="info-box">
        <div class="sculpture-gif">
            <img src="~img/instructions/instructions_1-1.gif">
        </div>
        <div class="column-text">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam delectus fugiat fugit ipsum libero molestiae nemo nobis,
                nulla officiis optio perferendis quam ratione totam!
                Esse molestias odio porro qui ut!
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam delectus fugiat fugit ipsum libero molestiae nemo nobis,
                nulla officiis optio perferendis quam ratione totam!
                Esse molestias odio porro qui ut!
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'info-box',
};
</script>

<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .info-box {
        position: absolute;
        z-index: 18; // header 20
        height: 100vh;
        width: 100%;
        padding: 134px $marginMobile $marginMobile;
        background-color: $bodyColor;
        overflow: hidden;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        > div {
            position: relative;
            flex: 1 1 auto;
            display: flex;
            align-items: center;
        }
        .sculpture-gif {
            text-align: center;
            img {
                margin: 0 auto;
                max-height: 300px;
                max-width: 100%;
            }
        }
        .column-text {
            > p {
                flex: 1 1 50%;
                margin: 0;
            }
        }
    }
</style>
