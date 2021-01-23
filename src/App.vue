<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      GitHub Rankings
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheFooter from '@/components/TheFooter';

export default {
  name: 'App',
  components: {
    TheFooter,
  },
};
</script>
