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
export default {
  name: 'TheFooter',
  methods: {
    open() {
      window.open('https://github.com/memochou1993', '_blank', 'noreferrer noopener');
    },
  },
};
</script>
