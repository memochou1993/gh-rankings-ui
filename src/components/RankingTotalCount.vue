<template>
  <div>
    <v-btn
      :ripple="false"
      text
      x-small
    >
      <span
        class="title font-weight-light"
        v-text="rank.totalCount.toLocaleString()"
      />
      <v-icon
        :size="20"
        right
        v-text="icon"
      />
    </v-btn>
  </div>
</template>

<script>
import fields from '@/util/fields';

export default {
  name: 'RankingTotalCount',
  props: {
    rank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icon() {
      const tags = this.rank.tags.join(',');
      switch (true) {
        case tags.includes(fields.followers):
          return 'mdi-account-group-outline ';
        case tags.includes(fields.watchers):
          return 'mdi-eye-outline';
        case tags.includes(fields.stargazers):
          return 'mdi-star-outline';
        case tags.includes(fields.forks):
          return 'mdi-source-fork';
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
