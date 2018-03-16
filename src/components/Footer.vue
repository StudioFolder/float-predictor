<template>
    <div class="footer modal-contents">
        <instructions />
        <impressum />
        <disclaimer />
        <modal-winner-explorer />
    </div>
</template>
<script>
import instructions from 'Modals/InstructionsModal';
import impressum from 'Modals/ImpressumModal';
import disclaimer from 'Modals/DisclaimerModal';
import modalWinnerExplorer from 'Modals/ModalWinnerExplorer.Vue';

export default {
  components: { instructions, impressum, modalWinnerExplorer, disclaimer },
};
</script>
