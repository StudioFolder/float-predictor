<template>
    <!-- Modal Component -->
    <b-modal id="impressum-modal" class="page-modal" centered hide-footer size="lg"
             title="Impressum">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="entry-body">
            <p>
            The Aerocene Float Predictor is being developed by
            the <a href="http://aerocene.org" target="_blank">Aerocene Foundation</a>
            and the members of its diverse community.
        </p>
        <h4>TRAJECTORY COMPUTATION</h4>
        <p>
            <a href="https://eapsweb.mit.edu/" target="_blank">MIT Department of Earth, Atmospheric and Planetary Sciences</a> (Glenn Flierl, Lodovica Illari, Bill McKenna).
        </p>
        <h4>DESIGN AND DEVELOPMENT</h4>
        <p>
            <a href="http://www.studiofolder.it/" target="_blank">Studio Folder</a> <!--(Marco Ferrari, Elisa Pasqual, Luca Ferrario, Iacopo Leardini)-->
            and <a href="http://angelosemeraro.info/" target="_blank">Angelo Semeraro</a>.
        </p>
        <!--<h4>PROJECT DEVELOPMENT AND COORDINATION</h4>
        <p>
            <a href="http://aerocene.org/" target="_blank">Aerocene Foundation</a> (Joaquin Ezcurra, Camilla Berggren Lundell, Alice Lampert),
            <a href="http://tomassaraceno.com/" target="_blank">Studio Tomás Saraceno</a>
            (Erik Vogler, Saverio Cantoni, Rosalie Laurin, Yelta Köm,
            Connie Chester, Roxanne Mackie, Sofia Lemos, Zaida Violan),
            <a href="https://publiclab.org/ " target="_blank">Public Lab</a>
            (Nick Shapiro, Liz Barry), Imperial College London, Radio Amateurs DE
            & UK, and the <a href="https://ukhas.org.uk/" target="_blank">UK High Altitude Society</a>.
        </p>-->
      </div>
    </b-modal>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  name: 'impressum-modal',
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.page-modal {
    font-size: 1rem;
    .modal-body {
        font-size: 1.2em;
    }
}
</style>
