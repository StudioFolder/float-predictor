<template>
    <div class="flightForm__container">
        <b-form @submit="onSubmit">
            <b-form-group>
                <b-form-checkbox id="FlightTypeSelector"
                                 v-model="flightType"
                                 value="free"
                                 unchecked-value="planned">
                    {{label}}
                </b-form-checkbox>
                <div>State: <strong>{{flightType}}</strong></div>
            </b-form-group>

            <b-form-group id="exampleInputGroup1"
                          label="Email address:"
                          label-for="exampleInput1"
                          description="We'll never share your email with anyone else.">
                <b-form-input id="exampleInput1"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="Enter email">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>
<script>

export default {
  name: 'flight-form',
  data() {
    return {
      options: [
        { text: 'Planned Flight', value: 'planned' },
        { text: 'Free Flight', value: 'free' },
      ],
      form: {
        departure: '',
        destination: '',
      },
    };
  },
  computed: {
    flightType: {
      get() {
        return this.$store.state.flightSimulator.flightType;
      },
      set(value) {
        this.$store.commit('flightSimulator/changeFlightType', value);
      },
    },
    label() {
      return (this.$store.getters['flightSimulator/isFreeFlight'])
        ? 'Planned Flights try to reach a specific destination starting from a selected departure point.'
        : 'Free Flights are different';
    },
  },
  methods: {
    onSubmit() {
      // console.log('submitted');
    },
  },
};
</script>
<style lang="scss">
    .flightForm__container {

    }
</style>
