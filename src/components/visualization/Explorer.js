/* eslint-disable no-mixed-operators, no-console, no-param-reassign, max-len */

const THREE = require('three');

const USE_SPHERES = false;
let MAX_POINTS = 128;
const ATTACK_DECAY = 12;
const EARTH_RADIUS = 6378.137;
const SCENE_SCALE = EARTH_RADIUS / 200.0;

class Explorer {
  constructor(scene, shift = 0, nPoints = 1) {
    THREE.Material.prototype.setOpacity =
    function setOpacity(opacity, animationTime = 0, callback) {
      function animate(material, countdown, v) {
        material.opacity += v;
        // material.nee
        if (countdown > 0) {
          setTimeout(() => { animate(material, countdown - 1, v); }, 1000 / 30);
        } else if (callback) { callback(); }
      }
      if (animationTime > 0) {
        let v = 30.0 * animationTime;
        const countdown = (30.0 * animationTime);
        v = (opacity - this.opacity) / countdown;
        animate(this, countdown, v);
      }
    };
    this.nPoints = nPoints;
    MAX_POINTS = 128 * this.nPoints;
    console.log(MAX_POINTS);
    this.scene = scene;
    this.coordinates = [];
    this.index = 0;
    this.destination = { lat: 0, lng: 0 };
    this.array = new Float32Array(MAX_POINTS * 3 * 2);
    this.shift = shift;
    this.speed = [];
    this.distance = [];
    this.avgSpeed = 0;
    this.totalDistance = 0;
    const c = 0xffffff;
    this.lineMaterial = new THREE.LineBasicMaterial({ transparent: true, color: c, linewidth: 1.0 });
    this.sphereMaterial = new THREE.MeshBasicMaterial({ transparent: true, color: c, opacity: 0.0 });
    this.animatingSphereMaterial = new THREE.MeshBasicMaterial({ transparent: true, color: c, opacity: 1.0 });
    this.facesMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
    this.lineSegmentMaterial = new THREE.LineBasicMaterial({ transparent: true, color: 0xaaaaaa, opacity: 0.0, linewidth: 1.0 });
    this.lastPosition = new THREE.Vector3(0, 0, 0);
    this.spheres = [];
    const lineIndexes = [];
    const segmentIndexes = [];
    // console.log(MAX_POINTS);
    for (let i = 0; i < MAX_POINTS; i += 1) {
      this.distance.push(0);
      this.speed.push(0);
      // lineIndexes.push((i-1)*2);
      lineIndexes.push(((i) * 2) + 1);
      // lineIndexes.push((i+1)*2+1);
      this.coordinates.push({ lat: 0, lng: 0 });
      segmentIndexes.push((i) * 2);
      segmentIndexes.push(((i) * 2) + 1);
    }

    this.animatingSphere = new THREE.Mesh(new THREE.TetrahedronGeometry(1.5, 0), this.animatingSphereMaterial);
    scene.add(this.animatingSphere);
    // this.animatingSphere.visible=false;

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(this.array, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(segmentIndexes), 1));
    this.segments = new THREE.LineSegments(geometry, this.lineSegmentMaterial);
    this.scene.add(this.segments);

    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(this.array, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(lineIndexes), 1));
    this.line = new THREE.Line(geometry, this.lineMaterial);
    this.scene.add(this.line);

    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(this.array, 3));
    this.mesh = new THREE.Mesh(geometry, this.facesMaterial);
    this.mesh.drawMode = THREE.TriangleStripDrawMode;
    scene.add(this.mesh);

    this.currentPosition = new THREE.Vector3(0, 0, 0);

    this.reset();
  }

  getCoordinates = function getCoordinates() {
    return this.coordinates[this.index];
  };

  getLength = function getLength() {
    return this.length;
  };

  reset = function reset(departure) {
    this.length = 0;
    this.lineMaterial.opacity = 1;// setOpacity(1,0);
    this.animatingSphereMaterial.opacity = 1;
    if (departure) {
      this.animatingSphere.position.set(departure.x, departure.y, departure.z);
    }
    this.lineSegmentMaterial.opacity = 0;
    this.line.geometry.setDrawRange(0, 0);
    this.mesh.geometry.setDrawRange(0, 0);
    this.segments.geometry.setDrawRange(0, 0);

    this.mesh.visible = false;
    this.segments.visible = false;
    this.line.visible = true;
  };

  getPosition = function getPosition(alpha) {
    const t = alpha * (MAX_POINTS - 1.0);
    const i = Math.floor(t);
    /*
    const ipo = Math.min(i + 1, MAX_POINTS - 1.0);
    const a = t - i;
    const oma = 1.0 - a;
    return new THREE.Vector3(
      this.array[i * 3 * 2 + 3] * oma + this.array[ipo * 3 * 2 + 3] * a,
      this.array[i * 3 * 2 + 4] * oma + this.array[ipo * 3 * 2 + 4] * a,
      this.array[i * 3 * 2 + 5] * oma + this.array[ipo * 3 * 2 + 5] * a,
    ); */
    return new THREE.Vector3(
      this.array[i * 3 * 2 + 3],
      this.array[i * 3 * 2 + 4],
      this.array[i * 3 * 2 + 5],
    );
  };

  setAlpha = function setAlpha(alpha) {
    const t = Math.max(0, alpha * (MAX_POINTS - 1.0));
    this.index = Math.floor(t);
    const ipo = Math.min(this.index + 1, MAX_POINTS - 1.0);
    const a = t - this.index;
    const oma = 1 - a;
    if (USE_SPHERES) this.spheres[this.index].visible = true;
    if (ipo < this.length) {
      if (this.animatingSphere.visible) {
        this.animatingSphere.position.set(
          this.array[this.index * 3 * 2 + 3] * oma + this.array[ipo * 3 * 2 + 3] * a,
          this.array[this.index * 3 * 2 + 4] * oma + this.array[ipo * 3 * 2 + 4] * a,
          this.array[this.index * 3 * 2 + 5] * oma + this.array[ipo * 3 * 2 + 5] * a,
        );
      }
      this.line.geometry.setDrawRange(0, this.index + 1);
      this.mesh.geometry.setDrawRange(0, (this.index + 1) * 2);
      this.segments.geometry.setDrawRange(0, (this.index + 1) * 2);
      this.mesh.frustumCulled = false;
      this.line.frustumCulled = false;
      this.segments.frustumCulled = false;
      this.segments.geometry.attributes.position.needsUpdate = true;
      this.line.geometry.attributes.position.needsUpdate = true;
      this.mesh.geometry.attributes.position.needsUpdate = true;
      return true;
    }
    return false;
  };
  getSpeed = function getSpeed() {
    return this.speed[this.index];
  };
  getDistance = function getDistance() {
    return this.distance[this.index];
  };
  addDataSample = function addDataSample(position, coordinates, h) {
    let s = 0;
    const pIndex = this.length - this.shift;
    if (pIndex >= 0) {
      s = 1;
      if (pIndex <= ATTACK_DECAY) {
        s = pIndex / ATTACK_DECAY;
      } else {
        const t = this.length - (MAX_POINTS - 1 - ATTACK_DECAY);
        if (t > 0) {
          s = Math.max(1 - t / ATTACK_DECAY, 0.1);
        }
      }
    }

    const heightShift = 1.0 + h * s;

    if (this.length === MAX_POINTS - 1) {
      this.destination = { lat: coordinates.lat, lng: coordinates.lng };
      this.avgSpeed = 0;
      for (let i = 0; i < this.speed.length; i += 1) {
        this.avgSpeed += this.speed[i];
      }
      this.avgSpeed = this.avgSpeed / this.speed.length;
      this.totalDistance = this.distance[this.distance.length - 1];
    }
    if (this.length < MAX_POINTS) {
      this.array[2 * this.length * 3] = position.x;
      this.array[2 * this.length * 3 + 1] = position.y;
      this.array[2 * this.length * 3 + 2] = position.z;

      this.array[(1 + 2 * this.length) * 3] = position.x * heightShift;
      this.array[(1 + 2 * this.length) * 3 + 1] = position.y * heightShift;
      this.array[(1 + 2 * this.length) * 3 + 2] = position.z * heightShift;
    } else {
      console.log('this is strange...got more points than expected - Explorer');
    }
    if (this.length > 0) {
      const d = position.distanceTo(this.lastPosition) * SCENE_SCALE;
      this.distance[this.length] = this.distance[this.length - 1] + d;
      this.speed[this.length] = d;
    }
    this.lastPosition.set(position.x, position.y, position.z);
    this.coordinates[this.length] = { lat: coordinates.lat, lng: coordinates.lng };
    this.length += 1;
  }
}

export default Explorer;