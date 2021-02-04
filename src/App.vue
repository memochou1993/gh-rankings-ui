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
html {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.primary-gradient {
  background-image: linear-gradient(to right, #061D30, #2C4C68);
}

.pointer {
  &, .v-input__slot, input {
    cursor: pointer !important;
  }
}
</style>
