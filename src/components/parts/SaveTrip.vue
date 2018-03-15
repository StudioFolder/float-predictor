<template>
    <b-form @submit="onSubmit" class="flight-form">
        <div class="name-selector-group selector-group">
            <div>
                <b-form-input id="name" type="text" placeholder="Enter your name here">
                </b-form-input>
            </div>
            <div>
                <b-form-input id="email" type="email" placeholder="example@mail.com">
                </b-form-input>
            </div>
        </div>
        <p class="input-label">
            You can associate your name to the aeroglyph,
            and leave your e-mail to receive a
            postcard about your flight.
        </p>
        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>
<script>
export default {
  name: 'save-trip',
};
</script>
