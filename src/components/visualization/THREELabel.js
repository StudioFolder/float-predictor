/**
 * THREELabels.js - Utility class for creating labels in three.js
 * The labels are drawn on a separate canvas, overlayed on top of the visualization canvas.
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

/* eslint-disable no-mixed-operators, no-console */

import _ from 'lodash';
import Util from './Util';

const nextPOT = require('next-power-of-two');
const THREE = require('three');

const antialias = 2;
class THREELabel {
  constructor(scene, camera, fontFace = 'Bold Arial', fontSize = 12, bgColor = 'rgba(0,0,0,0)', textColor = 'rgba(255,255,255,1)', obj = undefined) {
    this.scene = scene;
    this.camera = camera;
    this.anchorObject = obj;
    this.fontFace = fontFace;
    this.fontSize = fontSize * antialias;
    this.labelPadding = {
      left: this.fontSize * 0.5,
      right: this.fontSize * 0.5,
      top: this.fontSize * 0.0,
      bottom: this.fontSize * 0.5,
    };
    this.padding = {
      left: this.fontSize * 2 / 5.0,
      right: this.fontSize * 4 / 5.0,
      top: this.fontSize / 5.0,
      bottom: this.fontSize * 3 / 5.0,
    };
    this.iconPadding = {
      left: this.fontSize * 2 / 5.0,
      right: this.fontSize * 2 / 5.0,
      top: this.fontSize * 3 / 5.0,
      bottom: this.fontSize * 3 / 5.0,
    };
    // this.canvas = document.createElement('canvas');
    // document.body.appendChild(this.canvas);
    // this.context = this.canvas.getContext('2d');

    this.canvas = document.getElementById('labels-canvas');
    this.context = this.canvas.getContext('2d');
    this.labelCanvas = document.createElement('canvas');
    this.labelContext = this.labelCanvas.getContext('2d');
    this.text = '';
    this.bgColor = bgColor;
    this.textColor = textColor;

    this.margin = 2;
    this.position = new THREE.Vector3(0, 0, 0);
    this.w = 0;
    this.h = 0;
    this.left = 0;
    this.top = 0;
    this.setVisible(false);
    window.addEventListener('resize', () => {
      this.redraw();
    }, false);
  }


  roundRect(x, y, w, h, r) {
    const ctx = this.labelContext;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }

  redraw() {
    this.labelContext.font = `${this.fontSize}px ${this.fontFace}`;
    const metrics = this.labelContext.measureText(this.text);
    const textWidth = metrics.width;
    this.h = this.fontSize + this.padding.top + this.padding.bottom;
    const iconSize = this.h - (this.iconPadding.top + this.iconPadding.bottom);
    let startW = 0;
    if (this.img) startW = this.iconPadding.left + this.iconPadding.right + iconSize;
    this.w = startW + (this.padding.left + this.padding.right) + textWidth;
    this.labelCanvas.width = nextPOT(this.w + this.labelPadding.left + this.labelPadding.right);
    this.labelCanvas.height = nextPOT(this.h + this.labelPadding.top + this.labelPadding.bottom);
    let left = 0; // this.labelPadding.left;
    const top = this.labelPadding.top;
    if (this.img && this.img.clientWidth > 0 && this.img.clientHeight > 0) {
      this.labelContext.fillStyle = this.bgColor;
      this.roundRect(left, top, this.w,
        this.h, this.h * 0.3);

      left += this.padding.left;
      left += this.iconPadding.left;
      const ratio = this.img.clientWidth / this.img.clientHeight;
      this.labelContext.drawImage(this.img, left,
        top + this.iconPadding.top, iconSize * ratio, iconSize);
      left += iconSize * ratio + this.iconPadding.right;
    } else {
      left += this.padding.left;
    }
    this.labelContext.fillStyle = this.textColor;
    this.labelContext.font = `${this.fontSize}px ${this.fontFace}`;
    this.labelContext.fillText(this.text, left, top + this.h - this.padding.bottom);
    this.context.fillStyle = this.textColor;
    this.prepare();
  }

  prepare() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.startL = w * 0.5 - this.w * 0.25; // + w * 0.5 * pos.x;
    this.startT = h * 0.5 - this.fontSize; // -h * 0.5 * pos.y;
    this.hScreen = { width: w * 0.5, height: h * 0.5 };
  }

  setIcon(img) {
    this.img = img;
  }

  update() {
    if (this.img) {
      this.img.onload = () => {
        this.redraw();
      };
    }
    this.redraw();
  }

  setCity(obj) {
    const p = Util.latLon2XYZPosition(obj.lat, obj.lng, 200);
    this.set(obj.city, p);
  }

  set(text, position) {
    this.text = text;
    this.setPosition(position);
    this.setVisible(true);
    this.update();
  }

  getPosition() {
    return this.position;
  }

  updatePosition(onboard = false, positions) {
    if (this.visible) {
      const angle = this.camera.position.angleTo(this.anchorObject.position);
      let limit = 1.2;
      if (onboard) {
        limit = 0.6;
      }
      if (Math.abs(angle) < limit) {
        let pos = this.anchorObject.position.clone();
        pos = pos.multiplyScalar(this.scene.scale.x).project(this.camera);
        this.left = antialias * (this.startL + this.hScreen.width * pos.x);
        this.top = antialias * (this.startT - this.hScreen.height * pos.y);
        let overlapping = false;
        if (positions) {
          const left = this.left;
          const top = this.top;
          _.each(positions, (p) => {
            if (p.visible &&
              Math.abs(p.left - left) < p.w * 0.6 && Math.abs(p.top - top) < p.h * 0.6) {
              overlapping = true;
            }
          });
        }
        if (!overlapping) this.context.drawImage(this.labelCanvas, this.left, this.top);
        return !overlapping;
      }
    }
    return false;
  }

  setScale(f) {
    this.lastScale = f;
    if (this.anchorObject) {
      this.anchorObject.scale.set(f, f, f);
    }
  }
  setPosition(position) {
    this.position = position;
    if (this.anchorObject != null) {
      this.anchorObject.position.set(position.x, position.y, position.z);
    }
  }

  setVisible(v, hideObject = true) {
    this.visible = v;
    if (hideObject) {
      this.anchorObject.visible = v;
    }
  }
}
// module.exports = Label; // eslint-disable-line no-undef
export default THREELabel;
