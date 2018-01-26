<template>
    <div class="main-dashboard">
        <div class="menu">
            <b-nav vertical class="w-25">
                <b-nav-item class="--rounded --black"><i class="fp fp-menu"></i></b-nav-item>
                <b-nav-item class="--rounded"><i class="fp fp-info"></i></b-nav-item>
            </b-nav>
        </div>
    </div>
</template>
<script>
export default {
  name: 'dashboard',
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .main-dashboard {
        position: absolute;
        top: 1em;
        right: 1em;
    }
    .nav-item {
        margin-bottom: 1em;
        &.--rounded {
            background-color: $lightGray;
            width: 2em;
            height: 2em;
            line-height: 2em;
            border-radius: 50%;
            i {
                margin: 0 auto;
                height: 100%;
            }
        }
        &.--black {
            background-color: transparent;
        }
    }
</style>
