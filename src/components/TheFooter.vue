<template>
  <div>
    <v-footer
      dark
      padless
      class="primary"
    >
      <v-col
        class="font-weight-light text-center"
      >
        <span
          class="pointer"
          @click="open()"
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
    open() {
      helpers.open('https://github.com/memochou1993/gh-rankings');
    },
  },
};
</script>
