/* eslint-disable no-mixed-operators, no-console, no-param-reassign */

const THREE = require('three');
// const Util = require('util')

const vshader =
'uniform float alpha;' +
'uniform float magnitude;' +
'uniform float opacity;' +
'uniform float minOpacity;' +

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
'vec3 hsv2rgb(vec3 c) {' +
'  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);' +
'  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);' +
'  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);' +
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
'  }  else {                                                       ' +
'      vColor =  startColor;                                       ' +
'      if(opacityMapping > 0.0) vOpacity = 0.0;                    ' +
'  }                                                               ' +
'  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x+blend.x*magnitude, position.y+blend.y*magnitude, position.z+blend.z*magnitude,1.0);' +
// '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x+blend.x*magnitude,
// position.y+blend.y*magnitude, position.z+blend.z*magnitude,1.0);' +
'}';

const fshader =
'uniform float alpha;' +
'varying vec3 vColor;' +
'varying float vOpacity;' +
'void main(){' +
'  gl_FragColor = vec4(vColor.rgb,vOpacity);' +
'}';

class WindVisualization {
  init(radius) {
    this.array = [];
    this.precision = 3;
    this.active = true;
    this.radius = radius;
    this.magnitude = 0.2;
    this.windData = [];
    this.isEnd = [];
    this.progress = -1;
    const detail = 6;
    let geometry = new THREE.IcosahedronGeometry(radius, detail);
    this.colors = [];
    for (let i = 0; i < geometry.vertices.length; i += 1) {
      this.array.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
      this.array.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
      this.isEnd.push(0);
      this.isEnd.push(1);
      this.colors.push(1, 1, 1);
      this.colors.push(0, 0, 0);
    }
    this.lineMaterial = this.createMaterial();
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(this.array), 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(this.colors), 3));
    geometry.addAttribute('isEnd', new THREE.BufferAttribute(new Float32Array(this.isEnd), 1));
    for (let k = 0; k < 16; k += 1) {
      this.windData[k] = new Float32Array(this.array.length);
    }
    geometry.addAttribute('start', new THREE.BufferAttribute(this.windData[0], 3));
    geometry.addAttribute('end', new THREE.BufferAttribute(this.windData[1], 3));
    // geometry.addAttribute('end', new THREE.BufferAttribute(this.windData[1], 3));
    this.lines = new THREE.LineSegments(geometry, this.lineMaterial);
  }

  setOpacity(f) {
    this.lines.material.uniforms.opacity.value = f;
    this.lines.material.needsUpdate = true;
  }

  setMagnitude(f) {
    this.lines.material.uniforms.magnitude.value = f;
    this.lines.material.needsUpdate = true;
  }

  setData(paths, d = 0, onProgress, onEnd, errorCount = 0) {
    if (d < paths.length) {
      fetch(paths[d])
        .then(r => r.json())
        .then((json) => {
        // this.windData[d/24]=[];
          for (let i = 0; i < json.data.length; i += 3) {
            this.windData[d][i * 2] = json.data[i];
            this.windData[d][i * 2 + 1] = json.data[i + 1];
            this.windData[d][i * 2 + 2] = json.data[i + 2];
          }
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
    } else if (onEnd) {
      onEnd();
    }
  }

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
    if (this.lastUpdateTime !== elapsedTime && this.lines.visible) {
      let i = Math.floor(elapsedTime);
      const alpha = elapsedTime - i;
      this.lines.material.uniforms.alpha.value = alpha;

      if (Math.floor(this.lastUpdateTime) !== i) {
        // REPLACE ARRAYS
        i = Math.min(i, 15);
        const ip1 = Math.min(i + 1, 15);
        if (ip1 > this.progress) {
          return false;
        }
        // console.log(`${i} : ${ip1} ->${alpha}`);
        this.lines.geometry.attributes.start.setArray(this.windData[i]);
        this.lines.geometry.attributes.end.setArray(this.windData[ip1]);
        this.lines.geometry.attributes.start.needsUpdate = true;
        this.lines.geometry.attributes.end.needsUpdate = true;
      }
      this.lastUpdateTime = elapsedTime;
    }
    return true;
  }

  stop() {
    this.active = false;
  }
/*
  latLon2XYZ(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    // console.log(phi+" "+theta);
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  }

  XYZ2LatLon(coord, length) {
    const RAD2DEG = 180 / Math.PI;
    // var DEG2RAD = Math.PI / 180
    let lng = 90 - Math.atan2(coord.x, -coord.z) * RAD2DEG;
    const l = Math.sqrt(coord.x * coord.x + coord.z * coord.z);
    const lat = Math.atan2(coord.y, l) * RAD2DEG;
    lng = (360 + lng) % 360;
    return { lat, lng };
  }
  */
}

export default new WindVisualization();
