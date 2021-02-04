<template>
  <span
    v-text="text"
  />
</template>

<script>
export default {
  name: 'RankingRank',
  props: {
    rank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    text() {
      return this.rank.rank <= this.rank.totalRank ? `${this.rank.rank.toLocaleString()} / ${this.rank.totalRank.toLocaleString()}` : '-';
    },
  },
};
</script>
