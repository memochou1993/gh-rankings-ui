<template>
  <v-card
    :elevation="5"
  >
    <v-card-title
      class="headline"
    >
      <RankingAvatar
        :alt="name"
        :src="imageUrl"
        size="100%"
      />
    </v-card-title>
    <v-card-text
      class="text-center"
    >
      <div
        class="title font-weight-regular text--primary pointer"
        @click="open()"
        v-text="name"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import {
  open,
} from '@/helpers';
import RankingAvatar from '@/components/RankingAvatar';

export default {
  name: 'RankingProfile',
  components: {
    RankingAvatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    open() {
      open(`https://github.com/${this.name}`);
    },
  },
};
</script>
