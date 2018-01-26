<template>

    <div class="call_to_action">
      <router-link to="/flight-simulator">Start a new aerosolar journey</router-link>
    </div>

</template>

<script>
export default {
  name: 'HomePage',
};
</script>
<style lang="scss">
  .call_to_action {
    display: block;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 200px;
    text-align: center;

    a {
      text-decoration: none;
    }
  }
</style>
