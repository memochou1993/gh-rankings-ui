<template>
  <v-card
    :elevation="5"
  >
    <v-card-text
      class="title font-weight-light text-center py-16"
    >
      <span
        v-text="message || 'No ranking found'"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'RankingError',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
