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
            on <strong>{{depDate}}</strong>
            arrived within <strong>{{winningExplorerData.minDist}}km</strong>
            from <strong>{{destination.city}}</strong> in
            <strong>{{winningExplorerData.minTime}} days.</strong>
        </div>
        <!-- Begin MailChimp Signup Form -->
        <div id="mc_embed_signup">
            <form @submit="onSubmit"
                  class="flight-form"
                  action="https://aerocene.us12.list-manage.com/subscribe/post?u=8adb5d542fb2a0cf0dac11583&amp;id=d753b7b620"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_blank"
                  novalidate>
                <div id="mc_embed_signup_scroll" class="selector-group-wrapper">
                    <div class="name-selector-group selector-group">
                        <div class="mc-field-group">
                            <b-form-input
                                    type="text"
                                    placeholder="Enter your name here"
                                    name="FNAME"
                                    class=""
                                    id="mce-FNAME">
                            </b-form-input>
                        </div>
                        <div class="mc-field-group">
                            <b-form-input
                                    type="email"
                                    placeholder="example@mail.com"
                                    name="EMAIL"
                                    class="required email"
                                    id="mce-EMAIL">
                            </b-form-input>
                        </div>
                    </div>
                    <div id="mce-responses" class="clear">
                        <div class="response" id="mce-error-response" style="display:none"></div>
                        <div class="response" id="mce-success-response" style="display:none"></div>
                    </div>
                    <!-- real people should not fill this in and expect good things
                    - do not remove this or risk form bot signups-->
                    <div style="position: absolute; left: -5000px;" aria-hidden="true">
                        <input type="text"
                               name="b_8adb5d542fb2a0cf0dac11583_d753b7b620"
                               tabindex="-1"
                               value="">
                    </div>
                    <p class="input-label">
                        Enter your name and email to receive a postcard about your journey
                        and get updates on Aerocene.
                    </p>
                    <b-button type="submit"
                              variant="primary"
                              value="Subscribe"
                              name="subscribe"
                              id="mc-embedded-subscribe"
                              class="button">Submit</b-button>
                </div>
            </form>
        </div>
        <!--End mc_embed_signup-->
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
      set(val) {
        this.modalShow = val;
      },
      get() {
        return (this.animationEnd && this.modalShow);
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
    z-index: 19;
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
        color: rgba(255,255,255,.8);
        strong {
            color: #FFF;
        }
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
    @media screen and (max-height: 800px) {
        .modal-header {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        .modal-body {
            padding-top: .1rem;
        }
        .bottom-links {
            margin-top: 1.5rem;
        }
    }
}
</style>
