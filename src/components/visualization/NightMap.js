/* eslint-disable no-mixed-operators, no-console, no-param-reassign */

const THREE = require('three');

const vshader =
'const float diameter = 400.0;' +
'varying vec2 vUv;' +
'uniform vec3 sunPosition;' +
'uniform vec3 mapColor;' +
'uniform float intensity;' +
'uniform float threshold;' +
'varying float f;' +
'void main() {' +
'    float umthreshold = 1.0-threshold;' +
'    vUv = uv;' +
'    float dis=distance(position,sunPosition)/diameter;' +
'    f=clamp(dis, 0.0, 1.0);' + // 1.0-clamp(abs(sunPosition.x/400.0), 0.0, 1.0);' +
'    if(f>threshold){f=clamp(intensity*(f-threshold)/umthreshold,0.0,1.0);}' +
'    else {f=0.0;}' +
'    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);' +
'}';

const fshader =
'varying vec2 vUv;' +
'varying float f;' +
'varying vec3 vecPos;' +
'varying vec3 vecNormal;' +
'uniform vec3 mapColor;' +
'uniform sampler2D texture;' +
'void main() {' +
'   vec4 tmp = vec4(texture2D(texture, vUv));' +
'   if(tmp.r<0.2)gl_FragColor=vec4(1,1.0,1.0,0);' +
'   else gl_FragColor=vec4(tmp.r*mapColor.r,tmp.r*mapColor.g,tmp.r*mapColor.b,f*tmp.r);' +
'}';

class NightMap {
  init(radius, scene, texture) {
    const uniforms = {
      sunPosition: { type: 'v3', value: new THREE.Vector3(200, 0, 0) },
      texture: { type: 't', value: texture },
      intensity: { type: 'f', value: 1.0 },
      threshold: { type: 'f', value: 0.6 },
      mapColor: { type: 'c', value: new THREE.Color(0xffffff) },
    };
    this.material = new THREE.ShaderMaterial({
    //  vertexColors: THREE.VertexColors,
      uniforms,
      vertexShader: vshader,
      fragmentShader: fshader,
      transparent: true,
    });
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.01, 32, 16), this.material);
    scene.add(this.sphere);
  }

  setVisible(c) {
    this.sphere.visible = c;
  }

  setColor(c) {
    this.sphere.material.uniforms.mapColor.value = new THREE.Color(c);
    this.sphere.material.uniforms.mapColor.needsUpdate = true;
  }

  setThreshold(t) {
    this.sphere.material.uniforms.threshold.value = t;
    this.sphere.material.uniforms.threshold.needsUpdate = true;
  }

  setIntensity(i) {
    this.sphere.material.uniforms.intensity.value = i;
    this.sphere.material.uniforms.intensity.needsUpdate = true;
  }

  update(sunPosition) {
    this.sphere.material.uniforms.sunPosition.value = sunPosition;
    this.sphere.material.uniforms.sunPosition.needsUpdate = true;
  }
}
export default new NightMap();
