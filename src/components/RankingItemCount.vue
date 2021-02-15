<template>
  <v-btn
    :ripple="false"
    text
    x-small
  >
    <span
      class="body-1 font-weight-light"
      v-text="rank.itemCount.toLocaleString()"
    />
    <v-icon
      :size="20"
      right
      v-text="icon"
    />
  </v-btn>
</template>

<script>
import fields from '@/assets/field';

export default {
  name: 'RankingItemCount',
  props: {
    rank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icon() {
      const { field } = this.rank;
      switch (true) {
        case field.includes(fields.followers.value):
          return 'mdi-account-group-outline';
        case field.includes(fields.stars.value):
          return 'mdi-star-outline';
        case field.includes(fields.forks.value):
          return 'mdi-source-fork';
        case field.includes(fields.watchers.value):
          return 'mdi-eye-outline';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  cursor: inherit;
}
.v-btn::before {
  background-color: transparent;
}
</style>
