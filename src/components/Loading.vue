<template>
  <transition name="fade">
  <div id="loading">
    <div style="display: table-cell; vertical-align: middle;">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20"
          fill="none" stroke-width="1" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
/* eslint-disable */
export default {
  name: 'loading',
  data () {
    return {
      // type: 'fullscreen'
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#loading{
  overflow: hidden;
  position: absolute;
  z-index: 3;
  top:0px;
  left:0px;
  display: table;
  height: 100%;
  width: 100%;
  transition: opacity 1.0s ease;
  background-color: rgba(0,0,0,0.9);
}

.loader {
  position: relative;
  margin: 0 auto;
  width: 80px;
}

.loader:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.circular {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@-webkit-keyframes color {
  100%,
  0% {
    stroke: #fafafa;
  }
  40% {
    stroke: #fafafa;
  }
  66% {
    stroke: #fafafa;
  }
  80%,
  90% {
    stroke: #fafafa;
  }
}


@keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}

.animate-flicker {
  -webkit-animation: flickerAnimation 4s infinite;
  -moz-animation: flickerAnimation 4s infinite;
  -o-animation: flickerAnimation 4s infinite;
  animation: flickerAnimation 4s infinite;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
