<template>
  <div
    class="font-weight-light text--secondary text-right"
    v-text="`Last updated: ${updatedAt}`"
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
      return this.ranks[0]?.createdAt || null;
    },
    updatedAt() {
      return (new Date(this.createdAt)).toLocaleString('tw', { hour12: false }).replaceAll('/', '-');
    },
  },
};
</script>
