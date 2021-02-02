<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
      class="headline font-weight-light"
    >
      <span
        class="pointer"
        @click="reload()"
        v-text="'GH Rankings'"
      />
    </v-app-bar>
  </div>
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
