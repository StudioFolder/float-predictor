<template>
    <div class="footer modal-contents">
        <instructions />
        <impressum />
        <modal-winner-explorer />
    </div>
</template>
<script>
import instructions from 'Modals/InstructionsModal';
import impressum from 'Modals/ImpressumModal';
import modalWinnerExplorer from 'Modals/ModalWinnerExplorer.Vue';

export default {
  components: { instructions, impressum, modalWinnerExplorer },
};
</script>
