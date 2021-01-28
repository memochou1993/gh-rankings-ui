<template>
  <div>
    <v-btn
      :ripple="false"
      text
      x-small
    >
      <span
        v-text="rank.totalCount.toLocaleString()"
        class="title font-weight-light"
      />
      <v-icon
        v-text="icon"
        :size="20"
        right
      />
    </v-btn>
  </div>
</template>

<script>
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
        case tags.includes('followers'):
          return 'mdi-account-group-outline ';
        case tags.includes('watchers'):
          return 'mdi-eye-outline';
        case tags.includes('stargazers'):
          return 'mdi-star-outline';
        case tags.includes('forks'):
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
