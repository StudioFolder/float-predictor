import THREELabel from './THREELabel';
import CityLabels from './CityLabels';
import DaysLabels from './DaysLabels';

const THREE = require('three');


class Labels {
  constructor(scene, camera, radius) {
    this.daysLabels = new DaysLabels(scene, camera, radius);
    this.cityLabels = new CityLabels(scene, camera, radius);
    this.scene = scene;
    this.camera = camera;
    this.radius = radius;
    const departureSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.005, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xffffff }));
    scene.add(departureSphere);
    this.departureLabel = new THREELabel(scene, camera, 'Colfax-Medium', 8, 'rgba(30,30,30,1)',
      'rgba(255,255,255,1)', departureSphere);
    this.departureLabel.setIcon(document.getElementById('up'));
    this.departureLabel.set('', this.departureLabel.anchorObject.position);
    this.departureLabel.setVisible(false);
    this.departureLabel.margin = 4;

    const destinationSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.005, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xffffff }));
    scene.add(destinationSphere);
    this.destinationLabel = new THREELabel(scene, camera, 'Colfax-Medium', 8, 'rgba(30,30,30,1)',
      'rgba(255,255,255,1)', destinationSphere);
    this.destinationLabel.setIcon(document.getElementById('down'));
    this.destinationLabel.margin = 4;
  }

  update(onboard = false) {
    if (onboard) {
      this.cityLabels.updatePosition(onboard);
    }
    this.daysLabels.updatePosition(onboard);
    this.destinationLabel.updatePosition(onboard);
    this.departureLabel.updatePosition(onboard);
  }

  setVisible(v) {
    this.cityLabels.setVisible(v);
    this.daysLabels.setVisible(v);
    this.destinationLabel.setVisible(v);
    this.departureLabel.setVisible(v);
  }

  setScale(s) {
    let t = Math.min(200, -200 + this.camera.position.distanceTo(new THREE.Vector3())) / 200;
    t = (0.06 * t) / (s ** 1.4); // ((t * s) ** 0.8); // (s ** 1.3);
    this.cityLabels.setScale(t);
    this.daysLabels.setScale(t);
    this.destinationLabel.setScale(t);
    this.departureLabel.setScale(t);
  }
}
export default Labels;
