<template>
    <!-- Modal Component -->
    <b-modal id="disclaimer-modal"
             class="page-modal"
             centered hide-footer
             size="lg"
             title="Disclaimer">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <h4>Privacy</h4>
        <p>
            Aerocene Foundation is a non-for-profit organisation devoted to community building,
            scientific research, artistic experience and education aimed at increasing public
            awareness of global resource circulation and reactivating a common imaginary towards
            a new symbiotic relationship with the earth. Any material, data, imagery and sound
            collected may be used by Aerocene Foundation for  any artistic, scientific,
            educational or other purposes without restriction to any specific media, including,
            without limitation, press use, books, publications, films, video materials or
            exhibitions dealing with Aerocene, world-wide and unlimited in time.
        </p>
        <h4>Terms and Conditions</h4>
        <p>
            The information contained in this website is for general information purposes only.
            The information is provided by Aerocene Foundation and whilst we endeavour to keep
            the information up to date and correct, we make no representations or warranties of
            any kind, express or implied, about the completeness, accuracy, reliability,
            suitability or availability with respect to the website or the information, products,
            services, or related graphics contained on the website for any purpose. Any reliance
            you place on such information is therefore strictly at your own risk.
        </p>
    </b-modal>
</template>

<script>
export default {
  name: 'impressum-modal',
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
</style>
