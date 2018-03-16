<template>
    <!-- Modal Component -->
    <b-modal id="impressum-modal" class="page-modal" centered hide-footer size="lg"
             title="Impressum">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <p>
            This website has been established and developed by a dedicated and enthusiastic
            team of community members including: Lodovica Illari, Glenn Flierl, Bill McKenna
            (MIT Department of Earth, Atmospheric and Planetary Sciences), Marco Ferrari,
            Elisa Pasqual, Luca Ferrario, Iacopo Leardini, Angelo Semeraro (Studio Folder),
            Joaquin Ezcurra, Camilla Berggren Lundell, Alice Lamperti (Aerocene Foundation),
            Erik Vogler, Saverio Cantoni, Rosalie Laurin, Yelta Köm, Connie Chester,
            Roxanne Mackie, Sofia Lemos, Zaida Violan (Studio Tomás Saraceno), Nick Shapiro,
            Liz Barry, (Public Lab), Imperial College London, Radio Amateurs DE & UK, and the
            UK High Altitude Society.
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
.page-modal {
    font-size: 1rem;
    .modal-body {
        font-size: 1.2em;
    }
}
</style>
