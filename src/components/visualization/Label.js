/* eslint-disable no-mixed-operators, no-console */
import Util from './Util';

class Label {
  constructor(scene, cam, obj, element, visible = false) {
    this.visible = visible;
    this.updateRate = 50;
    this.label = element;
    this.object = obj;
    this.scene = scene;
    this.camera = cam;
    this.element = element;
    // this.setVisible(visible);
    if (this.visible) {
      this.label.style.opacity = 1;
    } else {
      this.label.style.opacity = 0;
    }
  }

  reset(obj) {
    this.setVisible(true, true);
    const p = Util.latLon2XYZPosition(obj.lat, obj.lng, 200);
    // if(p.distanceTo(position))
    this.element.innerHTML = obj.city;
    this.object.position.set(p.x, p.y, p.z);
  }

  setVisible(v, hideObject = false) {
    this.visible = v;
    if (hideObject) {
      this.object.visible = v;
    }
    // console.log(this.label.style.pointerEvents);
    if (v) {
      this.label.style.pointerEvents = 'auto';
    } else {
      this.label.style.pointerEvents = 'none';
    }
    if (this.timerId) { clearInterval(this.timerId); }
    if (this.visible) {
      this.label.style.opacity = 1;
    } else {
      this.label.style.opacity = 0;
      this.timerId = undefined;
    }
    this.updatePosition();
  }

  updatePosition() {
    if (this.visible) {
      const angle = this.camera.position.angleTo(this.object.position);
      const w = window.innerWidth;
      const h = window.innerHeight;
      let pos = this.object.position.clone();
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
