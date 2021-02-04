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
      return this.rank.rank <= this.rank.last ? `${this.rank.rank.toLocaleString()} / ${this.rank.last.toLocaleString()}` : '-';
    },
  },
};
</script>
