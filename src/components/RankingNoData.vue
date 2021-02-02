<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-text
        class="title font-weight-light text-center py-16"
      >
        <span
          v-text="'Not Found'"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'RankingNoData',
};
</script>
