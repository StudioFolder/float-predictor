<template>
    <!-- Modal Component -->
    <b-modal v-model="modalVisible"
             id="dialog-label"
             size="sm"
             hide-footer
             centered
             class="winner-explorer-modal --box"
             title="Your Aerosolar Journey">
        <slot name="image" class="aeroglyph"></slot>
        <slot class="message" name="message"></slot>
        <b-form @submit="onSubmit">
            <div class="name-selector-group">
                <label for="name" class="small">Name</label>
                <b-form-input id="name" type="text" placeholder="Enter your name here">
                </b-form-input>
                <label for="email" class="small">Email</label>
                <b-form-input id="email" type="email" placeholder="example@mail.com">
                </b-form-input>
                <p class="input-label">
                    You can associate your name to the aeroglyph,
                    and leave your e-mail to receive a
                    postcard about your flight.
                </p>
            </div>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>
<script>
export default {
  name: 'modal-winner-explorer',
  data() {
    return {
      modalShow: true,
    };
  },
  computed: {
    animationEnd() {
      return this.$store.state.flightSimulator.visualizationState === 4;
    },
    modalVisible: {
      get() {
        return (this.animationEnd && this.modalShow);
      },
      set(val) {
        this.modalShow = val;
      },
    },
  },
  methods: {
    onSubmit() {
      this.modalShow = false;
    },
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import "~css/_typography.scss";
.winner-explorer-modal {
    font-size: 1rem;
    .modal-header {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .modal-title {
        @extend .h4;
        margin: 0;
    }
    .modal{
        transform: none !important;
    }
    .modal-backdrop.show {
        opacity: 0;
        display: none;
    }
        text-align: center;
    .aeroglyph {
        text-align: center;
    }
    .message {
        font-size: 1rem;
        text-align: center;
    }
    label {
        margin-top: 20px;
    }
    .input-label {
        margin-top: 20px;
        font-size: .8rem;
    }
    form {
        text-align: center;
    }
    .name-selector-group {
        text-align: left;
    }
}
</style>
