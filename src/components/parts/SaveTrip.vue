<template>
    <!-- Begin MailChimp Signup Form -->
    <div id="mc_embed_signup">
        <form
                class="flight-form"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                novalidate>
            <div id="mc_embed_signup_scroll" class="selector-group-wrapper">
                <div class="name-selector-group selector-group">
                    <div class="mc-field-group">
                        <b-form-input
                                v-model="name"
                                type="text"
                                placeholder="Enter your name here"
                                name="FNAME"
                                class=""
                                id="mce-FNAME">
                        </b-form-input>
                    </div>
                    <div class="mc-field-group">
                        <b-form-input
                                v-model="email"
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
                <b-button @click="onSubmit"
                          variant="primary"
                          value="Subscribe"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          class="button">Submit</b-button>
            </div>
        </form>
    </div>
    <!--End mc_embed_signup-->
</template>
<script>
/**
 * @author Studio Folder - @StudioFolder
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/

import moment from 'moment';

export default {
  name: 'save-trip',
  data() {
    return {
      email: '',
      name: '',
      text: '',
    };
  },
  computed: {
    isPlannedFlight() {
      return this.$store.state.flightSimulator.flightType === 'planned';
    },
    winningExplorerData() {
      return this.$store.state.flightSimulator.winningExplorerData;
    },
    trajectoryId() {
      return this.$store.state.flightSimulator.trajectoryId;
    },
    maxDist() {
      return parseInt(this.winningExplorerData.minDist, 10).toLocaleString('en');
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
  },
  methods: {
    generateText() {
      if (this.isPlannedFlight) {
        /*
        return `The Aerocene Sculpture that left from <b>${this.departure.city
        }</b> on <strong>${this.depDate
        }</strong>arrived within <strong>${this.winningExplorerData.minDist
        }km</strong> from <strong>${this.destination.city
        }</strong> in <strong>${this.winningExplorerData.minTime} days.</strong>`;
        */
        // const template = "Departed from New York, US to Paris, France.
        // Arrived within 898.7 km of Paris in 2.9 days.
        // Travelled total 5950 km from fussel free borders.";
        return `Departed from ${this.departure.city}, ${this.departure.country} to ${this.destination.city}, ${this.destination.country}.
                Arrived within ${this.winningExplorerData.minDist} km of ${this.destination.city} in ${this.winningExplorerData.minTime} days.
                Travelled total ${this.winningExplorerData.totalDist} km from fossil free borders.`;
      }
      return `The Aerocene Sculpture that floated the farthest is the one that left from ${this.departure.city
      } on ${this.depDate
      } and travelled ${this.maxDist
      } km in ${this.winningExplorerData.minTime} days.`;
    },
    onSubmit() {
      const data = {
        email: this.email,
        id: this.trajectoryId,
        name: this.name,
        text: this.generateText(),
        departure_date: moment(this.winningExplorerData.departureDate).format('DD.MM.YYYY'),
      };
      const s = JSON.stringify(data);
      fetch('http://floatpredictor.aerocene.org/scripts/api/form/subscribe.php', {
        method: 'post',
        body: s,
      }).then(
        response => response.text(),
      ).then((jsonData) => {
        // console.log('***********************');
        // eslint-disable-next-line
        console.log(jsonData);
      }).catch((r) => {
        // eslint-disable-next-line
        console.log('Downloader error');
        // eslint-disable-next-line
        console.log(r);
      });
      this.$router.push('/client/home');
    },
  },
};
</script>
<style>
    .selector-group-wrapper {
        text-align: center;
    }
</style>
