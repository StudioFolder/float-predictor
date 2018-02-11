/* eslint-disable no-mixed-operators, no-console, no-param-reassign */

const THREE = require('three');
// const Util = require('util')

class WindVisualization {
  init(radius) {
    this.array = [];
    this.precision = 3;
    this.active = true;
    this.radius = radius;
    this.magnitude = 0.2;
    this.windData = [];
    const detail = 6;
    let geometry = new THREE.IcosahedronGeometry(radius, detail);
    this.colors = [];
    for (let i = 0; i < geometry.vertices.length; i += 1) {
      this.array.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
      this.array.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
      this.colors.push(1, 1, 1);
      this.colors.push(0, 0, 0);
    }
    this.lineMaterial = new THREE.LineBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: THREE.VertexColors,
      transparent: true,
      opacity: 0.6,
      linewidth: 1.0,
    });
    // this.createMaterial();//
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(this.array), 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(this.colors), 3));
    this.lines = new THREE.LineSegments(geometry, this.lineMaterial);
  }

  setData(paths, d = 0, onProgress, onEnd, errorCount = 0) {
    if (d < paths.length) {
      fetch(paths[d])
        .then(r => r.json())
        .then((json) => {
        // this.windData[d/24]=[];
          this.windData[d] = json.data.splice(0);
          this.progress = d;
          if (onProgress) onProgress(d);
          this.setData(paths, d + 1, onProgress, onEnd);
          errorCount = 0;
        })
        .catch((r) => {
          errorCount += 1;
          console.log(r);
          console.log(`Wind data error - reconnect attempt n.${errorCount}`);
          setInterval(() => this.setData(paths, d, onProgress, onEnd), 300);
        });
    } else if (onEnd) onEnd();
  }

  setColor(b, a) {
    console.log(this.lines.geometry.attributes.color);
    const colors = this.lines.geometry.attributes.color.array;
    for (let i = 0; i < this.colors.length; i += 6) {
      colors[i] = a.r;
      colors[i + 1] = a.g;
      colors[i + 2] = a.b;
      colors[i + 3] = b.r;
      colors[i + 4] = b.g;
      colors[i + 5] = b.b;
    }
    this.lines.geometry.attributes.color.needsUpdate = true;
  }

  update(elapsedTimeF) {
    const elapsedTime = elapsedTimeF.toFixed(this.precision);
    if (this.lastUpdateTime !== elapsedTime && this.lines.visible) {
      const index = Math.max(0, Math.min(15, Math.floor(elapsedTime)));
      const indexn = Math.min(15, index + 1);
      if (this.windData[index] && this.windData[indexn]) {
        const data = this.windData[index];
        const datan = this.windData[indexn];
        let a = elapsedTime - index;
        let uma = 1.0 - a;
        a *= this.magnitude;
        uma *= this.magnitude;
        const array = this.lines.geometry.attributes.position.array;
        // let minv = 900000000000;
        // let maxv = -1;

        for (let i = 0; i < data.length; i += 3) {
          /*
          const ddd = new THREE.Vector3(data[i], data[i + 1],
          data[i + 2]).length(new THREE.Vector3(0, 0, 0));
          minv = Math.min(ddd, minv);
          maxv = Math.max(ddd, maxv);
          */
          const j = i * 2;
          const k = i * 2 + 3;
          array[j] = array[k] + datan[i] * a + data[i] * uma;
          array[j + 1] = array[k + 1] + datan[i + 1] * a + data[i + 1] * uma;
          array[j + 2] = array[k + 2] + datan[i + 2] * a + data[i + 2] * uma;
        }
        // console.log(`${minv} ${maxv}`);
        this.lines.geometry.attributes.position.needsUpdate = true;
        this.lastUpdateTime = elapsedTime;
        return true;
      }
    }
    return false;
  }

  stop() {
    this.active = false;
  }

  setMagnitude(v) {
    this.magnitude = v;
  }

  setOpacity(v) {
    this.lines.material.opacity = v;
  }
  /*
  this.latLon2XYZ = function (lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    // console.log(phi+" "+theta);
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  };

  this.XYZ2LatLon = function (coord, length) {
    const RAD2DEG = 180 / Math.PI;
    // var DEG2RAD = Math.PI / 180
    let lng = 90 - Math.atan2(coord.x, -coord.z) * RAD2DEG;
    const l = Math.sqrt(coord.x * coord.x + coord.z * coord.z);
    const lat = Math.atan2(coord.y, l) * RAD2DEG;
    lng = (360 + lng) % 360;
    return { lat, lng };
  };
  */
}

export default new WindVisualization();
