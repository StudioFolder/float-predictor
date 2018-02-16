<template>
    <!-- Modal Component -->
    <b-modal v-model="modalShow"
             id="dialog-label"
             size="sm"
             hide-footer
             centered
             class="winner-explorer-modal"
             title="Your Aerosolar Journey">
        <slot name="image"></slot>
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
    .modal-title {
        @extend .h4;
        margin: 0;
    }
    .modal-dialog {
        max-width: 350px;
    }
    .modal{
        transform: none !important;
    }
    #imgel {
        background: transparent !important;
        text-align: center;
        svg {
            rect {
                fill: $lightBlack;
            }
            circle {
                fill: $lightBlack;
                stroke: $lightBlack;
            }
            polyline {
                stroke: #4A90E2 !important;
            }
        }
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
