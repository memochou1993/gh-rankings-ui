<template>
  <v-card
    :elevation="5"
  >
    <v-card-text>
      <v-skeleton-loader
        :height="height"
        :type="type"
        tile
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'RankingLoader',
  props: {
    height: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
