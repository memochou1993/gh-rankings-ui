<template>
  <v-icon
    :size="20"
    right
    v-text="icon"
  />
</template>

<script>
import fields from '@/assets/field';

export default {
  name: 'RankingIcon',
  props: {
    field: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      switch (true) {
        case this.field.includes(fields.followers.value):
          return 'mdi-account-group-outline';
        case this.field.includes(fields.stars.value):
          return 'mdi-star-outline';
        case this.field.includes(fields.forks.value):
          return 'mdi-source-fork';
        case this.field.includes(fields.watchers.value):
          return 'mdi-eye-outline';
        default:
          return '';
      }
    },
  },
};
</script>
