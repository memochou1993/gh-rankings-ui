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
        @click="$router.push('/').catch(() => {})"
        v-text="'GH Rankings'"
      />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>
