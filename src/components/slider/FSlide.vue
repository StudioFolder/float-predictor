<template>
    <div :id="slideId" class="f-slide">
        <slot>
        </slot>
    </div>
</template>

<script>
export default {
  name: 'f-slide',
  props: ['id'],
  computed: {
    slideId() {
      return `slide${this.id}`;
    },
  },
};
</script>
