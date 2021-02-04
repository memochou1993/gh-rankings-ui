<template>
  <div>
    <v-footer
      app
      color="primary primary-gradient"
      dark
      padless
    >
      <v-col
        class="font-weight-light text-center py-2"
      >
        <span
          class="pointer"
          @click="explore()"
          v-text="`© ${new Date().getFullYear()} GH Rankings`"
        />
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import helpers from '@/util/helpers';

export default {
  name: 'TheFooter',
  methods: {
    explore() {
      helpers.open('https://github.com/memochou1993/gh-rankings');
    },
  },
};
</script>
