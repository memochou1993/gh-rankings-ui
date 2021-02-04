<template>
  <div
    class="text-h6 text-sm-h5 font-weight-light text-center py-4"
    v-text="title"
  />
</template>

<script>
export default {
  name: 'RankingTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
