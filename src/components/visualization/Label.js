/* eslint-disable no-mixed-operators, no-console */
import Util from './Util';

class Label {
  constructor(scene, cam, obj, element, visible = false) {
    this.updateRate = 50;
    this.label = element;
    this.anchorObject = obj;
    this.scene = scene;
    this.camera = cam;
    this.setVisible(visible);
  }

  getAnchorObject() {
    return this.anchorObject;
  }

  setCity(obj) {
    const p = Util.latLon2XYZPosition(obj.lat, obj.lng, 200);
    this.set(obj.city, p);
  }

  set(text, position) {
    this.setVisible(true);
    this.label.innerHTML = text;
    this.anchorObject.position.set(position.x, position.y, position.z);
  }

  setVisible(v, hideObject = true) {
    this.visible = v;
    if (hideObject) {
      this.anchorObject.visible = v;
    }
    if (this.timerId) { clearInterval(this.timerId); }
    if (this.visible) {
      this.label.style.opacity = 1;
      this.label.style.pointerEvents = 'auto';
    } else {
      this.label.style.opacity = 0;
      this.timerId = undefined;
      this.label.style.pointerEvents = 'none';
    }
    this.updatePosition();
  }

  setPosition(p) {
    this.anchorObject.position.set(p.x, p.y, p.z);
  }

  getPosition() {
    return this.anchorObject.position;
  }

  updatePosition() {
    if (this.visible) {
      const angle = this.camera.position.angleTo(this.anchorObject.position);
      const w = window.innerWidth;
      const h = window.innerHeight;
      let pos = this.anchorObject.position.clone();
      pos = pos.multiplyScalar(this.scene.scale.x).project(this.camera);
      this.label.style.transform = `translate(${w * 0.5 * pos.x + w * 0.5}px` +
        `,${-this.label.clientHeight - 10 + h * 0.5 - h * 0.5 * pos.y}px)`; // top = (h*0.5- h*0.5 * pos.y ) + 'px';
      if (Math.abs(angle) < 1) {
        this.label.style.opacity = 1;
      } else {
        this.label.style.opacity = 0;
      }
    }
  }
}
// module.exports = Label; // eslint-disable-line no-undef
export default Label;
