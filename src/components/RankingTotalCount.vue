<template>
  <div>
    <v-btn
      :ripple="false"
      text
    >
      <span
        v-text="rank.totalCount.toLocaleString()"
      />
      <v-icon
        v-text="icon"
        right
      />
    </v-btn>
  </div>
</template>

<script>
export default {
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
          return 'mdi-account-supervisor';
        case tags.includes('watchers'):
          return 'mdi-eye-outline';
        case tags.includes('stargazers'):
          return 'mdi-star';
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
