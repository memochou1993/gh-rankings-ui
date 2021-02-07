<template>
  <div
    class="font-weight-light text--secondary text-right"
    v-text="`Last updated: ${createdAt}`"
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
      return this.ranks[0]?.createdAt?.split('T')[0] || '';
    },
  },
};
</script>
