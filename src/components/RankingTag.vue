<template>
  <span
    v-text="text"
  />
</template>

<script>
import {
  parseTag,
} from '@/helpers';

export default {
  name: 'RankingTag',
  props: {
    rank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    text() {
      const language = parseTag(this.rank.tags, 'language');
      const location = parseTag(this.rank.tags, 'location')?.split(', ').shift();
      return language || location || 'Global';
    },
  },
};
</script>
