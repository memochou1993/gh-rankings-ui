<template>
  <div>
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
    <v-sheet
      :height="600"
    />
  </div>
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
