<template>
  <div id="gallery" class="main-content gallery" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <h1 class="entry-title">The Aeroglyphs Archive</h1>
      <h3 class="entry-subtitle">
        Each imaginary Aerocene journey is an air signature
        that we can use to advocate the independence from fossil fuels.
      </h3>
      <div class="stats">
        <div class="saved">
          <div class="h2">{{count}}</div>
          <p>Aeroglyphs saved</p>
        </div>
        <div class="travelled">
          <div class="h2">{{parseInt(totalDistance).toLocaleString('en')}}</div>
          <p>Kilometers travelled</p>
        </div>
      </div>
      <div class="path-wrapper">
        <div class="gallery-item" v-for="item in data" :key="item.id">
          <div class="gallery-item-inside">
            <img :src="getSVGPath(item)"/>
            <div class="info">
              <div class="aer-code">
                AER {{parseInt(item.id).toLocaleString('en')}}
              </div>
              <div class="date-created">
                {{getDate(item.created)}}
              </div>
              <div class="additional-info">
                <p>Departed from <strong>{{item.departure.city}}</strong></p>
                <p>Arrived within <strong>{{item.min_dist}}</strong> kilometers
                from <strong>{{item.destination.city}}</strong>
                    in <strong>{{item.min_time}} days</strong></p>
                <p>Travelled a total of
                    <strong>{{parseInt(item.distance).toLocaleString('en')}} km</strong>
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div v-if="!done" class='small-loader'>
        <Loading></Loading>
      </div>
      <transition name="fade">
        <back-to-viz />
      </transition>
  </div>
</template>

<script>
import moment from 'moment';
import Loading from 'Parts/Loading';
import BackToViz from 'Parts/BackToViz';

export default {
  name: 'Gallery',
  data() {
    return {
      data: [],
      totalDistance: 0,
      count: 0,
      busy: false,
      done: false,
      page: 1,
    };
  },
  mounted() {
    this.init();
  },
  components: {
    BackToViz,
    Loading,
  },
  methods: {
    init() {
      this.done = false;
      this.addPage(this.page);
    },
    loadMore() {
      if (!this.done) {
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
      this.totalDistance = 0;
      this.count = 0;
      this.busy = true;
    },
    addPage(i) {
      // console.log('Add page ' + i)
      fetch(`http://54.190.63.219/db/api.php?page=${String(i)}`, {
        method: 'get',
      }).then(
        response => response.json(),
      ).then((data) => {
        if (data.flights) {
          this.data = this.data.concat(data.flights);
          this.done = true;
        } else {
          this.done = true;
        }
        if (data.total_distance) {
          this.totalDistance = data.total_distance;
        }
        if (data.count) {
          this.count = data.count;
        }
      });
    },
    getDate(dt) {
      return moment(dt).format('MMM Do, YYYY');
    },
    getSVGPath(item) {
      return `http://54.190.63.219/db/svg/${String(item.id)}.svg`;
    },
  },
};
</script>
<style scoped lang="scss">
  @import '~css/_variables_and_mixins.scss';

  .main-content.gallery {
      padding-top: 9.375rem;
      padding-left: 12rem;
      padding-right: 12rem;
      @include up(1440px) {
          padding-left: 0;
          padding-right: 0;
          max-width: 1100px;
      }
      @include down($large) {
          padding-left: 6rem;
          padding-right: 6rem;
      }
      @include medium_down {
          padding-left: 1rem;
          padding-right: 1rem;
      }
      text-align: center;
      margin: 0 auto;

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
      .stats {
          display: flex;
          flex-flow: row wrap;
          div {
              width: 50%;
              text-align: center;
              .h2 {
                  margin-left: auto;
                  margin-right: auto;
              }
              @include medium_down {
                  width: 100%;
              }
          }
      }
      .path-wrapper {
          margin-top: 4rem;
          display: flex;
          flex-flow: row wrap;
          position: relative;
          padding: 1rem;
      }
      .gallery-item {
          height: 240px;
          overflow: hidden;
          width: 20%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          font-size: 1rem;
          @include down($xlarge) {
              width: 25%;
          }
          @include down($large) {
              width: 33.33%;
          }
          @include medium_down {
              width: 50%;
          }
          .gallery-item-inside {
              min-width: 85%;
              padding: 1rem 1rem 1.5rem 1rem;
              border: 20px solid black;
              border-top: 0;
              border-bottom: 0;
              box-sizing: content-box;
              background-color: $bodyColor;
              transition: background-color .3s ease, border-color .3s ease;
              p {
                  color: rgba(255,255,255,.8);
                  margin-top: .8em;
              }
              strong {
                  color: #FFF;
              }
          }
          .info {
              .aer-code {
                  margin-top: 0;
                  font-size: 1em;
              }
              .date-created {
                  font-size: .8em;
              }
              .additional-info {
                  text-align: left;
                  margin-top: 1.5rem;
                  transition: opacity .2s ease;
                  opacity: 0;
                  font-size: .7em;
              }
              strong {
                  @extend %colfax_bold;
              }
          }
          img {
              width: 75%;
              height: auto;
              margin-bottom: 1.2rem;
          }
          &:hover {
              overflow: visible;
              z-index: 1;
              .gallery-item-inside {
                  background-color: $lightBlack;
                  border-color: $lightBlack;
              }
              .additional-info {
                  opacity: 1;
              }
          }
      }
  }
</style>
