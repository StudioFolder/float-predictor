<template>
    <!-- Modal Component -->
    <b-modal id="disclaimer-modal"
             class="page-modal"
             centered hide-footer
             size="lg"
             title="Disclaimer">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="entry-body">
            <p>
                Aerocene Foundation is a non-for-profit organisation devoted to community building,
                scientific research, artistic experience and education aimed at increasing public
                awareness of global resource circulation and reactivating a common imaginary towards
                a new symbiotic relationship with the Earth.
            </p>
        <h4>Privacy</h4>
        <p>
            Any material, data, imagery and sound
            collected may be used by Aerocene Foundation for  any artistic, scientific,
            educational or other purposes without restriction to any specific media, including,
            without limitation, press use, books, publications, films, video materials or
            exhibitions dealing with Aerocene, world-wide and unlimited in time.
            All images created and shared by Aerocene Foundation under the use of the Float
            Predictor are licensed under CC Creative Commons Share-A-Like Attribution which
            means users are free to share and adapt the material as long as they distribute
            their contributions under the same license as the original.
            Any personal data relating to users gathered by Aerocene Foundation
            in the website user process or during your use of the service will be
            recorded and only be used in accordance with <a href="https://ec.europa.eu/info/law/law-topic/data-protection_en" target="_blank">
                https://ec.europa.eu/info/law/law-topic/data-protection_en</a>.

        </p>
        <h4>Terms and Conditions</h4>
        <p>
            The information contained in this website is for general information purposes only.
            The information is provided by Aerocene Foundation and whilst we endeavour to keep
            the information up to date and correct, we make no representations or warranties of
            any kind, express or implied, about the completeness, accuracy, reliability,
            suitability or availability with respect to the website or the information,
            products, services, or related graphics contained on the website for any purpose.
            Any reliance you place on such information is therefore strictly at your own risk.
            Under no circumstances will Aerocene Foundation be liable for any loss or damage,
            including, without limitation, indirect or consequential loss or damage, or any
            loss or damage whatsoever arising from the loss of data or profits arising out
            of, or in connection with, the use of this website.
            Every effort is made to keep the website up and running smoothly. However,
            Aerocene Foundation takes no responsibility for, and will not be liable for,
            the website being temporarily unavailable due to technical issues beyond our control.
            Aerocene Foundation is dedicated to providing an harassment-free, safe,
            and inclusive experience for everyone, regardless of personal and
            professional background, gender identity and expression, style of clothing,
            sexual orientation, dis-/ability, physical appearance, race, age, or religion.
            Aerocene Foundation does not accept racism, sexism, ableism, ageism, homophobia,
            transphobia, body shaming, religion shaming, “geekier-than-thou” shaming,
            education bias, and the dismissal or bullying of children and adults among other.
        </p>
        </div>
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
