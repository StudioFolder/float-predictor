/* eslint-disable no-mixed-operators, no-console */
import Util from './Util';

const nextPOT = require('next-power-of-two');
const THREE = require('three');

const antialias = 5;

class THREELabel {
  constructor(scene, fontFace = 'Bold Arial', fontSize = 12, bgColor = 'rgba(0,0,0,0)', textColor = 'rgba(255,255,255,1)', obj = undefined) {
    this.scene = scene;
    this.anchorObject = obj;
    this.fontFace = fontFace;
    this.fontSize = fontSize;
    this.padding = {
      left: fontSize * 2,
      right: fontSize * 4,
      top: fontSize,
      bottom: fontSize * 3,
    };
    this.iconPadding = {
      left: fontSize * 2,
      right: fontSize * 2,
      top: fontSize * 3,
      bottom: fontSize * 3,
    };
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.text = '';
    this.bgColor = bgColor;
    this.textColor = textColor;

    this.texture = new THREE.Texture(this.canvas);
    this.spriteMaterial = new THREE.SpriteMaterial({ map: this.texture });

    // this.spriteMaterial.clipShadows = true;
    this.spriteMaterial.depthTest = false;
    // this.spriteMaterial.depthWrite = false;

    this.sprite = new THREE.Sprite(this.spriteMaterial);


    this.scene.add(this.sprite);
    this.margin = 4;
    this.position = new THREE.Vector3(0, 0, 0);
    this.w = 0;
    this.h = 0;
    this.setVisible(false);
  }


  roundRect(x, y, w, h, r) {
    const ctx = this.context;
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
    this.context.font = `${this.fontSize}px ${this.fontFace}`;
    const metrics = this.context.measureText(this.text);
    const textWidth = metrics.width;
    this.h = this.fontSize * antialias + this.padding.top + this.padding.bottom;
    const iconSize = this.h - (this.iconPadding.top + this.iconPadding.bottom);
    let startW = 0;
    if (this.img) startW = (this.iconPadding.left + this.iconPadding.right) + iconSize;
    this.w = startW + (this.padding.left + this.padding.right) + textWidth * antialias;
    this.canvas.width = nextPOT(this.w);
    this.canvas.height = nextPOT(this.h);
    this.context.fillStyle = this.bgColor;
    this.roundRect(0, 0, this.w,
      this.h, this.h * 0.3);
    this.context.fillStyle = this.textColor;
    let left = this.padding.left;
    if (this.img && this.img.clientWidth > 0 && this.img.clientHeight > 0) {
      left += this.iconPadding.left;
      const ratio = this.img.clientWidth / this.img.clientHeight;
      this.context.drawImage(this.img, left, this.iconPadding.top, iconSize * ratio, iconSize);
      left += iconSize * ratio + this.iconPadding.right;
    }
    this.context.font = `${this.fontSize * antialias}px ${this.fontFace}`;
    this.context.fillText(this.text, left, this.h - this.padding.bottom);
    this.texture.needsUpdate = true;
    this.setScale();
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

  updatePosition(camera) {
    if (this.visible) {
      const angle = camera.position.angleTo(this.anchorObject.position);
      if (Math.abs(angle) < 1) {
        this.sprite.visible = true;
      } else {
        this.sprite.visible = false;
      }
    }
  }

  setScale() {
    const f = 0.5 / (this.scene.scale.x * 2);
    if (this.anchorObject) {
      this.anchorObject.scale.set(f, f, f);
    }
    this.sprite.scale.set(this.canvas.width * 0.16 * f,
      this.canvas.height * 0.16 * f, 1);
  }

  setPosition(position) {
    this.position = position;
    this.sprite.position.set(position.x, position.y + this.margin, position.z);
    if (this.anchorObject != null) {
      this.anchorObject.position.set(position.x, position.y, position.z);
    }
  }

  setVisible(v, hideObject = true) {
    this.visible = v;
    this.sprite.visible = v;
    if (hideObject) {
      this.anchorObject.visible = v;
    }
  }
}
// module.exports = Label; // eslint-disable-line no-undef
export default THREELabel;
