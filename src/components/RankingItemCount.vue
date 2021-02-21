<template>
  <v-btn
    :ripple="false"
    text
    x-small
  >
    <span
      class="body-1 font-weight-light"
      v-text="itemCount.toLocaleString()"
    />
    <RankingIcon
      :field="field"
    />
  </v-btn>
</template>

<script>
import RankingIcon from '@/components/RankingIcon';

export default {
  name: 'RankingItemCount',
  components: {
    RankingIcon,
  },
  props: {
    itemCount: {
      type: Number,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  cursor: inherit;
}
.v-btn::before {
  background-color: transparent;
}
</style>
