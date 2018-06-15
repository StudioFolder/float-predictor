<template>
    <transition name="fade">
        <div class="onboard-nav shadowed winner-explorer-modal" v-show="isModalVisible">
            <div class="header">
                <div class="title h4">Your Aerosolar Journey</div>
            </div>
            <div class="body">
                <div class="aeroglyph" v-html="winningExplorerData.svg"></div>
                <div v-if="isPlannedFlight" class="message">
                    The Aerocene Sculpture that left from <b>{{departure.city}}</b>
                    on <strong>{{depDate}}</strong>
                    arrived within <strong>{{winningExplorerData.minDist}}km</strong>
                    from <strong>{{destination.city}}</strong> in
                    <strong>{{winningExplorerData.minTime}} days.</strong>
                </div>
                <div v-else class="message">
                    The Aerocene Sculpture that floated the farthest
                    is the one that  left from <strong>{{departure.city}}</strong>
                    on <strong>{{depDate}}</strong>
                    and travelled <strong>{{maxDist}} km</strong>
                    in <strong>{{winningExplorerData.minTime}} days.</strong>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import moment from 'moment';

export default {
  name: 'modal-winner-explorer',
  computed: {
    isPlannedFlight() {
      return this.$store.state.flightSimulator.flightType === 'planned';
    },
    isModalVisible() {
      return this.$store.state.flightSimulator.visualizationState === 4;
    },
    winningExplorerData() {
      return this.$store.state.flightSimulator.winningExplorerData;
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
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import "~css/_typography.scss";
.winner-explorer-modal {
    z-index: 19;
    font-size: 2rem;
    width: 500px;
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
