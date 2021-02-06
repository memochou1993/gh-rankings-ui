<template>
  <span
    v-text="text"
  />
</template>

<script>
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
      return this.find('language') || this.find('location') || 'Global';
    },
  },
  methods: {
    find(target) {
      const text = this.rank.tags.find((tag) => String(tag).includes(target)) || '';
      const prefix = `${target}:`;
      const [tag] = text.replace(prefix, '').split(', ');
      return tag;
    },
  },
};
</script>
