<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-text
        class="title font-weight-light text-center py-16"
      >
        <span
          v-text="message"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'RankingError',
  computed: {
    message() {
      return this.$store.state.error?.message || 'No ranking found';
    },
  },
};
</script>
