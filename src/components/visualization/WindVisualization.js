/* eslint-disable no-mixed-operators, no-console, no-param-reassign */

const THREE = require('three');
// const Util = require('util')
const DOWNLOADED = 1;
const DOWNLOADING = 0.5;
const vshader =
'uniform float alpha;' +
'uniform float magnitude;' +
'uniform float opacity;' +
'uniform float minOpacity;' +
'uniform float elapsedTime;' +
'uniform float animating;' +
'uniform vec3  startColor;' +
'uniform vec3  endColor;' +
'uniform float startHue;' +
'uniform float endHue;' +
'uniform float opacityMapping;' +
'uniform float mapping;' +
'uniform float threshold;' +
'varying vec3 vColor;' +
'varying float vOpacity;' +
'attribute vec3 start;' +
'attribute vec3 end;' +
'attribute float isEnd;' +
'attribute float vertexIndex;' +
'vec3 hsv2rgb(vec3 c) {' +
'  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);' +
'  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);' +
'  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);' +
'}' +
'float modf(float x, float y) {' +
'  return x - y * floor(x/y);' +
'}' +
'void main(){' +
// '  vColor = startColor;' +
'  vec3 blend = mix(start,end,alpha);' +
'  vOpacity = opacity;                                             ' +
'  if(isEnd == 0.0){                                               ' +
'      float d = distance(vec3(0,0,0), blend)/threshold;           ' +
'      if(d>1.0)d=1.0;                                             ' +
'      if(opacityMapping > 0.0) vOpacity = minOpacity+(1.0-minOpacity)*d*opacity;      ' +
'      if(mapping == 2.0){                                         ' +
'          float h = startHue+d*(endHue-startHue);                 ' +
'          vColor = hsv2rgb(vec3(h,1.0,1.0));                      ' +
'      }                                                           ' +
'      else if(mapping == 1.0){                                    ' +
'          vColor = (1.0-d)*startColor+d*endColor;                 ' +
'      }                                                           ' +
'      else if(mapping == 0.0){                                    ' +
'          vColor = endColor;                                      ' +
'      }                                                           ' +
'      float mag = magnitude;                                      ' +
'      if(animating > 0.0){                                        ' +
'          float m = mod(elapsedTime + vertexIndex, 1.0);          ' +
'          mag = magnitude * m;                                    ' +
'          vOpacity = opacity * (1.0 - abs(0.5 - m) / 0.5);        ' +
'      }                                                           ' +
'      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x+blend.x*mag, position.y+blend.y*mag, position.z+blend.z*mag,1.0);' +
'  }  else {                                                       ' +
'      vColor =  startColor;                                       ' +
'      if(opacityMapping > 0.0) vOpacity = 0.0;                    ' +
'      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x+blend.x, position.y+blend.y, position.z+blend.z,1.0);' +
'  }                                                               ' +
'}';

const fshader =
'uniform float alpha;' +
'varying vec3 vColor;' +
'varying float vOpacity;' +
'void main(){' +
'  gl_FragColor = vec4(vColor.rgb,vOpacity);' +
'}';

class WindVisualization {
  constructor(pressure, scene, radius) {
    this.pressure = pressure;
    this.scene = scene;
    this.radius = radius;
    this.urls = [];
    this.downloadStatus = [];
    for (let i = 0; i < 16; i += 1) {
      this.urls.push(`static/data/gfs/data/${this.pressure}/${i * 24}.json`);
      this.downloadStatus.push(0);
    }
  }
  init() {
    this.initialized = true;
    this.array = [];
    this.precision = 3;
    this.animationSpeed = 1.0;
    this.magnitude = 0.2;
    this.windData = [];
    this.isEnd = [];
    this.vertexIndex = [];
    this.progress = -1;
    const detail = 6;
    let geometry = new THREE.IcosahedronGeometry(this.radius, detail);
    this.colors = [];
    for (let i = 0; i < geometry.vertices.length; i += 1) {
      this.array.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
      this.array.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
      this.isEnd.push(0);
      this.isEnd.push(1);
      this.vertexIndex.push(Math.random());
      this.vertexIndex.push(Math.random());
      this.colors.push(1, 1, 1);
      this.colors.push(0, 0, 0);
    }
    this.lineMaterial = this.createMaterial();
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(this.array), 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(this.colors), 3));
    geometry.addAttribute('isEnd', new THREE.BufferAttribute(new Float32Array(this.isEnd), 1));
    geometry.addAttribute('vertexIndex', new THREE.BufferAttribute(new Float32Array(this.vertexIndex), 1));
    for (let k = 0; k < 16; k += 1) {
      this.windData[k] = new Float32Array(this.array.length);
    }
    geometry.addAttribute('start', new THREE.BufferAttribute(this.windData[0], 3));
    geometry.addAttribute('end', new THREE.BufferAttribute(this.windData[1], 3));
    // geometry.addAttribute('end', new THREE.BufferAttribute(this.windData[1], 3));
    this.lines = new THREE.LineSegments(geometry, this.lineMaterial);
    this.scene.add(this.lines);
  }

  setStyle(config) {
    this.lines.visible = config.visible;
    this.lines.material.color = new THREE.Color(config.color);
    this.setOpacity(config.opacity);
    this.setMagnitude(config.magnitude);
    this.setMapping(config.mapping);
    this.setOpacityMapping(config.opacity_mapping);
    this.setThreshold(config.threshold);
    this.setAnimating(config.animating);
    this.setAnimationSpeed(config.animationSpeed);
    this.setColor(new THREE.Color(config.start_color), new THREE.Color(config.end_color));
    this.precision = config.precision;
  }

  preload(i = 0) {
    this.downloadData(i, () => {
      if (i < this.urls.length - 1) {
        this.preload(i + 1);
      }
    });
  }

  setActive(day) {
    if (!this.initialized) {
      this.init();
      if (day) { // Download only the day
        const clampedDay = Math.floor(day);
        this.downloadData(clampedDay);
        this.downloadData(clampedDay + 1);
      } else { // Download them all
        this.preload();
      }
    }
  }

  hide() {
    this.lines.visible = false;
  }

  setOpacity(f) {
    this.lines.material.uniforms.opacity.value = f;
    this.lines.material.needsUpdate = true;
  }

  setMagnitude(f) {
    this.lines.material.uniforms.magnitude.value = f;
    this.lines.material.needsUpdate = true;
  }

  downloadData(d, onEnd) {
    if (d >= 0 && d < this.urls.length && this.downloadStatus[d] === 0) {
      this.downloadStatus[d] = DOWNLOADING;
      fetch(this.urls[d])
        .then(r => r.json())
        .then((json) => {
          for (let i = 0; i < json.data.length; i += 3) {
            this.windData[d][i * 2] = json.data[i];
            this.windData[d][i * 2 + 1] = json.data[i + 1];
            this.windData[d][i * 2 + 2] = json.data[i + 2];
          }
          this.downloadStatus[d] = DOWNLOADED;
          if (onEnd) {
            onEnd();
          }
        }).catch((r) => {
          console.log(`Wind data error - ${r.message} - reconnect attempt`);
          // setInterval(() => this.downloadData(paths, d, onProgress, onEnd), 1000);
        });
    } else if (onEnd) {
      onEnd();
    }
  }

  /*
  downloadData(paths, day = -1, onProgress, onEnd, errorCount = 0) {
    // if day < 0 download them all
    const d = Math.max(0, day);
    if (d < paths.length) {
      fetch(paths[d])
        .then(r => r.json())
        .then((json) => {
          for (let i = 0; i < json.data.length; i += 3) {
            this.windData[d][i * 2] = json.data[i];
            this.windData[d][i * 2 + 1] = json.data[i + 1];
            this.windData[d][i * 2 + 2] = json.data[i + 2];
          }
          this.downloadStatus[d] = 1;
          if (onProgress) onProgress(d);
          if (day < 0) this.downloadData(paths, d + 1, onProgress, onEnd);
          errorCount = 0;
        }).catch((r) => {
          errorCount += 1;
          console.log(r);
          console.log(`Wind data error - reconnect attempt n.${errorCount}`);
          setInterval(() => this.downloadData(paths, d, onProgress, onEnd), 1000);
        });
    } else if (onEnd) {
      onEnd();
    }
  }
  */

  setOpacityMapping(t) {
    // 0 -> no opacity mapping
    // 1 -> opacity mapping
    this.lines.material.uniforms.opacityMapping.value = t;
  }

  setMapping(t) {
    // 0 -> no mapping
    // 1 -> rgb mapping
    // 2 -> hue mapping
    this.lines.material.uniforms.mapping.value = t;
  }

  setThreshold(t) {
    this.lines.material.uniforms.threshold.value = t;
  }

  setAnimating(t) {
    if (t) {
      this.lines.material.uniforms.animating.value = 1.0;
    } else {
      this.lines.material.uniforms.animating.value = 0.0;
    }
  }

  setAnimationSpeed(t) {
    this.animationSpeed = t;
  }

  setMinOpacity(mo) {
    this.lines.material.uniforms.minOpacity.value = mo;
  }

  createMaterial() {
    const uniforms = {
      alpha: { type: 'f', value: 0.0 },
      opacity: { type: 'f', value: 0.2 },
      minOpacity: { type: 'f', value: 0.5 },
      magnitude: { type: 'f', value: this.magnitude },
      opacityMapping: { type: 'f', value: 0 },
      mapping: { type: 'f', value: 0 },
      threshold: { type: 'f', value: 50.0 },
      startColor: { type: 'c', value: new THREE.Color(0, 0, 0) },
      endColor: { type: 'c', value: new THREE.Color(1, 1, 1) },
      startHue: { type: 'f', value: 0.0 },
      endHue: { type: 'f', value: 0.1 },
      elapsedTime: { type: 'f', value: 0.0 },
      animating: { type: 'f', value: 0.0 },
    };
    const material = new THREE.ShaderMaterial({
      vertexColors: THREE.VertexColors,
      uniforms,
      vertexShader: vshader,
      fragmentShader: fshader,
      transparent: true,
    });

    return material;
  }

  setColor(b, a) {
    // console.log(this.lines.geometry.attributes.color);
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
    this.lines.material.uniforms.startColor.value = b;
    this.lines.material.uniforms.endColor.value = a;
    this.lines.material.uniforms.startHue.value = b.getHSL().h;
    this.lines.material.uniforms.endHue.value = a.getHSL().h;
  }

  update(elapsedTimef) {
    const elapsedTime = elapsedTimef.toFixed(this.precision);
    this.lines.material.uniforms.elapsedTime.value += (1.0 / 60.0) * this.animationSpeed;
    if (this.lastUpdateTime !== elapsedTime && this.lines.visible) {
      let i = Math.floor(elapsedTime);
      const alpha = elapsedTime - i;
      this.lines.material.uniforms.alpha.value = alpha;
      if (Math.floor(this.lastUpdateTime) !== i) { // NEW DAY
        // REPLACE ARRAYS
        i = Math.min(i, 15);
        const ip1 = Math.min(i + 1, 15);
        if (this.downloadStatus[ip1] === DOWNLOADED && this.downloadStatus[i] === DOWNLOADED) {
          this.lines.geometry.attributes.start.setArray(this.windData[i]);
          this.lines.geometry.attributes.end.setArray(this.windData[ip1]);
          this.lines.geometry.attributes.start.needsUpdate = true;
          this.lines.geometry.attributes.end.needsUpdate = true;
        } else {
          this.downloadData(i);
          this.downloadData(ip1);
          return false;
        }
      }
      this.lastUpdateTime = elapsedTime;
    }
    return true;
  }
}

export default WindVisualization;
