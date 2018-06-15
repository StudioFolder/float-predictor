
<template>
  <div id ="visualization" class="main-visualization">
    <img id="down" src="../assets/icons/destination_arrow_down.svg"/>
    <img id="up" src="../assets/icons/departure_arrow_up.svg"/>
    <div id="labels"></div>
    <Loading v-if="(loading < 1.0 || saving)"></Loading>
    <canvas id="labels-canvas"></canvas>
  </div>
</template>
<script>
/* eslint-disable no-mixed-operators, no-console, no-param-reassign, max-len, one-var */

/**
 * Visualization.vue - Vue.js component responsible for implementing the WebGL 3D visualization (built using three.js) and the gui interaction.
 * Following the state management pattern provided by Vuex (https://vuex.vuejs.org/), the visualization reacts to the store mutations making it independent from the UI.
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/


import _ from 'lodash';
import { saveAs } from 'file-saver';
import Loading from 'Parts/Loading';
import Util from './visualization/Util';
import NightMap from './visualization/NightMap';
import animator from './visualization/Animator';
import Explorer from './visualization/Explorer';
import WindVisualization from './visualization/WindVisualization';
import TrajectoryDataDownloader from './visualization/TrajectoryDataDownloader';
import Labels from './visualization/Labels';

/* Viz assets */
import colorMap from '../assets/img/colormap/4096.jpg';
import colorMapMobile from '../assets/img/colormap/2048.jpg';
import bumpMap from '../assets/img/bumpmap/8192.jpg';
import bumpMapMobile from '../assets/img/bumpmap/4096.jpg';
import nightModeMap from '../assets/img/nightModeMap/4096.jpg';
import nightModeMapMobile from '../assets/img/nightModeMap/2048.jpg';
import colorMapA from '../assets/img/colormap/4096A.jpg';
import colorMapB from '../assets/img/colormap/4096B.jpg';
import colorMapC from '../assets/img/colormap/4096C.jpg';
import colorMapD from '../assets/img/colormap/4096D.jpg';
import spriteURL from '../assets/img/sprite.png';

const THREE = require('three');
const OrbitControls = require('../../custom_modules/three-orbit-controls')(THREE);

/* visualization states */
const STATE_ANIMATION_IDLE = 0;
const STATE_MOVING_TO_DEPARTURE = 1;
const STATE_ANIMATION_ACTIVE = 2;
const STATE_MOVING_TO_DESTINATION = 3;
const STATE_ANIMATION_END = 4;
const STATE_UNFOCUSED = 5;
const STATE_UNFOCUSED_PAGES = 6;
const STATE_UNFOCUSED_GALLERY = 7;
const STATE_INITIAL = 8;

const pressureLevels = [1000, 850, 500, 250, 100, 30, 10];
const altitudeLevels = [0.0, 1.467, 5.574, 10.363, 15.790, 70.962, 84.998];
const CATMULL_NUM_POINTS = 3;
const radius = 200;
// const EARTH_RADIUS = 6378.137
const INITIAL_ZOOM = (window.matchMedia('(orientation: portrait)').matches) ? 0.4 : 0.5;
const responsiveZoom = (window.matchMedia('(orientation: portrait)').matches) ? 0.5 : 0.8;
const responsiveY = (window.matchMedia('(orientation: portrait)').matches) ? 45 : 150;
const axesRotation = Util.getEarthPolarRotation(new Date());
const colors = [0x003769, 0x2e6a9c, 0x0095d7, 0x587a98, 0x7eafd4, 0xb9e5fb, 0x656868, 0xffffff];
const webColors = ['#003769', '#2e6a9c', '#0095d7', '#587a98', '#7eafd4', '#b9e5fb', '#656868', '#ffffff'];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// eslint-disable-next-line
let bumpTexture, labels, colorTexture, nightMapTexture, container, renderer, rendererAA, rendererNAA, scene, camera, controls, gui, pointLight, ambientLight, earthSphere, sunSphere, selectSphere, earthRotation, loaded, timer, explorers, explorerHS, fps, emisphereSprite, emisphereSphere, departure, destination, windVisualization, windVisualizations, downloader, particleSystem;
let pars = {};

export default {
  name: 'visualization',

  /* Computed properties */
  computed: {
    animating() {
      /*
      * Render the next frame if playing, wind panel is hidden, textures are loaded, wind data are loaded.
      * Do not if state is active and user is selecting and explorer with the mouse.
      */
      return this.playing && (!this.isWindPanelOn) &&
        this.textureLoaded >= 1 && this.windsLoaded &&
        (!this.selecting || this.visualizationState !== STATE_ANIMATION_ACTIVE);
    },
    activeExplorers() { return this.$store.state.flightSimulator.activeExplorers; },
    flightType() { return this.$store.state.flightSimulator.flightType; },
    guiVisible() { return this.$store.state.flightSimulator.guiVisible; },
    isWindPanelOn() { return this.$store.state.general.isWindPanelOpen && this.$store.state.general.isAltPanelOpen; },
    focusedExplorer: {
      get() { return this.$store.state.flightSimulator.focusedExplorer; },
      set(fe) { this.$store.commit('flightSimulator/setFocusedExplorer', fe); },
    },
    selectedExplorer: {
      get() { return this.$store.state.flightSimulator.selectedExplorer; },
      set(se) { this.$store.commit('flightSimulator/setSelectedExplorer', se); },
    },
    active: {
      get() { return this.$store.state.flightSimulator.isActive; },
      set(active) { this.$store.commit('flightSimulator/setActive', active); },
    },
    departure: {
      get() { return this.$store.state.flightSimulator.departure; },
      set(d) { this.$store.commit('flightSimulator/setDeparture', d); },
    },
    destination: {
      get() { return this.$store.state.flightSimulator.destination; },
      set(d) { this.$store.commit('flightSimulator/setDestination', d); },
    },
    coordinatesValid: {
      get() { return this.$store.state.flightSimulator.coordinatesValid; },
      set(v) { this.$store.commit('flightSimulator/setCoordinatesValid', v); },
    },
    elapsedDays: {
      get() { return this.$store.state.flightSimulator.elapsedDays; },
      set(value) { this.$store.commit('flightSimulator/setElapsedDays', value); },
    },
    playing: {
      get() { return this.$store.state.flightSimulator.isPlaying; },
      set(value) { this.$store.commit('flightSimulator/setPlaying', value); },
    },
    saving: {
      get() { return this.$store.state.flightSimulator.isSaving; },
      set(value) { this.$store.commit('flightSimulator/setSaving', value); },
    },
    loading: {
      get() { return this.$store.state.flightSimulator.loading; },
      set(value) { this.$store.commit('flightSimulator/setLoading', value); },
    },
    winningExplorerData: {
      get() { return this.$store.state.flightSimulator.winningExplorerData; },
      set(value) { this.$store.commit('flightSimulator/setWinningExplorerData', value); },
    },
    focusedExplorerSpeed: {
      get() { return this.$store.state.flightSimulator.focusedExplorerSpeed; },
      set(s) { this.$store.commit('flightSimulator/setFocusedExplorerSpeed', s); },
    },
    focusedExplorerDistance: {
      get() { return this.$store.state.flightSimulator.focusedExplorerDistance; },
      set(d) { this.$store.commit('flightSimulator/setFocusedExplorerDistance', d); },
    },
    focusedExplorerAltitude: {
      get() { return this.$store.state.flightSimulator.focusedExplorerAltitude; },
      set(d) { this.$store.commit('flightSimulator/setFocusedExplorerAltitude', d); },
    },
    visualizationState: {
      get() { return this.$store.state.flightSimulator.visualizationState; },
      set(v) { this.$store.commit('flightSimulator/setVisualizationState', v); },
    },
    winds: {
      get() { return this.$store.state.flightSimulator.winds; },
      set(v) { this.$store.commit('flightSimulator/setWinds', v); },
    },
    autoMode: {
      get() { return this.$store.state.flightSimulator.autoMode; },
      set(v) { this.$store.commit('flightSimulator/setAutoMode', v); },
    },
    altitudeLevel: {
      get() { return this.$store.state.flightSimulator.altitudeLevel; },
      set(a) { this.$store.commit('flightSimulator/setAltitudeLevel', a); },
    },
    initialAltitudeLevel: {
      get() { return this.$store.state.flightSimulator.initialAltitudeLevel; },
      set(a) { this.$store.commit('flightSimulator/setInitialAltitudeLevel', a); },
    },
    trajectoryId: {
      get() { return this.$store.state.flightSimulator.trajectoryId; },
      set(a) { this.$store.commit('flightSimulator/setTrajectoryId', a); },
    },
  },

  watch: {
    guiVisible(gv) {
      if (gv) this.addDebugTools();
    },

    active(isActive) {
      if (isActive) {
        this.visualizationState = STATE_INITIAL;
        this.visualizationState = STATE_MOVING_TO_DEPARTURE;
      } else {
        this.visualizationState = STATE_INITIAL;
      }
    },

    autoMode(am) {
      if (!am) {
        /* quit onboard if user interact with the mouse */
        if (this.visualizationState === STATE_ANIMATION_ACTIVE) this.focusedExplorer = 0;
      }
    },

    /*  Set loading true if:
    * 1) wind data is not loaded
    * 2) textures are not loaded
    * 3) trajectory are not loaded when state is active
    */
    windsLoaded(wl) {
      this.loading = wl * (this.trajectoryLoaded || this.visualizationState !== STATE_ANIMATION_ACTIVE) * this.textureLoaded;
    },

    textureLoaded(tl) {
      this.loading = this.windsLoaded * (this.trajectoryLoaded || this.visualizationState !== STATE_ANIMATION_ACTIVE) * tl;
    },

    trajectoryLoaded(tl) {
      this.loading = this.windsLoaded * (tl || this.visualizationState !== STATE_ANIMATION_ACTIVE) * this.textureLoaded;
    },

    isWindPanelOn(on) {
      if (!on) this.altitudeLevel = this.initialAltitudeLevel;
    },

    altitudeLevel(altitude) {
      /* set initial altitude level only at the beginning */
      if (this.visualizationState !== STATE_ANIMATION_ACTIVE) this.initialAltitudeLevel = altitude;
      this.setWindVisualization(altitude, pars.elapsed_days);
    },

    focusedExplorer(explorerId) {
      if (explorerId === 0) {
        this.setOnboard(false);
      } else {
        this.onboardIndex = explorerId - 1;
        this.setOnboard(true);
      }
    },

    selectedExplorer(s) {
      let selected = s;
      if (s <= 0) {
        selectSphere.visible = false;
        this.selecting = false;
        /* During animation end, keep one track selected. */
        if (this.visualizationState === STATE_MOVING_TO_DESTINATION ||
          this.visualizationState === STATE_ANIMATION_END) {
          selected = this.minTrack + 1;
        }
      }

      /* During animation end, focusedExplorer = selectedExplorer. */
      if (this.visualizationState === STATE_MOVING_TO_DESTINATION ||
        this.visualizationState === STATE_ANIMATION_END) {
        this.focusedExplorer = selected;
      }

      /* update labels, trajectory styles and dashboard data on select changes */
      if (selected <= 0) {
        labels.daysLabels.setVisible(false);
        _.each(explorers, (e) => {
          e.setStyle(Explorer.MOVING);
        });
      } else {
        this.focusedExplorerSpeed = explorers[selected - 1].getSpeed().toFixed(0);
        this.focusedExplorerDistance = explorers[selected - 1].getDistance().toFixed(0);
        this.focusedExplorerAltitude = (explorers[selected - 1].getAltitudeRatio() * 1000.0 * altitudeLevels[this.initialAltitudeLevel]).toFixed(2);
        labels.daysLabels.show(selected - 1, explorers);
        labels.update(pars.onboard);
        _.each(explorers, (e, index) => {
          if (index === selected - 1) {
            e.setStyle(Explorer.SELECTED);
          } else {
            e.setStyle(Explorer.UNSELECTED);
          }
        });
      }
    },

    departure(d) {
      this.visualizationState = STATE_INITIAL;
      if (d !== undefined && d.city && d.lat && d.lng && d.country) {
        departure = { lat: d.lat, lng: d.lng, country: d.country, city: d.city };

        const t = Util.latLon2XYZPosition(d.lat, d.lng, radius);
        if (labels.departureLabel) labels.departureLabel.set(d.city, t);
        const azimuth = ((d.lng + 90) / 360.0) * 2 * Math.PI;
        /* compute the date that make the point light zenithal to departure location */
        const ts = (-earthRotation - azimuth) / (Math.PI * 2) % 1;
        this.targetDate.setTime(this.startingDate.getTime() + (ts * 24.0 * 60 * 60 * 1000));
        this.targetDate.setMonth(new Date().getMonth());
        this.targetDate.setDate(new Date().getDate());
        const r = Util.getEarthAzimuthRotation(this.startingDate);
        const sunP = new THREE.Vector3(Math.sin(-r) * radius, Math.sin(axesRotation) * radius, Math.cos(-r) * radius);
        const angle = labels.departureLabel.getPosition().angleTo(sunP);

        /* explorers need sunlight to lift. do not accept location like Iceland on the 22nd of December */
        this.coordinatesValid = angle < 1.5;
      } else {
        console.log('Invalid departure');
      }
    },

    destination(d) {
      this.visualizationState = STATE_INITIAL;
      if (d !== undefined && d.city && d.lat && d.lng && d.country) {
        destination = { lat: d.lat, lng: d.lng, country: d.country, city: d.city };
        // console.log(`Destination: ${d.lat} ${d.lng} ${d.city} `);
        const t = Util.latLon2XYZPosition(destination.lat, d.lng, radius);
        labels.destinationLabel.set(d.city, t);
      } else {
        console.log('Invalid destination');
      }
    },

    visualizationState(s) {
      this.setState(s);
    },

    winds(w) {
      pars.winds = w;
      Object.assign(pars.layers.wind, pars.wind_settings[w]);
      windVisualization.setStyle(pars.layers.wind);
    },
  },
  data() {
    return {
      alive: true, /* needed for debug hot reload */
      selecting: false, /* explorer mouse selection */
      minDist: 0, /* min dist from destination */
      minTime: 0, /* time when the explorer was closer to the destination */
      minTrack: 0, /* winning track */
      onboardIndex: 0, /* track onboard */
      startingDate: new Date(), /* initial date */
      targetDate: new Date(), /* target date for starting (zenithal to destination) */
      windsLoaded: false,
      trajectoryLoaded: false,
      textureLoaded: 0,
    };
  },

  components: {
    Loading,
  },

  mounted() {
    /* INIT VARIABLES */
    fetch('static/config/general.json')
      .then(r => r.json())
      .then((json) => {
        pars = json;
        pars.zoom = (window.matchMedia('(orientation: portrait)').matches) ? 0.4 : 0.5;
        console.log(pars);
        earthRotation = 0;
        loaded = 0;
        timer = 0;
        fps = 0;
        explorers = [];
        explorerHS = [0, 0, 0, 0, 0, 0, 0, 0];
        this.initVis();
        if (this.guiVisible) {
          this.addDebugTools();
        }
      });
  },

  beforeDestroy() {
    this.alive = false;
    if (gui) gui.destroy();
  },

  methods: {
    /**
     * Init the visualization on component mount. It setup the three.js scene, add the gui and setup the listeners.
     */
    initVis() {
      if (process.env.NODE_ENV === 'development') {
        pars.speed_d_x_sec = 0.09;
        pars.skip_frame = 1;
        pars.use_bump = false;
        pars.antialias = false;
      }

      /* placeholder locations */
      departure = {
        lat: 52.520645,
        lng: 13.409779,
        city: 'A',
        country: 'A State',
      };
      destination = {
        lat: 35.652832,
        lng: 139.839478,
        city: 'B',
        country: 'B State',
      };

      this.selectedExplorer = 0;
      this.initTHREE();
      this.initStarfield();
      this.setupExplorers();
      this.initNightMap();
      labels = new Labels(scene, camera, radius);
      this.setScale(INITIAL_ZOOM);
      this.initWindVisualization();
      this.initFPSChecker();
      this.visualizationState = STATE_INITIAL;
      this.mouse = new THREE.Vector2();

      rendererAA.domElement.addEventListener('mousemove', this.onMouseMove, false);
      rendererAA.domElement.addEventListener('click', this.onMouseClick, false);
      rendererNAA.domElement.addEventListener('mousemove', this.onMouseMove, false);
      rendererNAA.domElement.addEventListener('click', this.onMouseClick, false);

      controls.addEventListener('change', () => { labels.update(pars.onboard); });
      controls.addEventListener('start', () => { this.interacting = true; this.autoMode = false; }, false);
      controls.addEventListener('end', () => { this.interacting = false; }, false);
      controls.addEventListener('scale', () => { this.setScale(scene.scale.x); }, false);

      this.animate();
    },

    /**
     * Compute explorer selection by finding explorers object intersecting the mouse picking ray.
     * @param event
     */
    onMouseMove(event) {
      event.preventDefault();
      const pr = renderer.getPixelRatio();
      mouse.x = (event.clientX / (renderer.domElement.width / pr)) * 2 - 1;
      mouse.y = -(event.clientY / (renderer.domElement.height / pr)) * 2 + 1;
      camera.updateMatrixWorld();
      raycaster.setFromCamera(mouse, camera);

      /* only if not already selected (sphere visible or not) */
      if (!(selectSphere.visible && raycaster.intersectObject(selectSphere).length > 0)) {
        let selected = -1;
        _.each(explorers, (e, index) => {
          if (raycaster.intersectObject(e.animatingSphere).length > 0 &&
            e.getDistance() > 0) { /* if launched */
            selected = index;
            this.selecting = true;
            selectSphere.visible = true;
            selectSphere.position.copy(explorers[selected].animatingSphere.position.clone().multiplyScalar(1.001));// `Explorer ${index + 1} > `, e.animatingSphere.position);
          }
        });
        if (this.selecting) this.selectedExplorer = selected + 1;
      }
    },

    /**
     * Go onboard on mouse click if active. Set selection when animation ends.
     * @param event
     */
    onMouseClick(event) {
      if (this.visualizationState === STATE_ANIMATION_ACTIVE) {
        this.onMouseMove(event);
        /* go onboard on mouse click */
        if (this.selectedExplorer < pars.elapsed_days + 1) {
          this.focusedExplorer = this.selectedExplorer;
          this.selectedExplorer = 0;
          if (this.selectedExplorer > 0) this.playing = true;
        }
      }
      if (this.visualizationState === STATE_ANIMATION_END) {
        this.onMouseMove(event);
        if (this.selectedExplorer > 0) {
          this.minTrack = this.selectedExplorer - 1;
        }
      }
    },

    /**
     * Add 1 sec interval callback for calculating actual fps and managing performances and optimizations.
     *
     */
    initFPSChecker() {
      const DECREASE_COUNTDOWN = 3;
      const INCREASE_COUNTDOWN = 6;

      setTimeout(() => {
        this.lastCheck = new Date();
        this.lowFPS = DECREASE_COUNTDOWN;
        this.highFPS = 0;
        setInterval(
          () => {
            const now = new Date();
            const diff = now - this.lastCheck;
            this.lastCheck = now;
            if (Math.abs(diff - 1000) < 10 && fps > 5 && document.hasFocus()) { // IF IT WAS 1 sec and document has focus
              /* Decrease viz features (antialias, frame rate, resolution) if fps < 50 for 3 seconds continuously */
              if (60 - fps > 10) {
                this.lowFPS -= 1;
                this.highFPS = 0;
                if (this.lowFPS <= 0) {
                  if (pars.skip_frame < 3) {
                    pars.skip_frame += 1;
                  } else if (renderer === rendererAA) {
                    this.setAntialias(false);
                  } else {
                    /*
                    const lpr = pars.pixel_ratio;
                    if (fps < 40) {
                      pars.pixel_ratio = Math.max(1, pars.pixel_ratio - 1.0);
                    } else {
                      pars.pixel_ratio = Math.max(1, pars.pixel_ratio - 0.5);
                    }
                    if (pars.pixel_ratio !== lpr) {
                      renderer.setPixelRatio(pars.pixel_ratio);
                      // console.log(`--------------------------------- Setting PixelRatio to ${pars.pixel_ratio}`);
                    }
                    */
                  }
                  this.lowFPS = DECREASE_COUNTDOWN;
                }
              } else {
                /* Increase features (antialias, frame rate, resolution) if fps are 60 for 7 seconds continuously */
                if (fps > 59) {
                  this.highFPS += 1;
                } else {
                  this.highFPS = 0;
                }
                if (this.highFPS > INCREASE_COUNTDOWN) {
                  if (pars.skip_frame > 0) {
                    pars.skip_frame -= 1;
                  } else {
                    const lpr = pars.pixel_ratio;
                    pars.pixel_ratio = Math.min(2, pars.pixel_ratio + 0.1);
                    if (pars.pixel_ratio !== lpr) {
                      renderer.setPixelRatio(pars.pixel_ratio);
                    }
                  }
                  this.highFPS = 0;
                }
                this.lowFPS = DECREASE_COUNTDOWN;
              }
            }
            pars.fps = fps;
            fps = 0;
            /*  update dashboard if onboard & active */
            if (this.focusedExplorer > 0 && this.visualizationState === STATE_ANIMATION_ACTIVE) {
              this.focusedExplorerSpeed = explorers[this.onboardIndex].getSpeed().toFixed(0);
              this.focusedExplorerDistance = explorers[this.onboardIndex].getDistance().toFixed(0);
              this.focusedExplorerAltitude = (explorers[this.onboardIndex].getAltitudeRatio() * 1000.0 * altitudeLevels[this.initialAltitudeLevel]).toFixed(2);
              pars.camera_shift = 0.13 - 0.08 * explorers[this.onboardIndex].animatingSphere.position.distanceTo(camera.position) / 100.0;
            }
          },
          1000,
        );
      }, 2000);
    },

    /**
     * Set antialias on / off.
     * This is done by using two separate WebGLRenderer.
     * @param {Boolean} aa
     */
    setAntialias(aa) {
      pars.antialias = aa;
      if (aa) {
        renderer = rendererAA;
        rendererNAA.domElement.style.display = 'none';
        rendererAA.domElement.style.display = 'block';
      } else {
        renderer = rendererNAA;
        rendererNAA.domElement.style.display = 'block';
        rendererAA.domElement.style.display = 'none';
      }
      renderer.setPixelRatio(pars.pixel_ratio);
    },

    /**
     * Init night map, setting the different parameters (visibility, intensity, threshold and color).
     */
    initNightMap() {
      NightMap.init(radius, scene, nightMapTexture);
      NightMap.setVisible(pars.use_nightmap);
      NightMap.setIntensity(pars.nightmap_intensity);
      NightMap.setThreshold(pars.nightmap_threshold);
      NightMap.setColor(pars.nightmap_color);
    },

    /**
     * Init the wind data for all the altitude levels. It preloads all the 16 days data of the initial altitude level.
     */
    initWindVisualization() {
      windVisualizations = [];
      _.each(pressureLevels, (l) => {
        windVisualizations.push(new WindVisualization(l, scene, radius * 1.02));
      });
      /* preload */
      windVisualizations[this.initialAltitudeLevel].setActive();

      this.setWindVisualization(this.initialAltitudeLevel);
      this.winds = pars.winds;
    },

    /**
     * Change the wind visualization, setting and loading the new altitude level.
     * @param {Integer} i
     * index [0-6] of the altitude level
     */
    setWindVisualization(i) {
      if (windVisualization) {
        windVisualization.hide();
      }
      windVisualization = windVisualizations[i];
      windVisualization.setActive(pars.elapsed_days);
      windVisualization.setStyle(pars.layers.wind);
    },

    /**
     * Init 1000 particles star field. The particle distance (r) is between 1000 and 3000.
     */
    initStarfield() {
      // create the particle variables
      const particleCount = 1000;
      const particles = new THREE.Geometry();
      const pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 4,
      });
      // now create the individual particles
      for (let p = 0; p < particleCount; p += 1) {
        // create a particle radius between 1000 and 3000
        const r = 1000 + Math.random() * 2000;
        const v = Math.random() * Math.PI;
        const f = Math.random() * Math.PI * 2.0 - Math.PI;
        const pX = r * Math.sin(v) * Math.cos(f);
        const pY = r * Math.sin(v) * Math.sin(f);
        const pZ = r * Math.cos(v);
        const particle = new THREE.Vector3(pX, pY, pZ);
        // add it to the geometry
        particles.vertices.push(particle);
      }
      // create the particle system
      particleSystem = new THREE.Points(
        particles,
        pMaterial,
      );
      // add it to the scene
      scene.add(particleSystem);
      particleSystem.visible = pars.stars;
    },

    /**
     * Init the 8 explorers.
     */
    setupExplorers() {
      for (let i = 0; i < 8; i += 1) {
        const explorer = new Explorer(scene, radius, i * 8 * CATMULL_NUM_POINTS, CATMULL_NUM_POINTS);
        explorer.line.material.color = new THREE.Color(colors[i]);
        explorer.animatingSphere.material.color = new THREE.Color(colors[i]);
        explorers.push(explorer);
      }
    },

    /**
     * Setup the three.js scene. It adds the 3d objects that make the viz (lines, spheres, textures, etc.). setup lights, materials, camera and the mouse/touch controls.
     */
    initTHREE() {
      container = document.getElementById('visualization');
      this.loadTextures();

      /* setup antialias and non-antialias rennderers */
      rendererAA = new THREE.WebGLRenderer({
        antialias: true, // pars.antialias,
        preserveDrawingBuffer: true,
      });
      rendererAA.setSize(window.innerWidth, window.innerHeight);
      rendererAA.setClearColor(0x000000);
      rendererAA.domElement.classList.add('canvas');
      rendererAA.domElement.id = 'canvasAA';
      container.appendChild(rendererAA.domElement);

      rendererNAA = new THREE.WebGLRenderer({
        antialias: false, // pars.antialias,
        preserveDrawingBuffer: true,
      });
      rendererNAA.domElement.classList.add('canvas');
      rendererNAA.domElement.id = 'canvasNAA';
      container.appendChild(rendererNAA.domElement);
      rendererNAA.setSize(window.innerWidth, window.innerHeight);
      rendererNAA.setClearColor(0x000000);

      /* setup scene, camera, controls */
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, rendererAA.getSize().width / rendererAA.getSize().height, 0.1, 10000);
      camera.position.set(0, radius * 0.25, radius * 1.7);
      controls = new OrbitControls(camera, document.getElementById('visualization'));
      controls.dampingFactor = 0.017;
      controls.autoRotateSpeed = 1;
      controls.enablePan = false;
      controls.zoomSpeed = 0.1;
      controls.enableZoom = pars.zoom_enabled;
      controls.constraint.scene = scene;
      controls.minDistance = radius * 0.5;
      pars.pixel_ratio = window.devicePixelRatio;
      this.setAntialias(pars.antialias);

      /* setup lights: 1 ambientLight 1 point light (sun) */
      pointLight = new THREE.PointLight(pars.sun_light_color);
      pointLight.intensity = pars.spot_light_intensity;
      scene.add(pointLight);
      ambientLight = new THREE.AmbientLight(pars.ambient_light_color);
      ambientLight.intensity = pars.ambient_light_intensity;
      scene.add(ambientLight);

      /* objects: earth, sun, selection sphere */
      earthSphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 64, 36),
        new THREE.MeshPhongMaterial({ color: 0xffffff,
          transparent: true,
          opacity: 1,
          map: colorTexture,
          shininess: 1,
        }),
      );
      scene.add(earthSphere);

      if (pars.use_bump) { earthSphere.material.bumpMap = bumpTexture; } else { earthSphere.material.bumpMap = undefined; }
      earthSphere.material.bumpScale = pars.bump_scale;

      earthSphere.material.needsUpdate = true;

      sunSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 2, 20, 20), new THREE.MeshBasicMaterial({ color: 0xFFE893 }));
      sunSphere.visible = pars.sun_visible;
      scene.add(sunSphere);

      selectSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.01, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.1, transparent: true }));
      scene.add(selectSphere);

      /* fake emisphere setup */
      const spriteMap = new THREE.TextureLoader().load(spriteURL);
      const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff, depthWrite: false, depthTest: false });
      emisphereSprite = new THREE.Sprite(spriteMaterial);
      emisphereSprite.scale.set(440, 440, 440);
      scene.add(emisphereSprite);

      emisphereSphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.04, 64, 36),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.4,
          depthTest: false,
          depthWrite: false,
        }),
      );
      scene.add(emisphereSphere);
      emisphereSphere.visible = false;
      emisphereSprite.visible = false;

      /* events */

      window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        rendererNAA.setSize(w, h);
        rendererAA.setSize(w, h);
        // labels.onResize();
      }, false);
    },

    /**
     * Responsive texture loading.
     */
    loadTextures() {
      // textures
      const afterLoad = () => {
        /* texture loaded will be 1 after the 3 textures (bump, night, color) are loaded  */
        this.textureLoaded = Math.min(1, this.textureLoaded + 0.34);
      };
      if (window.matchMedia('(min-width: 768px)').matches) {
        bumpTexture = new THREE.TextureLoader().load(bumpMap, () => { /* console.log('bumb loaded'); */ afterLoad(); });
        colorTexture = new THREE.TextureLoader().load(colorMap, () => { /* console.log('color loaded'); */ afterLoad(); });
        nightMapTexture = new THREE.TextureLoader().load(nightModeMap, () => { /* console.log('alpha loaded'); */ afterLoad(); });
        /* the viewport is at least 768 pixels wide */
      } else {
        bumpTexture = new THREE.TextureLoader().load(bumpMapMobile, () => { /* console.log('bumb loaded'); */ afterLoad(); });
        colorTexture = new THREE.TextureLoader().load(colorMapMobile, () => { /* console.log('color loaded'); */ afterLoad(); });
        nightMapTexture = new THREE.TextureLoader().load(nightModeMapMobile, () => { /* console.log('alpha loaded'); */ afterLoad(); });
        /* the viewport is less than 768 pixels wide */
      }
    },

    /**
     * Init basic gui for customising the viz. Not loaded by default.
     */
    addDebugTools() {
      if (!this.guiLoaded) {
        // eslint-disable-next-line
        const GUI = require('../../custom_modules/dat.gui/build/dat.gui.min.js').GUI;
        gui = new GUI({ width: 400 });
        gui.domElement.id = 'gui';
        gui.domElement.style.left = '10px';
        gui.domElement.style.top = '0px';
        gui.domElement.style.position = 'absolute';
        console.log('GUI VISIBLE');
        const general = gui.addFolder('general');
        general.add(pars, 'active').onChange((v) => { this.isActive = v; });
        general.add(pars, 'state', 0, 10).step(1).listen().onChange((value) => { this.visualizationState = value; });
        general.add(pars, 'elapsed_days', 0.0, 16.0).listen();
        general.add(pars, 'altitudeLevel', 0.0, altitudeLevels.length - 1).step(1).onChange((value) => { this.altitudeLevel = value; });
        general.add(pars, 'auto_rotate');// .onChange(function(value) {controls.autoRotate=value;});
        general.add(pars, 'antialias').listen().onChange((value) => { this.setAntialias(value); });
        general.add(pars, 'stars').onChange((v) => { particleSystem.visible = v; });
        general.add(pars, 'sun_visible').onChange((value) => { sunSphere.visible = value; });
        general.add(pars, 'move_in_time');
        general.add(pars, 'speed_d_x_sec', 0, 2);
        general.add(pars, 'pixel_ratio', 1, 3).listen().onChange((value) => { renderer.setPixelRatio(value); });
        general.add(pars, 'skip_frame', 0, 60).step(1).listen();
        general.add(pars, 'fps', 0, 60).listen();
        general.add(pars, 'winds', 0, 4).step(1).listen().onChange((value) => { this.winds = value; });

        general.add(controls.target, 'x', -1000.0, 1000.0).listen().onChange(() => {});
        general.add(controls.target, 'y', -1000.0, 1000.0).listen().onChange(() => {});
        general.add(pars, 'zoom', 0.1, 2.0).listen().onChange((value) => { console.log('changed'); this.setScale(value); });
        general.add(pars, 'zoom_enabled').onChange((value) => { controls.enableZoom = value; });
        const onboard = gui.addFolder('onboard');
        onboard.add(pars, 'onboard');
        onboard.add(pars, 'camera_smooth', 0.9, 1);
        onboard.add(pars, 'camera_distance', 1.0, 1.5);
        onboard.add(pars, 'camera_shift', 0, 0.5).listen();
        const materialf = gui.addFolder('material');
        const emisphere = gui.addFolder('emisphere');
        const bump = materialf.addFolder('bump');

        bump.add(pars, 'use_bump').onChange((value) => {
          if (value) { earthSphere.material.bumpMap = bumpTexture; } else { earthSphere.material.bumpMap = undefined; }
          earthSphere.material.needsUpdate = true;
        });
        bump.add(pars, 'bump_scale', 0, 10).onChange((value) => { earthSphere.material.bumpScale = value; earthSphere.material.needsUpdate = true; });
        const nightmap = materialf.addFolder('nightmap');
        nightmap.add(pars, 'use_nightmap').onChange((value) => {
          NightMap.setVisible(value);
        });
        nightmap.add(pars, 'nightmap_intensity', 0, 2).onChange((value) => {
        //  earthSphere.material.emissiveIntensity = value; earthSphere.material.needsUpdate = true
          NightMap.setIntensity(value);
        });
        nightmap.add(pars, 'nightmap_threshold', 0, 1).onChange((value) => {
        //  earthSphere.material.emissiveIntensity = value; earthSphere.material.needsUpdate = true
          NightMap.setThreshold(value);
        });
        nightmap.addColor(pars, 'nightmap_color').onChange((value) => {
          NightMap.setColor(value);
        });
        materialf.add(pars, 'colorMap', { 'MAP A': colorMapA, 'MAP B': colorMapB, 'MAP C': colorMapC, 'MAP D': colorMapD }).onChange((v) => {
          colorTexture = new THREE.TextureLoader().load(v, () => { console.log('color loaded'); });
          earthSphere.material.map = colorTexture;
          earthSphere.material.needsUpdate = true;
        });
        materialf.add(earthSphere.material, 'shininess', 0, 100).onChange(() => { earthSphere.material.needsUpdate = true; });
        materialf.add(earthSphere.material, 'reflectivity', 0, 100).onChange(() => { earthSphere.material.needsUpdate = true; });
        materialf.addColor(earthSphere.material, 'emissive').onChange(() => { earthSphere.material.needsUpdate = true; });
        materialf.add(earthSphere.material, 'emissiveIntensity', 0, 1).onChange(() => { earthSphere.material.needsUpdate = true; });
        materialf.add(earthSphere.material, 'reflectivity', 0, 1).onChange(() => { earthSphere.material.needsUpdate = true; });
        materialf.add(earthSphere.material, 'refractionRatio', 0, 1).onChange(() => { earthSphere.material.needsUpdate = true; });

        emisphere.add({ message: 'OPTION 1 - 3D SPHERE' }, 'message').onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere, 'visible').onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere.material, 'opacity', 0, 1).onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.addColor(emisphereSphere.material, 'color').onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.addColor(emisphereSphere.material, 'emissive').onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere.material, 'emissiveIntensity', 0, 1).onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere.material, 'reflectivity', 0, 10).onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere.material, 'refractionRatio', 0, 10).onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere.material, 'shininess', 0, 100).onChange(() => { emisphereSphere.material.needsUpdate = true; });
        emisphere.add(emisphereSphere.scale, 'z', 0.1, 1.5).onChange((z) => { emisphereSphere.scale.set(z, z, z); });

        emisphere.add({ message: 'OPTION 2 - STATIC PNG' }, 'message');
        emisphere.add(emisphereSprite, 'visible').onChange(() => { emisphereSprite.material.needsUpdate = true; });
        emisphere.add(emisphereSprite.material, 'opacity', 0, 1).onChange(() => { emisphereSprite.material.needsUpdate = true; });
        emisphere.addColor(emisphereSprite.material, 'color').onChange(() => { emisphereSprite.material.needsUpdate = true; });
        emisphere.add(emisphereSprite.scale, 'z', 300, 600).onChange((z) => { emisphereSprite.scale.set(z, z, z); });

        const lights = gui.addFolder('lights');
        lights.addColor(pars, 'sun_light_color').onChange((value) => { pointLight.color = new THREE.Color(value); });
        lights.add(pars, 'spot_light_intensity', 0, 10).onChange((value) => { pointLight.intensity = value; });
        lights.addColor(pars, 'ambient_light_color').onChange((value) => { ambientLight.color = new THREE.Color(value); });
        lights.add(pars, 'ambient_light_intensity', 0, 10).onChange((value) => { ambientLight.intensity = value; });

        const layers = gui.addFolder('layers');
        const wind = layers.addFolder('wind');
        wind.add(pars.layers.wind, 'visible').onChange((value) => { windVisualization.lines.visible = value; });
        wind.addColor(pars.layers.wind, 'start_color').onChange(() => { windVisualization.setColor(new THREE.Color(pars.layers.wind.start_color), new THREE.Color(pars.layers.wind.end_color)); });
        wind.addColor(pars.layers.wind, 'end_color').onChange(() => { windVisualization.setColor(new THREE.Color(pars.layers.wind.start_color), new THREE.Color(pars.layers.wind.end_color)); });

        wind.add(pars.layers.wind, 'mapping', { 'NO MAPPING': 0.0, 'RGB MAPPING': 1.0, 'HUE MAPPING': 2.0 }).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'opacity_mapping').listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'threshold', 0, 200).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'opacity', 0, 5).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'minOpacity', 0, 1).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'magnitude', 0, 3).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'precision', 0, 5).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'animating').listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        wind.add(pars.layers.wind, 'animationSpeed', 0, 3).listen().onChange(() => { windVisualization.setStyle(pars.layers.wind); });
        gui.close();
      }
      this.guiLoaded = true;
    },

    /**
     * It manages state transition, implementing the different behaviours for each state.
     * @param {Integer} state
     */
    setState(state) {
      switch (state) {
        case STATE_ANIMATION_IDLE: {
          pars.auto_rotate = false;
          this.clear();
          break;
        }
        /* move to departure point after departure/destination selection and start downloading the trajectory data */
        case STATE_MOVING_TO_DEPARTURE: {
          this.clear();
          labels.departureLabel.set(departure.city, labels.departureLabel.anchorObject.position.clone().multiplyScalar(1.003));
          /* hide the departure label if the flight is planned */
          if (this.flightType === 'planned') {
            labels.destinationLabel.set(destination.city, labels.destinationLabel.anchorObject.position.clone().multiplyScalar(1.003));
          } else {
            labels.destinationLabel.setVisible(false);
          }
          pars.auto_rotate = false;
          this.downloadMulti();
          this.resetTo({ lat: departure.lat, lng: departure.lng, time: 0.5, date: this.targetDate, onAnimationEnd: () => { this.visualizationState = STATE_ANIMATION_ACTIVE; } });
          break;
        }
        /* animation active */
        case STATE_ANIMATION_ACTIVE: {
          pars.auto_rotate = false;
          break;
        }
        /* move to destination point after simulation ends */
        case STATE_MOVING_TO_DESTINATION: {
          pars.auto_rotate = false;
          // FADE IN ONLY THE MIN TRACK
          this.selectedExplorer = this.minTrack + 1;

          labels.cityLabels.setVisible(false);
          // GO TO DESTINATION POINT
          const d = Util.XYZ2LatLon(explorers[this.minTrack].animatingSphere.position); // explorers[this.minTrack].destination;
          this.resetTo({
            lat: d.lat,
            lng: d.lng,
            time: 1.0,
            onAnimationEnd: () => {
              this.visualizationState = STATE_ANIMATION_END;
              this.focusedExplorer = 0;
            },
          });
          labels.daysLabels.show(this.minTrack, explorers);
          labels.update(pars.onboard);
          break;
        }
        /* animation end */
        case STATE_ANIMATION_END: {
          pars.auto_rotate = false;
          break;
        }

        case STATE_UNFOCUSED: {
          pars.auto_rotate = true;
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [responsiveY, responsiveZoom, Math.PI * 0.5];
          animator.start({
            init_values: iv,
            end_values: ev,
            time_start: 0,
            time_interval: 0.4,
            sine_interpolation: true,
            onAnimationEnd: () => {
            },
            onAnimationUpdate: (v) => {
              controls.target.set(controls.target.x, v[0], controls.target.z);
              this.setScale(v[1]);
              controls.setPolarAngle(v[2]);
            },
          });
          break;
        }

        case STATE_UNFOCUSED_PAGES: {
          pars.auto_rotate = true;
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [60, 0.65, Math.PI * 0.5];
          animator.start({
            init_values: iv,
            end_values: ev,
            time_start: 0,
            time_interval: 0.15,
            sine_interpolation: true,
            onAnimationEnd: () => {
            },
            onAnimationUpdate: (v) => {
              controls.target.set(controls.target.x, v[0], controls.target.z);
              this.setScale(v[1]);
              controls.setPolarAngle(v[2]);
            },
          });
          break;
        }

        case STATE_UNFOCUSED_GALLERY: {
          const timeInt = (this.$store.state.general.transitionName === 'middle-to-bottom') ? 0.1 : 0.4;
          pars.auto_rotate = true;
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [-60, 0.65, Math.PI * 0.5];
          animator.start({
            init_values: iv,
            end_values: ev,
            time_start: 0,
            time_interval: timeInt,
            sine_interpolation: true,
            onAnimationEnd: () => {
            },
            onAnimationUpdate: (v) => {
              controls.target.set(controls.target.x, v[0], controls.target.z);
              this.setScale(v[1]);
              controls.setPolarAngle(v[2]);
            },
          });
          break;
        }

        case STATE_INITIAL: {
          pars.auto_rotate = true;
          this.active = false;
          this.clear();
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [0, 0.5, Math.PI * 0.5];
          animator.start({
            init_values: iv,
            end_values: ev,
            time_start: 0,
            time_interval: 0.4,
            sine_interpolation: true,
            onAnimationEnd: () => {
            },
            onAnimationUpdate: (v) => {
              controls.target.set(controls.target.x, v[0], controls.target.z);
              this.setScale(v[1]);
              controls.setPolarAngle(v[2]);
            },
          });
          break;
        }
        default: {
          break;
        }
      }
      pars.state = state;
    },

    /**
    * returns 2d svg representation of the explorer trajectory.
    */
    toSVG() {
      this.svg = [];
      let t = '<svg height="210" width="210">';
      let initX = 0;
      let initY = 0;
      // t += '<rect width="210" height="210" fill="gray" />';
      // t += '<circle cx="105" cy="105" r="100" stroke="black" stroke-width="1" fill="gray" style="opacity:1" />';
      for (let i = 0; i < explorers.length; i += 1) {
        if (i === this.minTrack) {
          t += '<polyline points="';
          for (let j = 0; j < explorers[i].array.length; j += 6) {
            const x1 = (105 + 0.5 * explorers[i].array[j]).toFixed(2);
            const x2 = (105 - 0.5 * explorers[i].array[j + 2]).toFixed(2);
            this.svg.push([x1, x2]);
            t += `${x1},${x2} `;
            if (j === 0) {
              initX = parseFloat(x1);
              initY = parseFloat(x2);
            }
          }
          t += `" style="fill:none;stroke:${webColors[i]};stroke-width:2" />`;
        // } else { t += '" style="fill:none;stroke:black;opacity:0.1;stroke-width:1" />' }
        }
      }
      t += `<circle cx="${initX}" cy="${initY}" r="8" style="fill:#FFFFFF"></circle>`;
      const triangleAx = initX;
      const triangleAy = initY - 1.5;
      const triangleBx = initX - 2;
      const triangleBy = initY + 2;
      const triangleCx = initX + 2;
      const triangleCy = initY + 2;
      t += `<polygon stroke="#1E1E1E" stroke-width="2" fill="#1E1E1E"
            points="${triangleAx} ${triangleAy} ${triangleBx} ${triangleBy} ${triangleCx} ${triangleCy}"></polygon>`;
      t += '</svg>';
      return t;
    },

    /**
    * setup the animator object to rotate to the latitude, longitude passed as parameter.
    * @param {Object} config
    *   config.lat: latitude
    *   config.lng: longitude
    *   config.zoom: zoom (optional)
    *   config.zoom: camera target (optional)
    */
    rotateTo(config) {
      /* transform lat lng to azimuth polar angles */
      let polar = (1.0 - ((config.lat + 270) / 180.0) % 1) * Math.PI;
      let azimuth = ((config.lng + 90) / 360.0) * 2 * Math.PI;
      while (azimuth < controls.getAzimuthalAngle() - Math.PI) azimuth += Math.PI * 2;
      while (azimuth > controls.getAzimuthalAngle() + Math.PI) azimuth -= Math.PI * 2;
      while (polar < controls.getPolarAngle() - Math.PI * 2) polar += Math.PI * 2;
      while (polar > controls.getPolarAngle() + Math.PI * 2) polar -= Math.PI * 2;

      const iv = [controls.getAzimuthalAngle(), controls.getPolarAngle()];
      const ev = [azimuth, polar];
      if (config.zoom) {
        // console.log(`Zooming from ${this.getScale()} to ${config.zoom}`);
        iv.push(this.getScale());
        ev.push(config.zoom);
      }
      if (config.target) {
        iv.push(controls.target.x, controls.target.y, controls.target.z);
        ev.push(config.target.x, config.target.y, config.target.z);
      }
      animator.start({
        init_values: iv,
        end_values: ev,
        time_start: 0,
        time_interval: config.time,
        sine_interpolation: true,
        onAnimationEnd: () => {
          config.onAnimationEnd();
        },
        onAnimationUpdate: (v) => {
          controls.setAzimuthalAngle(v[0]);
          controls.setPolarAngle(v[1]);
          let i = 2;
          if (config.zoom) {
            this.setScale(v[i]);
            i += 1;
          }
          if (config.target) {
            controls.target.set(v[i], v[i + 1], v[i + 2]);
          }
        },
      });
    },

    /**
    * setup the animator object to rotate to the latitude, longitude passed as parameter.
    * It also reset camera zoom and camera target to default values
    * @param {Object} config
    *   config.lat: latitude
    *   config.lng: longitude
    *   config.date: date to reset
    */
    resetTo(config) {
      let polar = (1.0 - ((config.lat + 270) / 180.0) % 1) * Math.PI;
      let azimuth = ((config.lng + 90) / 360.0) * 2 * Math.PI;
      // controls.setAzimuthalAngle(azimuth-Math.PI*0.5);
      // controls.setPolarAngle(polar);
      while (azimuth < controls.getAzimuthalAngle() - Math.PI) {
        azimuth += Math.PI * 2;
      }
      while (azimuth > controls.getAzimuthalAngle() + Math.PI) {
        azimuth -= Math.PI * 2;
      }

      while (polar < controls.getPolarAngle() - Math.PI * 2) {
        polar += Math.PI * 2;
      }
      while (polar > controls.getPolarAngle() + Math.PI * 2) {
        polar -= Math.PI * 2;
      }
      const iv = [controls.getAzimuthalAngle(), controls.getPolarAngle()];
      const ev = [azimuth, polar];
      // console.log(`Zooming from ${this.getScale()} to ${config.zoom}`);
      iv.push(this.getScale());
      ev.push(INITIAL_ZOOM);
      iv.push(controls.target.x, controls.target.y, controls.target.z);
      ev.push(0, 0, 0);
      iv.push(camera.position.length());
      ev.push(radius * 1.72);
      if (config.date) {
        iv.push(this.startingDate.getTime());
        ev.push(config.date.getTime());
      }
      animator.start({
        init_values: iv,
        end_values: ev,
        time_start: 0,
        time_interval: config.time,
        sine_interpolation: true,
        onAnimationEnd: () => {
          config.onAnimationEnd();
        },
        onAnimationUpdate: (v) => {
          controls.setAzimuthalAngle(v[0]);
          controls.setPolarAngle(v[1]);
          let i = 2;
          this.setScale(v[i]);
          i += 1;
          controls.target.set(v[i], v[i + 1], v[i + 2]);
          camera.position.setLength(v[i + 3]);
          if (config.date) {
            this.startingDate.setTime(v[i + 4]);
          }
        },
      });
    },

    /**
    * Set the scene zoom by scaling the scene.
    * @param {Float} s
    */
    setScale(s) {
      pars.zoom = s;
      scene.scale.set(s, s, s);
      _.each(explorers, (e) => { e.animatingSphere.scale.set(1 / s, 1 / s, 1 / s); });
      selectSphere.scale.set(1 / s, 1 / s, 1 / s);
      labels.setScale(s);
    },

    /**
    * Return scene zoom.
    */
    getScale() {
      return pars.zoom;
    },

    /**
    * Set the explorer to onboard, activating the city labels view.
    * @param {Integer} v
    *   explorer index
    */
    setOnboard(v) {
      pars.onboard = v;
      this.autoMode = true;
      pars.zoom_enabled = !v;
      if (this.visualizationState === STATE_ANIMATION_ACTIVE && v) {
        controls.enableZoom = pars.zoom_enabled;
        controls.enableRotate = pars.zoom_enabled;
      } else {
        controls.enableZoom = true;
        controls.enableRotate = true;
      }
      if (!v) {
        labels.cityLabels.setVisible(v);
      }
    },

    /**
    * Time increment. By increasing the value pars.skip_frame it's possible to skip frame rendering, reducing the computation cost
    * @param {Integer} frames
    * frames to skip
    */
    incrementTime(frames) {
      pars.elapsed_days = Math.max(0, Math.min(16, pars.elapsed_days + frames * pars.speed_d_x_sec / 60.0));
      const tmpDays = Math.ceil(pars.elapsed_days);
      // this.elapsedDays = pars.elapsed_days;
      if (tmpDays !== this.elapsedDays) {
        this.elapsedDays = tmpDays;
      }
    },

    /**
    * animation function. Called 60 times per second, it's responsible for rendering and animating.
    */
    animate() {
      fps += 1;
      /* by setting pars.skip_frame it's possible to reduce computation cost, lowering fps.
      * if pars.skip_frame == 0 -> fps = 60. If == 1  -> fps = 30, if == 2 -> fps = 20  */
      if (timer % (1 + pars.skip_frame) === 0) {
        const frames = 1 + pars.skip_frame;
        this.windsLoaded = windVisualization.update(pars.elapsed_days, frames);
        /* stop if user is mouse selecting */
        if (!this.selecting) {
          /* update animator */
          animator.update(frames * pars.speed_d_x_sec / 60.0);

          /* auto rotate */
          if (pars.auto_rotate && this.animating) {
            controls.setAzimuthalAngle(controls.getAzimuthalAngle() - 0.002 * frames);
          }
          if (pars.move_in_time) { this.incrementTime(); }

          /* sun (point light) position set */
          const d = new Date(this.startingDate);
          d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * pars.elapsed_days);
          earthRotation = Util.getEarthAzimuthRotation(d);
          pointLight.position.set(Math.sin(-earthRotation) * radius * 90, Math.sin(axesRotation) * radius * 90, Math.cos(-earthRotation) * radius * 90);
          if (pars.sun_visible) {
            sunSphere.position.set(pointLight.position.x, pointLight.position.y, pointLight.position.z);
          }

          /* update night map sun position */
          NightMap.update(new THREE.Vector3(pointLight.position.x / 90, pointLight.position.y / 90, pointLight.position.z / 90));

          /* manage viz states */
          switch (pars.state) {
            case STATE_ANIMATION_ACTIVE: {
              const alpha = Math.min(1, pars.elapsed_days / 16.0);
              /* check if trajectory are loaded  for current elapsed days */
              let tl = true;
              for (let i = 0; i < explorers.length; i += 1) { // explorers.length
                tl = tl && explorers[i].setAlpha(alpha);
              }
              this.trajectoryLoaded = tl;

              if (tl) {
                if (!this.interacting) {
                  /* if user is not interacting with the camera update camera and target position */
                  if (pars.onboard) {
                    /* position the camera to a previous explorer position and the camera target to the current one */
                    if (this.animating) labels.cityLabels.update(explorers[this.onboardIndex].animatingSphere.position);
                    const pAlpha = Math.min(1, Math.max(0, alpha - pars.camera_shift));
                    if (explorers[this.onboardIndex].getLength() > 2) {
                      const c = explorers[this.onboardIndex].getPosition(pAlpha);
                      const v = pars.camera_smooth ** frames;
                      const umv = 1 - v;
                      // zoom en
                      if (this.autoMode) {
                        const t = this.getScale() * v + pars.camera_zoom * umv;
                        this.setScale(t);
                      }
                      camera.position.set(
                        camera.position.x * v + umv * c.x * pars.camera_distance,
                        camera.position.y * v + umv * c.y * pars.camera_distance,
                        camera.position.z * v + umv * c.z * pars.camera_distance,
                      );
                      // camera.position.clampLength(radius * 1.35, radius * 5);
                      controls.target.set(
                        controls.target.x * v + umv * explorers[this.onboardIndex].animatingSphere.position.x,
                        controls.target.y * v + umv * explorers[this.onboardIndex].animatingSphere.position.y,
                        controls.target.z * v + umv * explorers[this.onboardIndex].animatingSphere.position.z,
                      );
                    }
                  } else {
                    /* position the camera to the average of all explorers position and the camera target to the earth center */
                    const v = new THREE.Vector3();
                    for (let i = 0; i < explorers.length; i += 1) { // explorers.length
                      v.add(explorers[i].animatingSphere.position);
                    }
                    v.divideScalar(explorers.length);
                    v.setLength(radius * 1.65);
                    const a = pars.camera_smooth ** frames;
                    const uma = 1 - a;
                    controls.target.set(controls.target.x * a, controls.target.y * a, controls.target.z * a);
                    if (this.autoMode) {
                      const t = this.getScale() * a + INITIAL_ZOOM * uma;
                      this.setScale(t);
                      camera.position.set(camera.position.x * a + v.x * uma, camera.position.y * a + v.y * uma, camera.position.z * a + v.z * uma);
                    }
                  }
                }
                if (this.animating) this.incrementTime(frames);
              }
              if (alpha >= 1) { this.visualizationState = STATE_MOVING_TO_DESTINATION; }
              break;
            }
            default:
              break;
          }
        }
        controls.update();
        renderer.render(scene, camera);
        /*
        MULTI SCREEN EXAMPLE CODE
        renderer.clear();
        renderer.autoClear = false;
        camera.aspect = window.innerWidth * 0.5 / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setViewport(window.innerWidth * 0.0, 0, window.innerWidth * 0.5, window.innerHeight * 1);
        renderer.render(scene, camera);
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() + Math.PI);
        renderer.setViewport(window.innerWidth * 0.5, 0, window.innerWidth * 0.5, window.innerHeight * 1);
        renderer.render(scene, camera);
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() - Math.PI);
        */
      }
      timer += 1;

      /* Save the canvas to jpeg after rendering (avoiding glitches) */
      if (this.saving) {
        const canvasLabel = document.getElementById('labels-canvas');
        const saveCanvas = document.createElement('canvas');
        const saveContext = saveCanvas.getContext('2d');
        saveCanvas.width = renderer.domElement.width;
        saveCanvas.height = renderer.domElement.height;

        saveContext.drawImage(renderer.domElement, 0, 0,
          saveCanvas.width, saveCanvas.height);
        saveContext.drawImage(canvasLabel, 0, 0,
          saveCanvas.width, saveCanvas.height);


        saveCanvas.toBlob((blob) => {
          // const file = new File([blob], 'image.png', { type: 'application/octet-stream' });
          // FilseSaver.saveAs(file);
          saveAs(blob, 'image.jpg');
          // const url = window.URL.createObjectURL(blob);
          // const a = document.createElement('a');
          // document.body.appendChild(a);
          // a.style.display = 'none';
          // a.href = url;
          // a.download = 'aerocene-float-predictor-screenshot.jpg';
          // a.click();
          // window.URL.revokeObjectURL(url);
          // document.body.removeChild(a);
          this.saving = false;
          requestAnimationFrame(this.animate);
        }, 'image/jpg', 1);
        return;
      }

      if (this.alive) { /* Needed for webpack hot reload */
        requestAnimationFrame(this.animate);
      }
    },

    /**
    * Resets all the parameters and clear useless buffers. It gets at the beginning and we want to start the simulation again.
    */
    clear() {
      if (downloader) {
        downloader.destroy();
      }
      selectSphere.visible = false;
      this.selectedExplorer = 0;
      this.focusedExplorer = 0;
      downloader = new TrajectoryDataDownloader();
      this.startingDate.setMonth(new Date().getMonth());
      this.startingDate.setDate(new Date().getDate());
      pars.elapsed_days = 0;
      labels.daysLabels.setVisible(false);
      _.each(explorers, (e) => { e.reset(); });
      labels.setVisible(false);
      this.minDist = 10000000000000000;
      this.minTrack = 0;
      this.minTime = 0;
      this.onboardIndex = 0;
      this.elapsed_days = 0;
      this.api_data = [];
      this.setOnboard(false);
    },

    /**
    * Error routines. Set the state to initial to start again.
    */
    error() {
      console.log('ERROR ROUTINES');
      this.visualizationState = STATE_INITIAL;
      animator.stop();
    },

    /**
    * Download the trajectory data for the 8 explorers, create curves using Catmull Rom Curves algorithm and
    * compute explorer movement in altitude based on the angle between the explorer and the sun position (point light)
    */
    downloadMulti() {
      downloader.downloadMulti(departure, destination, pressureLevels[this.initialAltitudeLevel],
        // this.altitudeLevel],
        (data) => { // ON UPDATE
          if (data.mindist < this.minDist) {
            this.minDist = Math.round(data.mindist);
            this.minTime = Math.round(data.mintime) - data.mintrack;
            this.minTrack = data.mintrack;
          }
          this.api_data.push(data.d);
          this.timestamp = data.timestamp.substring(11);
          for (let j = 0; j < explorers.length; j += 1) {
            const pts = [];
            for (let i = j; i < data.d.length; i += 8) { pts.push(Util.latLon2XYZPosition(data.d[i][2], data.d[i][3], radius)); }

            /* increase the number of points using Catmull Rom Curves algorithm */
            const curve = new THREE.CatmullRomCurve3(pts);
            const points = curve.getPoints(CATMULL_NUM_POINTS * (pts.length - 1));

            /* compute explorer movement in altitude based on the angle between the explorer and the sun position (point light) */
            const cdate = new Date(this.startingDate);
            const explorerH = pars.explorer_height_base;
            for (let k = 0; k < points.length - 1; k += 1) {
              const r = Util.getEarthAzimuthRotation(cdate);
              const sunP = new THREE.Vector3(Math.sin(-r) * radius, Math.sin(axesRotation) * radius, Math.cos(-r) * radius);
              const t = points[k];
              const g = sunP.angleTo(t);// Math.max(0,pointLight.position.angleTo(t)/(Math.PI*0.5));
              const s = (Math.PI * 0.5 - g) / (Math.PI * 0.5);

              if (g < Math.PI * 0.45) {
                explorerHS[j] += s * 0.005;
              } else { explorerHS[j] -= 0.0015; }

              explorerHS[j] = Math.min(pars.explorer_height_shift, Math.max(explorerHS[j], 0));
              explorers[j].addDataSample(points[k], explorerH, explorerHS[j]);
              Util.addHours(cdate, 24.0 / (points.length - 1));
            }
          }
        },
        () => { // ON END
          /* set the winning explorer to the one that got closer to the destination. If the flight is planned, use the one that went farther */
          if (this.flightType !== 'planned') {
            let maxDistance = -1;
            let winningIndex = 0;
            _.each(explorers, (e, index) => {
              if (e.getTotalDistance() > maxDistance) {
                maxDistance = e.getTotalDistance();
                winningIndex = index;
              }
            });
            this.minDist = maxDistance;
            this.minTrack = winningIndex;
            this.minTime = 16 - this.minTrack;
          }

          this.winningExplorerData = {
            minDist: this.minDist,
            minTime: this.minTime,
            departureDate: this.startingDate,
            svg: this.toSVG(),
          };

          /* Fill a json with the trajectory data and push to server through post request. This will add it to the gallery */

          const data = [];
          for (let i = 0; i < this.api_data.length; i += 1) {
            for (let j = this.minTrack; j < this.api_data[i].length - 8; j += 8) {
              data.push(this.api_data[i][j][2]);
              data.push(this.api_data[i][j][3]);
            }
          }
          const departureDate = new Date(this.startingDate);// this.valueOf()
          departureDate.setDate(departureDate.getDate() + this.minTrack);
          const trajectory = {
            departure: {
              city: departure.city,
              country: departure.country,
              coordinates: {
                latitude: departure.lat,
                longitude: departure.lng,
              },
            },
            min_dist: this.minDist,
            min_time: this.minTime,
            departure_date: departureDate.toISOString(),
            speed: explorers[this.minTrack].avgSpeed,
            altitude: altitudeLevels[this.initialAltitudeLevel],
            distance: explorers[this.minTrack].getTotalDistance() * 0.001,
            path: data,
            svg: this.svg,
            explorerIndex: this.minTrack,
          };
          if (this.flightType === 'planned') {
            trajectory.destination = {
              city: destination.city,
              country: destination.country,
              coordinates: {
                latitude: destination.lat,
                longitude: destination.lng,
              },
            };
          }
          const s = JSON.stringify(trajectory);
          if (s !== this.previousTrajectoryData) {
            fetch('http://floatpredictor.aerocene.org/scripts/api/insert.php', {
              method: 'post',
              body: s,
            }).then(
              response => response.json(),
            ).then((jsonData) => {
              // console.log('***********************');
              // console.log(jsonData);
              this.trajectoryId = jsonData.id;
            }).catch((r) => {
              console.log('Downloader error');
              console.log(r);
            });
          }
          this.previousTrajectoryData = s;
        },
        (e) => { // ON ERROR
          console.log(e);
          this.error();
        },
      );
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";

.main-visualization {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  font-style: 'Colfax-Medium';
}

#labels{
  width: 100%;
  height: 100%;
  position:relative;;
  overflow: hidden;
  font-size: 10px;
}

.canvas{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
  height:100%;
}

.label{
  position:absolute;
  z-index:2;
  /*  transition: transform 0.05s;
  -moz-transition: transform 0.05s;
  -ms-transition: transform 0.05s;
  -o-transition: transform 0.05s;
  -webkit-transition: transform 0.05s;
  */
  transition:         opacity 0.3s 0.05s ease;
  -moz-transition:    opacity 0.3s 0.05s ease;
  -ms-transition:     opacity 0.3s 0.05s ease;
  -o-transition:      opacity 0.3s 0.05s ease;
  -webkit-transition: opacity 0.3s 0.05s ease;
}

.labeldata{
}

.arrow{
  margin-top:-1px;
  width: 0;
  height: 0;
  border-top: 15px solid white;
  border-right: 15px solid transparent;
}

.restart-button{
  background: transparent;
  border: none;
  color:#9B9B9B;
  padding-top: 18px;
  font-size:18px;
  padding-left: 0px;
}
#departure-label, #destination-label{
  background-color: $lightBlack;
  border-radius: 15%;
  padding: 2px 5px 2px 5px;
  margin-left: -8px;
  z-index:6;
}
.label img{
  margin-right: 4px;
}
.dg .c input[type=text]{
  height: 100%;
}

#labels-canvas {
  pointer-events: none;
  user-select: none;
  background:transparent;
  z-index:3;
  width:100%;
  height:100%;
  position:absolute;
  left:0px;
  top:0px;
}
</style>
