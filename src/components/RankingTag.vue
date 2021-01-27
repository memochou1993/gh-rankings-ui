<template>
  <span>
    <v-chip
      :color="color"
      label
      outlined
      class="mr-2"
    >
      {{ content }}
    </v-chip>
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
