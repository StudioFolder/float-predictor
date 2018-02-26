<template>
  <div id="gallery" class="main-content" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <b-container >
      <h1 class="entry-title">The Aeroglyphs Archive</h1>
      <h3 class="entry-subtitle">
        Each imaginary Aerocene journey is an air signature
        that we can use to advocate the independence from fossil fuels.
      </h3>
      <div class="stats">
        <div class="saved">
          <div class="h2">{{parseInt(data[0].id).toLocaleString('en')}}</div>
          <p>Aeroglyphs saved</p>
        </div>
        <div class="travelled">
          <div class="h2">1,342,453</div>
          <p>Kilometers travelled</p>
        </div>
      </div>
      <div class="path-wrapper">
        <div class="gallery-item" v-for="item in data" :key="item.id">
          <div class="gallery-item-inside">
            <img v-bind:src="getSVGPath(item)"/>
            <div class="info">
              <div class="aer-code">
                AER {{parseInt(item.id).toLocaleString('en')}}
              </div>
              <div class="date-created">
                {{getDate(item.created)}}
              </div>
              <div class="additional-info">
                Departed from <strong>{{item.departure.city}}</strong><br>
                Arrived within <strong>{{item.min_dist}}</strong> kilometers
                from <strong>{{item.destination.city}}</strong>
                in <strong>{{item.min_time}} days</strong>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div v-if="!done" class='small-loader'>
        <Loading></Loading>
      </div>
    </b-container>
</div>
</template>

<script>
import moment from 'moment';
import Loading from 'Parts/Loading';

export default {
  name: 'Gallery',
  data() {
    return {
      data: [],
      busy: false,
      done: false,
      page: 1,
    };
  },
  mounted() {
    this.init();
    this.$store.commit('flightSimulator/setVisualizationState', 7);
  },
  components: {
    Loading,
  },
  methods: {
    init() {
      this.done = false;
      this.addPage(this.page);
    },
    loadMore() {
      if (!this.done) {
        // console.log('Load more ');
        this.busy = true;
        this.page += 1;
        setTimeout(() => {
          this.addPage(this.page);
        }, 1000);
      }
    },
    clear() {
      this.done = false;
      this.data = [];
      this.busy = true;
    },
    addPage(i) {
      // console.log('Add page ' + i)
      fetch(`http://54.190.63.219/api.php?page=${String(i)}`, {
        method: 'get',
      }).then(
        response => response.json(),
      ).then((data) => {
        if (data.flights) {
          // console.log('Page ' + i + ' -->' + data.flights.length)
          this.data = this.data.concat(data.flights);
          this.busy = false;
        } else {
          this.done = true;
        }
        // console.log('done')
      });
    },
    getDate(dt) {
      return moment(dt).format('MMM Do, YYYY');
    },
    getSVGPath(item) {
      return `http://54.190.63.219/svg/${String(item.id)}.svg`;
    },
  },
};
</script>
<style scoped lang="scss">
  @import '~css/_variables_and_mixins.scss';
  .container {
    padding-left: 9rem;
    padding-right: 9rem;
  }
  .main-content {
    padding-top: 9.375rem;
    text-align: center;
  }
  .path-wrapper {
    display: flex;
    flex-flow: row wrap;
    position: relative;
    padding: 1rem;
  }
.entry-subtitle {
  max-width: 20em;
  margin-left: auto;
  margin-right: auto;
}
.small-loader{
  transition: opacity 1.0s ease;
  height: 50px;
  width: 100%;
  position: relative;
}
.main-application{
  overflow: scroll !important;
}
p {
  color: $gray;
}
</style>
