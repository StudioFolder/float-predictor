<template>
    <div :id="slideId" class="f-slide">
        <slot>
        </slot>
    </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
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
