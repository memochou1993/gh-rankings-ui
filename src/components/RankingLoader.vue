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
      v-show="sheet"
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
    sheet: {
      type: Boolean,
      required: false,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
