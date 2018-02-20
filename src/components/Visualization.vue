
<template>
  <div id ="visualization" class="main-visualization">
    <div id="labels">
      <modal-winner-explorer>
        <div class="message" slot="message">
          The Aerocene Sculpture that left from <b>{{departure.city}}</b>
          on <b>{{formatDate(winningExplorerData.departureDate)}}</b>
          arrived within <b>{{winningExplorerData.minDist}}km</b>
          from <b>{{destination.city}}</b> in <b>{{winningExplorerData.minTime}} days.</b>
        </div>
        <div slot="image" id="imgel"></div>
      </modal-winner-explorer>
      <div class="label" id="departure-label">
        <img style=""
        src="../assets/icons/departure_arrow_up.svg"/>
        {{departure.city}}
      </div>
      <div class="label" id="destination-label">
        <img style=""
        src="../assets/icons/destination_arrow_down.svg"/>
        {{destination.city}}
      </div>
    </div>
    <Loading v-if="(loading < 1.0 || saving)"></Loading>
  </div>
</template>
<script>
/* eslint-disable no-mixed-operators, no-console, no-param-reassign, max-len, one-var */

import _ from 'lodash';
import { saveAs } from 'file-saver';
import Loading from './Loading';
import modalWinnerExplorer from './parts/ModalWinnerExplorer.Vue';
import Util from './visualization/Util';
import Label from './visualization/Label';
import NightMap from './visualization/NightMap';
import animator from './visualization/Animator';
import Explorer from './visualization/Explorer';
import WindVisualization from './visualization/WindVisualization';
import downloader from './visualization/WindDataDownloader';
import Cities from './visualization/Cities';


import colorMap from '../assets/img/colormap/4096.jpg';
import colorMapA from '../assets/img/colormap/4096A.jpg';
import colorMapB from '../assets/img/colormap/4096B.jpg';
import colorMapC from '../assets/img/colormap/4096C.jpg';
import colorMapD from '../assets/img/colormap/4096D.jpg';

import nightModeMap from '../assets/img/nightModeMap/4096.jpg';
import bumpMap from '../assets/img/bumpmap/8192.jpg';

const STATE_IDLE = 0;
const STATE_MOVING_TO_DEPARTURE = 1;
const STATE_ANIMATION_ACTIVE = 2;
const STATE_MOVING_TO_DESTINATION = 3;
const STATE_ANIMATION_END = 4;
const STATE_UNFOCUSED = 5;
const STATE_UNFOCUSED_PAGES = 6;
const STATE_UNFOCUSED_GALLERY = 7;
const STATE_INITIAL = 8;


const THREE = require('three');
const OrbitControls = require('../../custom_modules/three-orbit-controls')(THREE);

const CATMULL_NUM_POINTS = 3;
const radius = 200;
// const EARTH_RADIUS = 6378.137
// const SCENE_SCALE = EARTH_RADIUS / radius
const INITIAL_ZOOM = 0.5;
const axesRotation = Util.getEarthPolarRotation(new Date());
const colors = [0x003769, 0x2e6a9c, 0x0095d7, 0x587a98, 0x7eafd4, 0xb9e5fb, 0x656868, 0xffffff];

// eslint-disable-next-line
let bumpTexture, colorTexture, nightMapTexture, container, renderer, scene, camera, controls, gui, pointLight, ambientLight, earthSphere, sunSphere, departureLabel, destinationLabel, earthRotation, loaded, timer, explorers, allExplorers, explorerHS, fps, daysLabels, cityLabels;

// GUI PARAMETERS
const pars = {
  // GENERAL
  active: false,
  winds: 0,
  fps: 0,
  state: 0,
  speed_d_x_sec: 0.05, // modify for dev
  move_in_time: false,
  pan_x: 0,
  pan_y: 0,
  zoom: INITIAL_ZOOM,
  onboard: false,
  skip_frame: 1, // modify for dev
  camera_smooth: 0.993,
  camera_distance: 1.5,
  camera_shift: 0.07,
  camera_zoom: 0.94,
  sun_visible: false,
  zoom_enabled: true,
  // MATERIAL
  use_bump: true, // modify for dev
  use_nightmap: true,
  nightmap_intensity: 0.9,
  nightmap_threshold: 0.7,
  nightmap_color: '#ffffff',
  bump_scale: 0.5,
  // LIGHT
  spot_light_intensity: 1,
  sun_light_color: '#ffffff',
  ambient_light_intensity: 0.09,
  ambient_light_color: '#acdfef',
  auto_rotate: false,
  // EXPLORER
  elapsed_days: 0.001,
  explorer_height_base: 0.025,
  explorer_height_shift: 0.025,
  layers: {
    wind: {
      visible: false,
      mapping: 0.0,
      opacity_mapping: false,
      threshold: 44.0,
      start_color: '#000000',
      end_color: '#ffffff',
      opacity: 0.7,
      magnitude: 0.25,
      step: 1,
      precision: 2,
    },
  },
  colorMap: 'MAP A',
};

export default {
  name: 'visualization',
  computed: {
    activeExplorers() { return this.$store.state.flightSimulator.activeExplorers; },
    focusedExplorer() { return this.$store.state.flightSimulator.focusedExplorer; },
    flightType() { return this.$store.state.flightSimulator.flightType; },
    active: {
      get() {
        return this.$store.state.flightSimulator.isActive;
      },
      set(active) {
        this.$store.commit('flightSimulator/setActive', active);
      },
    },
    departure: {
      get() {
        return this.$store.state.flightSimulator.departure;
      },
      set(departure) {
        this.$store.commit('flightSimulator/setDeparture', departure);
      },
    },
    destination: {
      get() {
        return this.$store.state.flightSimulator.destination;
      },
      set(destination) {
        this.$store.commit('flightSimulator/setDestination', destination);
      },
    },
    coordinatesValid: {
      get() {
        return this.$store.state.flightSimulator.coordinatesValid;
      },
      set(v) {
        this.$store.commit('flightSimulator/setCoordinatesValid', v);
      },
    },
    elapsedDays: {
      get() {
        return this.$store.state.flightSimulator.elapsedDays;
      },
      set(value) {
        this.$store.commit('flightSimulator/setElapsedDays', value);
      },
    },
    playing: {
      get() {
        return this.$store.state.flightSimulator.isPlaying;
      },
      set(value) {
        this.$store.commit('flightSimulator/setPlaying', value);
      },
    },
    saving: {
      get() {
        return this.$store.state.flightSimulator.isSaving;
      },
      set(value) {
        this.$store.commit('flightSimulator/setSaving', value);
      },
    },
    loading: {
      get() {
        return this.$store.state.flightSimulator.loading;
      },
      set(value) {
        this.$store.commit('flightSimulator/setLoading', value);
      },
    },
    winningExplorerData: {
      get() {
        return this.$store.state.flightSimulator.winningExplorerData;
      },
      set(value) {
        this.$store.commit('flightSimulator/setWinningExplorerData', value);
      },
    },
    focusedExplorerSpeed: {
      get() {
        return this.$store.state.flightSimulator.focusedExplorerSpeed;
      },
      set(s) {
        this.$store.commit('flightSimulator/setFocusedExplorerSpeed', s);
      },
    },
    focusedExplorerDistance: {
      get() {
        return this.$store.state.flightSimulator.focusedExplorerDistance;
      },
      set(d) {
        this.$store.commit('flightSimulator/setFocusedExplorerDistance', d);
      },
    },
    visualizationState: {
      get() {
        return this.$store.state.flightSimulator.visualizationState;
      },
      set(v) {
        this.$store.commit('flightSimulator/setVisualizationState', v);
      },
    },
    winds: {
      get() {
        return this.$store.state.flightSimulator.winds;
      },
      set(v) {
        this.$store.commit('flightSimulator/setWinds', v);
      },
    },
  },
  watch: {
    active(isActive) {
      if (isActive) {
        this.start();
        _.each(explorers, () => {
          // todo: start explorers and communicate to the dashboard

        });
      }
    },
    focusedExplorer(explorerId) {
      if (explorerId === 0) {
        this.setOnboard(false);
      } else {
        this.onboardIndex = explorerId - 1;
        this.setOnboard(true);
      }
    },
    flightType(ft) {
      explorers = [];
      if (ft === 'planned') {
        _.each(allExplorers, (e) => {
          explorers.push(e);
        });
      } else {
        this.minTrack = 0;
        explorers.push(allExplorers[0]);
      }
    },
    departure(departure) {
      console.log(`Departure: ${departure.lat} ${departure.lng}`);
      const t = Util.latLon2XYZPosition(departure.lat, departure.lng, radius);
      departureLabel.setPosition(t);
      // const polar = (1.0 - ((this.departure.lat + 270) / 180.0) % 1) * Math.PI;
      const azimuth = ((this.departure.lng + 90) / 360.0) * 2 * Math.PI;
      // controls.setAzimuthalAngle(azimuth - Math.PI * 0.5);
      // controls.setPolarAngle(polar);
      const ts = (-earthRotation - azimuth) / (Math.PI * 2) % 1;
      this.startingDate.setTime(this.startingDate.getTime() + (ts * 24.0 * 60 * 60 * 1000));
      const r = Util.getEarthAzimuthRotation(this.startingDate);
      const sunP = new THREE.Vector3(Math.sin(-r) * radius, Math.sin(axesRotation) * radius, Math.cos(-r) * radius);
      const angle = departureLabel.getPosition().angleTo(sunP);
      this.coordinatesValid = angle < 1.5;
      console.log(`Angle: ${angle} <= 1.5 ?`);
    },
    destination(destination) {
      console.log(`Destination: ${destination.lat} ${destination.lng}`);
      const t = Util.latLon2XYZPosition(destination.lat, destination.lng, radius);
      destinationLabel.setPosition(t);
    },
    visualizationState(s) {
      this.setState(s);
    },
    winds(w) {
      switch (w) {
        case 0: // NONE
          WindVisualization.lines.visible = false;
          break;
        case 1: // B/W
          WindVisualization.setColor(new THREE.Color('#000000'), new THREE.Color('#ffffff'));
          WindVisualization.setMapping(1);
          WindVisualization.setOpacityMapping(true);
          WindVisualization.lines.visible = true;
          break;
        case 2: // COLOR
          WindVisualization.setColor(new THREE.Color('#073a9e'), new THREE.Color('#f80000'));
          WindVisualization.setMapping(2);
          WindVisualization.setOpacityMapping(false);
          WindVisualization.lines.visible = true;
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      pathId: 0,
      alive: true,
      speed: 0,
      minDist: 0,
      minTime: 0,
      minTrack: 0,
      onboardIndex: 0,
      departureDay: 1,
      departureMonth: 'January',
      distance2Target: 0,
      distanceTraveled: 0,
      startingDate: new Date(),
    };
  },

  components: {
    Loading,
    modalWinnerExplorer,
  },

  mounted() {
    /* INIT VARIABLES */
    earthRotation = 0;
    loaded = 0;
    timer = 0;
    fps = 0;
    explorers = [];
    allExplorers = [];
    explorerHS = [0, 0, 0, 0, 0, 0, 0, 0];
    this.initVis();
    this.addDebugTools();
  },

  beforeDestroy() {
    console.log('unmounted');
    this.alive = false;
    if (gui) gui.destroy();
  },

  methods: {
    restart() {
      this.start();
    },

    initVis() {
      this.initTHREE();
      this.initStarfield();
      this.setupExplorers();
      this.initNightMap();
      this.initLabels();
      this.setScale(INITIAL_ZOOM);
      this.visualizationState = STATE_INITIAL;
      this.initWindVisualization();
      this.initFPSChecker();
      // Setting default destination / departure  // modify for dev
      this.destination = {
        lat: 35.652832,
        lng: 139.839478,
        city: 'Tokio',
        country: 'Japan',
      };
      this.departure = {
        lat: 52.520645,
        lng: 13.409779,
        city: 'Berlin',
        country: 'Germany',
      };
      this.animate();
    },

    initFPSChecker() {
      const COUNTDOWN = 3;
      setTimeout(() => {
        this.lastCheck = new Date();
        this.lowFPS = COUNTDOWN;
        this.highFPS = 0;
        setInterval(
          () => {
            const now = new Date();
            const diff = now - this.lastCheck;
            this.lastCheck = now;
            if (Math.abs(diff - 1000) < 10 && fps > 5 && document.hasFocus()) { // IF IT WAS 1 sec
              if (60 - fps > 6) {
                this.lowFPS -= 1;
                this.highFPS = 0;
                if (this.lowFPS <= 0) {
                  if (pars.skip_frame < 3) {
                    pars.skip_frame += 1;
                    console.log(`-------------------------- Setting skip to ${pars.skip_frame}`);
                  } else {
                    const lpr = pars.pixel_ratio;
                    if (fps < 40) {
                      pars.pixel_ratio = Math.max(1, pars.pixel_ratio - 1.0);
                    } else {
                      pars.pixel_ratio = Math.max(1, pars.pixel_ratio - 0.5);
                    }
                    if (pars.pixel_ratio !== lpr) {
                      renderer.setPixelRatio(pars.pixel_ratio);
                      console.log(`--------------------------------- Setting PixelRatio to ${pars.pixel_ratio}`);
                    }
                  }
                  this.lowFPS = COUNTDOWN;
                }
              } else {
                if (fps > 59) {
                  this.highFPS += 1;
                } else {
                  this.highFPS = 0;
                }
                if (this.highFPS > 7) {
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
                this.lowFPS = COUNTDOWN;
              }
            }
            pars.fps = fps;
            fps = 0;
            if (pars.onboard) {
              this.focusedExplorerSpeed = explorers[this.onboardIndex].getSpeed().toFixed(2);
              this.focusedExplorerDistance = explorers[this.onboardIndex].getDistance().toFixed(0);
              const coord = Util.XYZ2LatLon(explorers[this.onboardIndex].animatingSphere.position);
              const cities = Cities.get(coord);
              for (let i = 0; i < cityLabels.length; i += 1) {
                if (i < cities.length) {
                  if (this.rotationIndex === undefined) {
                    this.rotationIndex = 0;
                  }
                  this.rotationIndex = this.rotationIndex % cityLabels.length;
                  cityLabels[this.rotationIndex].setCity(cities[i]);
                  this.rotationIndex += 1;
                }
              }
            }
          },
          1000,
        );
      }, 4000);
    },

    initNightMap() {
      NightMap.init(radius, scene, nightMapTexture);
      NightMap.setVisible(pars.use_nightmap);
      NightMap.setIntensity(pars.nightmap_intensity);
      NightMap.setThreshold(pars.nightmap_threshold);
      NightMap.setColor(pars.nightmap_color);
    },

    initLabels() {
      const departureSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.005, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      scene.add(departureSphere);
      departureLabel = new Label(scene, camera, departureSphere, document.getElementById('departure-label'), false);

      const destinationSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.005, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      scene.add(destinationSphere);
      destinationLabel = new Label(scene, camera, destinationSphere, document.getElementById('destination-label'), false);

      cityLabels = [];
      Cities.init();
      for (let i = 0; i < 8; i += 1) {
        const el = document.createElement('div');
        el.classList.add('label');
        document.getElementById('labels').appendChild(el);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.001, 5, 5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        sphere.visible = false;
        scene.add(sphere);
        // class="label"
        cityLabels.push(new Label(scene, camera, sphere, el, true));
      }
      daysLabels = [];
      for (let i = 0; i < 16; i += 1) {
        const el = document.createElement('div');
        el.classList.add('label');
        el.classList.add('days-label');
        document.getElementById('labels').appendChild(el);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.002, 5, 5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        sphere.visible = false;
        scene.add(sphere);
        // class="label"
        daysLabels.push(new Label(scene, camera, sphere, el, false));
      }
    },

    initWindVisualization() {
      WindVisualization.init(radius * 1.02);
      const urls = [];
      for (let i = 0; i < 16; i += 1) {
        urls.push(`static/data/gfs/windjson/${i * 24}.json`);
      }
      WindVisualization.setData(urls, 0,
        (v) => { console.log(`Wind data download: ${1 + v}/16`); },
        () => { console.log('Wind data download: finished'); },
      );
      WindVisualization.lines.visible = pars.layers.wind.visible;
      WindVisualization.lines.material.color = new THREE.Color(pars.layers.wind.color);
      WindVisualization.setOpacity(pars.layers.wind.opacity);
      WindVisualization.setMagnitude(pars.layers.wind.magnitude);
      WindVisualization.setMapping(pars.layers.wind.mapping);
      WindVisualization.setOpacityMapping(pars.layers.wind.opacity_mapping);
      WindVisualization.setThreshold(pars.layers.wind.threshold);

      WindVisualization.precision = pars.layers.wind.precision;
      scene.add(WindVisualization.lines);
    },

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
        // create a particle with random
        const r = 1000 + Math.random() * 1000;
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
      const particleSystem = new THREE.Points(
        particles,
        pMaterial,
      );
      // add it to the scene
      scene.add(particleSystem);
    },

    setupExplorers() {
      for (let i = 0; i < 8; i += 1) {
        const explorer = new Explorer(scene, i * 8 * CATMULL_NUM_POINTS, CATMULL_NUM_POINTS);
        explorer.line.material.color = new THREE.Color(colors[i]);
        explorer.animatingSphere.material.color = new THREE.Color(colors[i]);
        allExplorers.push(explorer);
        explorers.push(explorer);
      }
    },

    initTHREE() {
      this.loadTextures();
      // renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true, // pars.antialias,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000);
      container = document.getElementById('visualization');
      renderer.domElement.id = 'canvas';
      container.appendChild(renderer.domElement);
      pars.pixel_ratio = Math.min(2, window.devicePixelRatio);
      renderer.setPixelRatio(pars.pixel_ratio);
      this.renderer = renderer;
      // scene
      scene = new THREE.Scene();
      // scene.fog = new THREE.Fog( 0x333333, 0.0001 );
      // camera
      camera = new THREE.PerspectiveCamera(40, renderer.getSize().width / renderer.getSize().height, 0.1, 10000);
      camera.position.set(0, radius * 0.25, radius * 1.7);
      // (camera) controls
      controls = new OrbitControls(camera, renderer.domElement);
      // controls.autoRotate=pars.auto_rotate;
      controls.dampingFactor = 0.017;
      controls.autoRotateSpeed = 1;
      controls.enablePan = false;
      controls.zoomSpeed = 0.1;
      controls.enableZoom = pars.zoom_enabled;
      controls.constraint.scene = scene;
      controls.addEventListener('change', this.updateLabels);
      controls.addEventListener('start', () => { this.interacting = true; this.autoMode = false; }, false);
      controls.addEventListener('end', () => { this.interacting = false; }, false);
      controls.addEventListener('scale', () => { this.setScale(scene.scale.x); }, false);

      // light
      pointLight = new THREE.PointLight(pars.sun_light_color);
      pointLight.intensity = pars.spot_light_intensity;
      scene.add(pointLight);
      ambientLight = new THREE.AmbientLight(pars.ambient_light_color);
      ambientLight.intensity = pars.ambient_light_intensity;
      scene.add(ambientLight);

      // objects
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
      console.log(`${earthSphere.castShadow},${renderer.castShadow} ${pointLight.castShadow} ${ambientLight.castShadow}`);
      if (pars.use_bump) { earthSphere.material.bumpMap = bumpTexture; } else { earthSphere.material.bumpMap = undefined; }
      earthSphere.material.bumpScale = pars.bump_scale;

      earthSphere.material.needsUpdate = true;

      sunSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 2, 20, 20), new THREE.MeshBasicMaterial({ color: 0xFFE893 }));
      sunSphere.visible = pars.sun_visible;
      scene.add(sunSphere);

      // events
      window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, false);
    },

    loadTextures() {
      // textures
      console.log('loading textures');
      const afterLoad = () => {
        this.loading += 0.34;
        console.log(`loading: ${this.loading}`);
      };
      bumpTexture = new THREE.TextureLoader().load(bumpMap, () => { console.log('bumb loaded'); afterLoad(); });
      colorTexture = new THREE.TextureLoader().load(colorMap, () => { console.log('color loaded'); afterLoad(); });
      nightMapTexture = new THREE.TextureLoader().load(nightModeMap, () => { console.log('alpha loaded'); afterLoad(); });
    },

    updateLabels() {
      if (pars.onboard) {
        for (let i = 0; i < cityLabels.length; i += 1) {
          cityLabels[i].updatePosition();
        }
      }
      for (let i = 0; i < daysLabels.length; i += 1) {
        daysLabels[i].updatePosition();
      }
      destinationLabel.updatePosition();
      departureLabel.updatePosition();
    },

    start() {
      this.visualizationState = STATE_IDLE;
      this.visualizationState = STATE_MOVING_TO_DEPARTURE;
    },

    initGUI() {
      const general = gui.addFolder('general');
      general.add(pars, 'active').onChange(() => {
        this.start();
      });
      general.add(pars, 'state', 0, 10).step(1).listen().onChange((value) => { this.visualizationState = value; });
      general.add(pars, 'elapsed_days', 0.0, 16.0).listen();
      general.add(pars, 'auto_rotate');// .onChange(function(value) {controls.autoRotate=value;});
      general.add(pars, 'sun_visible').onChange((value) => { sunSphere.visible = value; });
      general.add(pars, 'move_in_time');
      general.add(pars, 'speed_d_x_sec', 0, 2);
      general.add(pars, 'pixel_ratio', 1, 3).listen().onChange((value) => { renderer.setPixelRatio(value); });
      general.add(pars, 'skip_frame', 0, 60).step(1).listen();
      general.add(pars, 'fps', 0, 60).listen();
      general.add(pars, 'winds', 0, 2).step(1).listen().onChange((value) => { this.winds = value; });

      general.add(controls.target, 'x', -1000.0, 1000.0).listen().onChange(() => {
        controls.update();
      });
      general.add(controls.target, 'y', -1000.0, 1000.0).listen().onChange(() => {
        controls.update();
      });
      general.add(pars, 'zoom', 0.1, 2.0).listen().onChange((value) => { console.log('changed'); this.setScale(value); });
      general.add(pars, 'zoom_enabled').onChange((value) => { controls.enableZoom = value; });
      const onboard = gui.addFolder('onboard');
      onboard.add(pars, 'onboard');
      onboard.add(pars, 'camera_smooth', 0.9, 1);
      onboard.add(pars, 'camera_distance', 1.0, 1.5);
      onboard.add(pars, 'camera_shift', 0, 0.5);
      const materialf = gui.addFolder('material');
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

      const lights = gui.addFolder('lights');
      lights.addColor(pars, 'sun_light_color').onChange((value) => { pointLight.color = new THREE.Color(value); });
      lights.add(pars, 'spot_light_intensity', 0, 10).onChange((value) => { pointLight.intensity = value; });
      lights.addColor(pars, 'ambient_light_color').onChange((value) => { ambientLight.color = new THREE.Color(value); });
      lights.add(pars, 'ambient_light_intensity', 0, 10).onChange((value) => { ambientLight.intensity = value; });

      const layers = gui.addFolder('layers');
      const wind = layers.addFolder('wind');
      wind.add(pars.layers.wind, 'visible').onChange((value) => { WindVisualization.lines.visible = value; });
      wind.addColor(pars.layers.wind, 'start_color').onChange(() => { WindVisualization.setColor(new THREE.Color(pars.layers.wind.start_color), new THREE.Color(pars.layers.wind.end_color)); });
      wind.addColor(pars.layers.wind, 'end_color').onChange(() => { WindVisualization.setColor(new THREE.Color(pars.layers.wind.start_color), new THREE.Color(pars.layers.wind.end_color)); });

      wind.add(pars.layers.wind, 'mapping', { 'NO MAPPING': 0.0, 'RGB MAPPING': 1.0, 'HUE MAPPING': 2.0 }).onChange((v) => { WindVisualization.setMapping(v); });
      wind.add(pars.layers.wind, 'opacity_mapping').onChange((value) => { WindVisualization.setOpacityMapping(value); });
      wind.add(pars.layers.wind, 'threshold', 0, 200).onChange((value) => { WindVisualization.setThreshold(value); });
      wind.add(pars.layers.wind, 'opacity', 0, 1).onChange((value) => { WindVisualization.setOpacity(value); });
      wind.add(pars.layers.wind, 'magnitude', 0, 3).onChange(() => { WindVisualization.setMagnitude(pars.layers.wind.magnitude); });
      wind.add(pars.layers.wind, 'precision', 0, 5).step(1).onChange((value) => { WindVisualization.precision = value; });
      gui.close();
    },

    addDebugTools() {
      // eslint-disable-next-line
      const GUI = require('../../custom_modules/dat.gui/build/dat.gui.min.js').GUI;
      gui = new GUI({ width: 400 });
      this.initGUI();
    },

    setState(state) {
      console.log(`Setting state: ${state}`);
      switch (state) {
        case STATE_IDLE: {
          pars.auto_rotate = false;
          this.clear();
          break;
        }
        case STATE_MOVING_TO_DEPARTURE: { // MOVING TO DEPARTURE POINT
          this.clear();
          departureLabel.setVisible(true);
          if (this.flightType === 'planned') {
            destinationLabel.setVisible(true);
          }
          pars.auto_rotate = false;
          this.downloadMulti();
          // this.rotateTo({ lat: this.departure.lat, lng: this.departure.lng, time: 0.5, target: new THREE.Vector3(0, 0, 0), zoom: INITIAL_ZOOM, onAnimationEnd: () => { this.visualizationState = STATE_ANIMATION_ACTIVE; } });
          this.resetTo({ lat: this.departure.lat, lng: this.departure.lng, time: 0.5, onAnimationEnd: () => { this.visualizationState = STATE_ANIMATION_ACTIVE; } });
          break;
        }
        case STATE_ANIMATION_ACTIVE: {
          pars.auto_rotate = false;
          break;
        }
        case STATE_MOVING_TO_DESTINATION: {
          pars.auto_rotate = false;
          // FADE IN ONLY THE MIN TRACK
          for (let i = 0; i < explorers.length; i += 1) {
            if (i !== this.minTrack) {
              explorers[i].lineMaterial.setOpacity(0.25, 1, () => {});
            }
          }

          const i = this.minTrack;
          explorers[i].mesh.visible = true;
          explorers[i].segments.visible = true;
          explorers[i].lineSegmentMaterial.setOpacity(0.2, 2);
          explorers[i].facesMaterial.setOpacity(0.15, 2);

          for (let j = 0; j < cityLabels.length; j += 1) {
            cityLabels[j].setVisible(false, true);
          }
          // GO TO DESTINATION POINT
          const d = Util.XYZ2LatLon(explorers[this.minTrack].animatingSphere.position);// explorers[this.minTrack].destination;
          this.resetTo({ lat: d.lat, lng: d.lng, time: 1.0, onAnimationEnd: () => { this.visualizationState = STATE_ANIMATION_END; } });

          for (let j = this.minTrack + 1; j <= daysLabels.length; j += 1) {
            const dt = new Date();// this.valueOf()
            dt.setDate(dt.getDate() + j);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const text = `${dt.getDate()} ${monthNames[dt.getMonth()]}`;
            daysLabels[j - 1].set(text, explorers[this.minTrack].getPosition(j / 16.0));
            daysLabels[j - 1].updatePosition();
          }
          break;
        }
        case STATE_ANIMATION_END: {
          pars.auto_rotate = false;
          this.active = false;
          const dt = new Date(this.startingDate);// this.valueOf()
          dt.setDate(dt.getDate() + this.minTrack);
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          this.departureDay = dt.getDate();
          this.departureMonth = monthNames[dt.getMonth()];
          break;
        }
        case STATE_UNFOCUSED: {
          pars.auto_rotate = false;
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [150, 0.8, Math.PI * 0.5];
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
              controls.update();
            },
          });
          break;
        }
        case STATE_UNFOCUSED_PAGES: {
          pars.auto_rotate = false;
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [90, 0.8, Math.PI * 0.5];
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
              controls.update();
            },
          });
          break;
        }
        case STATE_UNFOCUSED_GALLERY: {
          pars.auto_rotate = false;
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [-100, 0.8, Math.PI * 0.5];
          animator.start({
            init_values: iv,
            end_values: ev,
            time_start: 0,
            time_interval: 0.1,
            sine_interpolation: true,
            onAnimationEnd: () => {
            },
            onAnimationUpdate: (v) => {
              controls.target.set(controls.target.x, v[0], controls.target.z);
              this.setScale(v[1]);
              controls.setPolarAngle(v[2]);
              controls.update();
            },
          });
          break;
        }
        case STATE_INITIAL: {
          pars.auto_rotate = true;
          this.clear();
          const iv = [controls.target.y, this.getScale(), controls.getPolarAngle()];
          const ev = [150, 0.8, Math.PI * 0.5];
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
              controls.update();
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

    toSVG() {
      this.svg = [];
      let t = '<svg height="210" width="210">';
      t += '<rect width="210" height="210" fill="gray" />';
      t += '<circle cx="105" cy="105" r="100" stroke="black" stroke-width="1" fill="gray" style="opacity:1" />';
      for (let i = 0; i < explorers.length; i += 1) {
        if (i === this.minTrack) {
          t += '<polyline points="';
          for (let j = 0; j < explorers[i].array.length; j += 6) {
            const x1 = (105 + 0.5 * explorers[i].array[j]).toFixed(2);
            const x2 = (105 - 0.5 * explorers[i].array[j + 2]).toFixed(2);
            this.svg.push([x1, x2]);
            t += `${x1},${x2} `;
          }
          t += '" style="fill:none;stroke:black;stroke-width:1" />';
        // } else { t += '" style="fill:none;stroke:black;opacity:0.1;stroke-width:1" />' }
        }
      }
      t += '</svg>';
      return t;
    },

    rotateTo(config) {
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
      // controls.update();
      const iv = [controls.getAzimuthalAngle(), controls.getPolarAngle()];
      const ev = [azimuth, polar];
      if (config.zoom) {
        console.log(`Zooming from ${this.getScale()} to ${config.zoom}`);
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
          controls.update();
        },
      });
    },

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
      // controls.update();
      const iv = [controls.getAzimuthalAngle(), controls.getPolarAngle()];
      const ev = [azimuth, polar];
      console.log(`Zooming from ${this.getScale()} to ${config.zoom}`);
      iv.push(this.getScale());
      ev.push(INITIAL_ZOOM);
      iv.push(controls.target.x, controls.target.y, controls.target.z);
      ev.push(0, 0, 0);
      iv.push(camera.position.length());
      ev.push(radius * 1.72);
      console.log(camera.position);
      console.log(`${camera.position.length()} * ${radius * 1.72}`);
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
          i += 1;
          this.setScale(v[2]);
          // console.log(v[2])
          controls.target.set(v[i], v[i + 1], v[i + 2]);
          camera.position.setLength(v[i + 3]);
          controls.update();
        },
      });
    },
    setScale(s) {
      pars.zoom = s;
      scene.scale.set(s, s, s);
      for (let i = 0; i < explorers.length; i += 1) {
        explorers[i].animatingSphere.scale.set(1 / s, 1 / s, 1 / s);
      }
      // departureSphere.scale.set(2.0 - s, 2.0 - s, 2.0 - s);
      // destinationSphere.scale.set(2.0 - s, 2.0 - s, 2.0 - s);
      departureLabel.getAnchorObject().scale.set(0.5 / s, 0.5 / s, 0.5 / s);
      destinationLabel.getAnchorObject().scale.set(0.5 / s, 0.5 / s, 0.5 / s);
    },
    getScale() {
      return pars.zoom;
    },

    setOnboard(v) {
      pars.onboard = v;
      this.autoMode = true;
      if (!v) {
        for (let j = 0; j < cityLabels.length; j += 1) {
          cityLabels[j].setVisible(v, true);
        }
      }
    },

    incrementTime() {
      pars.elapsed_days = Math.max(0, Math.min(16, pars.elapsed_days + pars.speed_d_x_sec / 60.0));
      const tmpDays = Math.ceil(pars.elapsed_days);
      // this.elapsedDays = pars.elapsed_days;
      if (tmpDays !== this.elapsedDays) {
        this.elapsedDays = tmpDays;
      }
    },

    animate() {
      if (this.loading >= 1 && this.playing) {
        fps += 1;
        WindVisualization.update(pars.elapsed_days);
        animator.update(pars.speed_d_x_sec / 60.0);
        if (pars.auto_rotate) {
          controls.setAzimuthalAngle(controls.getAzimuthalAngle() + 0.002);
          controls.update();
        }
        if (pars.move_in_time) { this.incrementTime(); }

        const d = new Date(this.startingDate);//
        d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * pars.elapsed_days);
        earthRotation = Util.getEarthAzimuthRotation(d);
        pointLight.position.set(Math.sin(-earthRotation) * radius * 90, Math.sin(axesRotation) * radius * 90, Math.cos(-earthRotation) * radius * 90);
        NightMap.update(new THREE.Vector3(pointLight.position.x / 90, pointLight.position.y / 90, pointLight.position.z / 90));
        if (pars.sun_visible) {
          sunSphere.position.set(pointLight.position.x, pointLight.position.y, pointLight.position.z);
        }
        switch (pars.state) {
          case STATE_ANIMATION_ACTIVE: {
            const alpha = Math.min(1, pars.elapsed_days / 16.0);
            let ok = true;
            for (let i = 0; i < explorers.length; i += 1) { // explorers.length
              ok = ok && explorers[i].setAlpha(alpha);
            }
            if (ok) {
              if (!this.interacting) {
                if (pars.onboard) {
                  const pAlpha = Math.min(1, Math.max(0, alpha - pars.camera_shift));
                  if (explorers[this.onboardIndex].getLength() > 2) {
                    const c = explorers[this.onboardIndex].getPosition(pAlpha);
                    const v = pars.camera_smooth;
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
                    controls.target.set(
                      controls.target.x * v + umv * explorers[this.onboardIndex].animatingSphere.position.x,
                      controls.target.y * v + umv * explorers[this.onboardIndex].animatingSphere.position.y,
                      controls.target.z * v + umv * explorers[this.onboardIndex].animatingSphere.position.z,
                    );
                    controls.update();
                  }
                } else {
                  const v = new THREE.Vector3();
                  for (let i = 0; i < explorers.length; i += 1) { // explorers.length
                    v.add(explorers[i].animatingSphere.position);
                  }
                  v.divideScalar(explorers.length);
                  v.setLength(radius * 1.65);
                  const a = pars.camera_smooth;
                  const uma = 1 - a;
                  controls.target.set(controls.target.x * a, controls.target.y * a, controls.target.z * a);
                  if (this.autoMode) {
                    const t = this.getScale() * a + INITIAL_ZOOM * uma;
                    this.setScale(t);
                    camera.position.set(camera.position.x * a + v.x * uma, camera.position.y * a + v.y * uma, camera.position.z * a + v.z * uma);
                  }
                  controls.update();
                  // controls.setAzimuthalAngle(rad);
                }
              }
              this.incrementTime();
            } else {
              //  console.log("network problems");
            }
            if (alpha >= 1) { this.visualizationState = STATE_MOVING_TO_DESTINATION; }
            break;
          }
          default:
            break;
        }
      }
      //  controls.update();
      if (timer % (1 + pars.skip_frame) === 0) {
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

      // Saving after rendering
      if (this.saving) {
        renderer.domElement.toBlob(
          (blob) => {
            saveAs(blob, 'image.png');
            this.saving = false;
            requestAnimationFrame(this.animate);
          },
        );
        return;
      }

      if (this.alive) { // Needed for hot reload
        requestAnimationFrame(this.animate);
      }
    },

    clear() {
      console.log('reset');
      pars.elapsed_days = 0;
      _.each(explorers, (e) => { e.reset(new THREE.Vector3(0, 0, 0)); });
      _.each(daysLabels, (l) => { l.setVisible(false); });
      _.each(cityLabels, (l) => { l.setVisible(false); });
      departureLabel.setVisible(false);
      destinationLabel.setVisible(false);
      this.minDist = 10000000000000000;
      this.minTrack = 0;
      this.minTime = 0;
      this.onboardIndex = 0;
      this.elapsed_days = 0;
      this.api_data = [];
      this.setOnboard(false);
    },

    error() {
      console.log('ERROR ROUTINES');
      animator.stop();
    },

    formatDate(dt) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const day = dt.getDate();
      const month = monthNames[dt.getMonth()];
      return `${day} ${month}`;
    },

    downloadMulti() {
      downloader.downloadMulti(this.departure, this.destination,
        (data) => { // ON UPDATE
          if (data.mindist < this.minDist) {
            this.minDist = Math.round(data.mindist);
            this.minTime = Math.round(data.mintime);
            this.minTrack = data.mintrack;
          }
          this.api_data.push(data.d);
          this.timestamp = data.timestamp.substring(11);
          // console.log('length ' + this.api_data.length)
          for (let j = 0; j < explorers.length; j += 1) {
            const pts = [];
            for (let i = j; i < data.d.length; i += 8) { pts.push(Util.latLon2XYZPosition(data.d[i][2], data.d[i][3], radius)); }
            // console.log(pts.length)
            const curve = new THREE.CatmullRomCurve3(pts);
            const points = curve.getPoints(CATMULL_NUM_POINTS * (pts.length - 1));
            // console.log('TO ' + points.length)
            const cdate = new Date(this.startingDate);
            const explorerH = pars.explorer_height_base;
            for (let k = 0; k < points.length - 1; k += 1) {
              const r = Util.getEarthAzimuthRotation(cdate);
              const sunP = new THREE.Vector3(Math.sin(-r) * radius, Math.sin(axesRotation) * radius, Math.cos(-r) * radius);
              const t = points[k];
              const g = sunP.angleTo(t);// Math.max(0,pointLight.position.angleTo(t)/(Math.PI*0.5));
              const s = (Math.PI * 0.5 - g) / (Math.PI * 0.5);

              if (g < Math.PI * 0.45) {
                explorerHS[j] += s * 0.02;
              } else { explorerHS[j] -= 0.002; }
              //
              explorerHS[j] = Math.min(pars.explorer_height_shift, Math.max(explorerHS[j], 0));
              explorers[j].addDataSample(points[k], { lat: 0, lng: 0 }, explorerH + explorerHS[j]);// , data.d[i]
              // console.log(24/(pts.length-1));
              Util.addHours(cdate, 24.0 / (points.length - 1));
            }
          }
        },
        () => { // ON END
          if (this.flightType !== 'planned') {
            this.minTrack = 0;
          }
          // TODO: actual startingDate! Add minTrack days
          this.winningExplorerData = {
            minDist: this.minDist,
            minTime: this.minTime,
            departureDate: this.startingDate,
            svg: this.toSVG(),
          };
          const data = [];
          for (let i = 0; i < this.api_data.length; i += 1) {
            for (let j = this.minTrack; j < this.api_data[i].length - 8; j += 8) {
              data.push(this.api_data[i][j][2]);
              data.push(this.api_data[i][j][3]);
            }
          }
          // var id = new Date().getTime() + '_' + this.departure.city + '_' + this.destination.city
          // id = id.replace(/\s+/g, '').toLowerCase()
          const s = JSON.stringify({
            departure: {
              city: this.departure.city,
              country: this.departure.country,
              coordinates: {
                latitude: this.departure.lat,
                longitude: this.departure.lng,
              },
            },
            destination: {
              city: this.destination.city,
              country: this.destination.country,
              coordinates: {
                latitude: this.destination.lat,
                longitude: this.destination.lng,
              },
            },
            min_dist: this.minDist,
            min_time: this.minTime,
            timestamp: this.timestamp,
            speed: explorers[this.minTrack].avgSpeed,
            distanceTraveled: explorers[this.minTrack].totalDistance,
            path: data,
            svg: this.svg,
          });
          // for (var z = 0; z < 300; z += 1) {
          // setTimeout(() =>
          fetch('http://54.190.63.219/insert.php', {
            method: 'post',
            body: s,
          }).then(
            response => response.json(),
          ).then((jsonData) => {
            console.log('***********************');
            console.log(jsonData);
            this.pathId = jsonData.id;
          });
        // , z * 500)
        //  }
        },
        () => { // ON ERROR
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
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
}

#labels{
  width: 100vw;
  height: 100vh;
  position:relative;;
  overflow: hidden;
  font-size: 10px;
}

#canvas{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
  height:100%;
}

.dg.ac{
  z-index: 16!important;
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
</style>
