<template>
    <!-- Modal Component -->
    <b-modal v-model="modalVisible"
             id="dialog-label"
             size="sm"
             hide-footer
             centered
             class="winner-explorer-modal --box"
             title="Your Aerosolar Journey">
        <i slot="modal-header-close" class="fp fp-close-w"></i>
        <div class="aeroglyph" v-html="winningExplorerData.svg"></div>
        <div class="message">
            The Aerocene Sculpture that left from <b>{{departure.city}}</b>
            on <b>{{depDate}}</b>
            arrived within <b>{{winningExplorerData.minDist}}km</b>
            from <b>{{destination.city}}</b> in <b>{{winningExplorerData.minTime}} days.</b>
        </div>
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
        <ul class="bottom-links">
            <li class="share">
                <small>Share</small>
                <ul class="list-group horiziontal share-items">
                    <li class="menu-item --socialShare"><i class="fp fp-facebook"></i></li>
                    <li class="menu-item --socialShare"><i class="fp fp-twitter"></i></li>
                    <li class="menu-item --socialShare"><i class="fp fp-mail"></i></li>
                    <li class="menu-item --socialShare"><i class="fp fp-google"></i></li>
                </ul>
            </li>
            <li class="separator"></li>
            <li class="download">
                <small>Download</small>
                <ul>
                    <li class="menu-item --socialShare"><i class="fp fp-download"></i></li>
                </ul>
            </li>
        </ul>
    </b-modal>
</template>
<script>
import moment from 'moment';

export default {
  name: 'modal-winner-explorer',
  data() {
    return {
      modalShow: true,
    };
  },
  computed: {
    winningExplorerData() {
      return this.$store.state.flightSimulator.winningExplorerData;
    },
    depDate() {
      return moment(this.winningExplorerData.departureDate).format('MMM Do, YYYY');
    },
    departure() {
      return this.$store.state.flightSimulator.departure;
    },
    destination() {
      return this.$store.state.flightSimulator.destination;
    },
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
    .modal-title {
        @extend .h4;
        margin: 0;
    }
    .modal{
        transform: none !important;
    }
    .aeroglyph {
        text-align: center;
    }
    .message {
        @extend %colfax_base;
        font-size: 1rem;
        text-align: center;
        margin-bottom: 1rem;
    }
    .input-label {
        margin-top: 20px;
        font-size: .8rem;
        color: $gray;
    }
    form {
        text-align: center;
        .name-selector-group {
            text-align: left;
            margin-bottom: 1rem;
            label {
                margin-bottom: .2em;
            }
        }
    }
    .bottom-links {
        margin-top: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        color: $lightGray;
        .share {
            flex: 0 1 50%;
        }
        .download {
            flex: 0 1 20%;
            text-align: center;
            ul li{
                margin: 0 auto;
            }
        }
        ul { margin-top: .5em}
        >li {
            text-align: left
        }
        .separator {
            flex: 0 1 1px;
            height: 24px;
            background-color: $lightGray;
            margin-bottom: 5px;
        }
    }
}
</style>
