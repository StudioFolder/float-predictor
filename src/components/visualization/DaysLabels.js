/**
 * DaysLabels.js - creates and defines the behaviour of days labels.
 *
*/

import _ from 'lodash';
import THREELabel from './THREELabel';

const THREE = require('three');

const NUM_LABELS = 16;

class DaysLabels {
  constructor(scene, camera, radius) {
    this.daysLabels = [];
    this.rotationIndex = 0;
    this.daysLabels = [];
    for (let i = 0; i < NUM_LABELS; i += 1) {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.001, 5, 5),
        new THREE.MeshBasicMaterial({ color: 0xffffff }));
      scene.add(sphere);
      const label = new THREELabel(scene, camera, 'Colfax-Medium', 11, 'rgba(30,30,30,0)', 'rgba(255,255,255,1)', sphere);
      this.daysLabels.push(label);
    }
  }

  updatePosition() {
    _.each(this.daysLabels, (l) => { l.updatePosition(); });
  }

  setVisible(visible) {
    _.each(this.daysLabels, (l) => { l.setVisible(visible); });
  }

  setScale(t) {
    _.each(this.daysLabels, (l) => { l.setScale(t); });
  }
  /**
   * Fill and show the labels with the days info for the trajectory.
   * @param {Integer} explorerIndex
   * @param {Array} explorers
   */
  show(explorerIndex, explorers) {
    this.setVisible(false);
    for (let j = explorerIndex + 1; j <= this.daysLabels.length; j += 1) {
      const dt = new Date();// this.valueOf()
      dt.setDate(dt.getDate() + j);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const text = `${dt.getDate()} ${monthNames[dt.getMonth()]}`;
      const alpha = j / 16.0;
      if (alpha < explorers[explorerIndex].getAlpha()) {
        this.daysLabels[j - 1].set(text, explorers[explorerIndex].getPosition(alpha));
        this.daysLabels[j - 1].updatePosition();
      } else {
        break;
      }
    }
  }
}
export default DaysLabels;
