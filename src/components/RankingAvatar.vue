<template>
  <v-avatar
    :size="size"
    rounded
  >
    <v-img
      :alt="alt"
      :src="src"
      lazy-src="@/assets/avatar.jpg"
    />
  </v-avatar>
</template>

<script>
export default {
  name: 'RankingAvatar',
  props: {
    alt: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: '48',
    },
    src: {
      type: String,
      required: true,
    },
  },
};
</script>
