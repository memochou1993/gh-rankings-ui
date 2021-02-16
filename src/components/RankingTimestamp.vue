<template>
  <div
    class="font-weight-light text--secondary text-right"
    v-text="`Last updated on ${updatedAt}`"
  />
</template>

<script>
export default {
  name: 'RankingTimestamp',
  props: {
    ranks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    createdAt() {
      return new Date(this.ranks[0]?.createdAt || null);
    },
    updatedAt() {
      return this.createdAt.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });
    },
  },
};
</script>
