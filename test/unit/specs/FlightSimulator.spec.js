import Vue from 'vue';
import flightSimulator from 'Components/pages/FlightSimulator';

describe('FlightSimulator.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(flightSimulator);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.description').textContent)
      .to.equal('Planned floats try to reach a specific destination starting from a selected departure point.');
  });
});
