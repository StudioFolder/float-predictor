/**
 * Util.js - useful set of static functions
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/


/* eslint-disable no-mixed-operators, no-console, no-param-reassign */
const THREE = require('three');

export default {
  dayOfYear(date) {
    const j1 = new Date(date);
    j1.setMonth(0, 0);
    return Math.round((date - j1) / 8.64e7);
  },

  addHours(date, h) {
    date.setTime(date.getTime() + (h * 60 * 60 * 1000));
    return this;
  },

  getEarthPolarRotation(dt) {
    const d = this.dayOfYear(dt);
    // console.log(d);
    const interval = 183.0;
    const june22 = 173;
    const december22 = 356;
    const rotation = 0.41015; // earth/sun max angle -> 22.5

    if (d > june22) {
      if (d < december22) {
        return rotation * 2.0 * (1.0 - (d - june22) / interval) - rotation;
      }
      return rotation * 2.0 * (d - december22) / interval - rotation;
    }
    return rotation * 2.0 * (1.0 - (june22 - d) / interval) - rotation;
  },
  getEarthAzimuthRotation(d) {
    return Math.PI * 2.5 + this.getDayAlpha(d) * (2.0 * Math.PI);
  },

  getDayAlpha(d) {
    return (d.getUTCHours() * 60 + d.getUTCMinutes()) / (24.0 * 60.0);
  },

  latLon2XYZPosition(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  },
  XYZ2LatLon(coord) {
    const RAD2DEG = 180 / Math.PI;
    // var DEG2RAD = Math.PI / 180
    let lng = 90 - Math.atan2(coord.x, -coord.z) * RAD2DEG;
    const l = Math.sqrt(coord.x * coord.x + coord.z * coord.z);
    const lat = Math.atan2(coord.y, l) * RAD2DEG;
    lng = (360 + lng) % 360;
    return { lat, lng };
  },
  latlng2Rad(lat, lng) {
    return {
      lat: (1.0 - ((lat + 270) / 180.0) % 1) * Math.PI,
      lng: ((lng + 90) / 360.0) * 2 * Math.PI,
    };
  },
  /*
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var geolocation = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude)
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
      });
    }
  },
*/
  mapValue(v, minv, maxv) {
    return Math.max(Math.min(v, maxv), minv);
  },

  pad(n) {
    return (n < 10) ? (`0${n}`) : n;
  },
};
