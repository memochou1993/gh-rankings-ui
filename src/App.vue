<template>
  <v-app>
    <TheHeader />
    <v-main>
      <v-container
        fluid
      >
        <router-view />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheFooter from '@/components/TheFooter';
import TheHeader from '@/components/TheHeader';

export default {
  name: 'App',
  components: {
    TheFooter,
    TheHeader,
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
.primary-gradient {
  background-image: linear-gradient(to right top, #061D30, #2C4C68);
}
</style>
