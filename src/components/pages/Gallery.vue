<template>
  <div id="gallery" class="main-content" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <b-container >
    <h1>Gallery</h1>
    <b-row>
      <b-col cols="10" offset="1">
        <b-row>
          <b-col class="gallery-item" lg="2" md="3" sm="4" cols="6"
                 v-for="item in data" :key="item.id">
            <img v-bind:src="getSVGPath(item)"/>
            <span>
          <strong>{{item.departure.city}}</strong>
          to <strong>{{item.destination.city}}</strong>
        </span>
            <span>{{getDate(item.created)}}</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  <div v-if="!done" class='small-loader'>
    <Loading></Loading>
  </div>
</b-container>
</div>
</template>

<script>
import Loading from '../Loading';

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
  },

  unmounted() {
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
      const date = new Date(dt);
      const monthNames = [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct',
        'Nov', 'Dec',
      ];
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      return `${day} ${monthNames[monthIndex]} ${year}`;
    },

    getSVGPath(item) {
      return `http://54.190.63.219/svg/${String(item.id)}.svg`;
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main-application{
  overflow: scroll !important;
}
</style>
<style scoped>
.small-loader{
  transition: opacity 1.0s ease;
  height: 50px;
  width: 100%;
  position: relative;
}
.main-application{
  overflow: scroll !important;
}

.gallery-item{
  margin-top: 20px;
  padding-left: 0px;
  min-height: 227px;

}

.gallery-item img{
  width:100%;
  margin-bottom: 5%;
}

.gallery-item span{
  display: block;
}

h1, h2 {
  text-align: center;
}

a {
  color: #42b983;
}
</style>
