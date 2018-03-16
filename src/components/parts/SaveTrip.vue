<template>
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
</template>
<script>
export default {
  name: 'save-trip',
  methods: {
    onSubmit() {
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
