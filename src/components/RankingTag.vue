<template>
  <span
    v-text="text"
  />
</template>

<script>
import {
  types,
} from '@/assets';

export default {
  name: 'RankingTag',
  props: {
    rank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    default() {
      return this.rank.type === types.repository.value ? 'All' : 'Global';
    },
    text() {
      return this.rank.language || this.rank.location.split(', ').shift() || this.default;
    },
  },
};
</script>
