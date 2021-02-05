<template>
  <v-row>
    <v-col
      :cols="12"
      :md="2"
      :style="`${$vuetify.breakpoint.mdAndUp ? 'position:fixed' : '' }`"
    >
      <v-skeleton-loader
        type="card"
      />
    </v-col>
    <v-col
      :cols="12"
      :md="9"
      :offset-md="3"
    >
      <v-skeleton-loader
        height="1200"
        type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'RankingLoader',
};
</script>
