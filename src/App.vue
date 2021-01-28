<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view />
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
</style>
