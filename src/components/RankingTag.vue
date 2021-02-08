<template>
  <span
    v-text="text"
  />
</template>

<script>
import {
  types,
} from '@/assets';
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
      const text = parseTag(this.rank.tags, 'type') === types.repository.value ? 'All' : 'Global';
      return language || location || text;
    },
  },
};
</script>
