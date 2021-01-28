<template>
  <span>
    {{ content }}
  </span>
</template>

<script>
export default {
  name: 'RankingTag',
  props: {
    color: {
      type: String,
      default: 'primary',
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
