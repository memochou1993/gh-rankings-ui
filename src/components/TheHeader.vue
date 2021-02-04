<template>
  <v-app-bar
    app
    color="primary primary-gradient"
    dark
    dense
    class="headline font-weight-light"
  >
    <span
      class="pointer"
      @click="reload()"
      v-text="'GH Rankings'"
    />
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    reload() {
      window.location.assign('/');
    },
  },
};
</script>
