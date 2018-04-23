<template>
  <div id="gallery" class="main-content gallery" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <h1 class="entry-title">Aeroglyphs Archive</h1>
      <h3 class="entry-subtitle">
          Each imaginary Aerocene journey is an air signature we can use to
          advocate independence from fossil fuels.
      </h3>
      <div class="stats">
        <div class="saved">
          <div class="h2">{{count}}</div>
          <p>Aeroglyphs saved</p>
        </div>
        <div class="travelled">
          <div class="h2">{{parseInt(totalDistance * 1000).toLocaleString('en')}}</div>
          <p>Kilometers travelled</p>
        </div>
      </div>
      <div class="path-wrapper">
        <div class="gallery-item" v-for="item in flights" :key="item.id">
          <div class="gallery-item-inside">
            <img :src="getSVGPath(item)"/>
            <div class="info">
              <div class="aer-code">
                AER {{parseInt(item.id).toLocaleString('en')}}
              </div>
              <div class="date-created">
                {{getDate(item.created)}}
              </div>
              <div v-if="item.destination" class="additional-info">
                <p>Departed from <strong>{{item.departure.city}}</strong>.</p>
                <p>Arrived within <strong>{{item.min_dist.toLocaleString('en')}}</strong> km
                of <strong>{{item.destination.city}}</strong>
                    in <strong>{{item.min_time}} days</strong>.</p>
                <p>Travelled a total of
                    <strong>{{parseInt(item.distance * 1000).toLocaleString('en')}} km</strong>.
                </p>
              </div>
              <div v-else class="additional-info">
                  <p>Departed from <strong>{{item.departure.city}}</strong>.</p>
                  <p>Travelled a total of
                      <strong>{{parseInt(item.distance * 1000).toLocaleString('en')}} km</strong>
                      in <strong>{{item.min_time}} days</strong>.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="busy" class='small-loader'>
        <Loading></Loading>
      </div>
      <back-to-viz />
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
      flights: [],
      totalDistance: 0,
      count: 0,
      busy: false,
      page: 1,
    };
  },
  mounted() {
    this.done = false;
    this.addPage(this.page);
  },
  components: {
    BackToViz,
    Loading,
  },
  methods: {
    loadMore() {
      if (!this.busy) {
        this.busy = true;
        this.addPage(this.page);
      }
    },
    addPage(i) {
      fetch(`http://float.aerocene.org/api/gallery.php?page=${String(i)}`, {
        method: 'get',
      })
        .then((response) => {
          if (response.status !== 200) {
            // eslint-disable-next-line
            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          } else {
            response.json().then((data) => {
              if (data.flights) {
                this.flights = this.flights.concat(data.flights);
              }
              if (data.total_distance) {
                this.totalDistance = data.total_distance;
              }
              if (data.count) {
                this.count = data.count;
              }
              this.busy = false;
              this.page += 1;
            });
          }
        })
        // eslint-disable-next-line
        .catch(err => console.log('Fetch Error :-S', err));
    },
    getDate(dt) {
      return moment(dt).format('MMM Do, YYYY');
    },
    getSVGPath(item) {
      return `http://54.218.125.165/api/svg/${String(item.id)}.svg`;
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
          justify-content: center;
          align-items: center;
      }
      .gallery-item {
          height: 240px;
          overflow: hidden;
          width: 18%;
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
              img svg
              {
                  box-shadow: 0px 0px 5px #fff;
              }
          }
      }
  }
</style>
