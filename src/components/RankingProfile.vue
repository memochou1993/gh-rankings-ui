<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-title
        class="headline"
      >
        <v-avatar
          rounded
          size="100%"
        >
          <v-img
            :alt="name"
            :src="imageUrl"
          />
        </v-avatar>
      </v-card-title>
      <v-card-text
        class="text-center"
      >
        <div
          class="title text--primary pointer"
          @click="open()"
        >
          <span
            v-text="name"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import util from '@/utils/util';

export default {
  name: 'RankingProfile',
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
      util.open(`https://github.com/${this.name}`);
    },
  },
};
</script>
