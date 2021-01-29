<template>
  <div>
    <v-footer
      dark
      padless
      class="primary"
    >
      <v-col
        cols="12"
        class="font-weight-light text-center"
      >
        <span
          class="pointer"
          @click="open()"
          v-text="`© ${new Date().getFullYear()} Memo Chou`"
        />
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import util from '@/utils/util';

export default {
  name: 'TheFooter',
  methods: {
    open() {
      util.open('https://github.com/memochou1993');
    },
  },
};
</script>
