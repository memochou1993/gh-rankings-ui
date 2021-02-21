<template>
  <v-card
    :elevation="5"
  >
    <v-card-title
      class="pointer"
      @click="explore()"
    >
      <RankingAvatar
        :alt="profile.name"
        :src="profile.imageUrl"
        size="100%"
      />
    </v-card-title>
    <v-card-text
      class="text-center pointer"
      @click="explore()"
    >
      <div
        class="headline text--primary"
        v-text="profile.name"
      />
      <div
        class="title font-weight-light text--secondary"
        v-text="profile.login"
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
    profile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    explore() {
      open(`https://github.com/${this.profile.login || this.profile.nameWithOwner}`);
    },
  },
};
</script>
