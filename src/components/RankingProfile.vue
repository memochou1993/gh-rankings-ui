<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        xs="12"
        sm="3"
      >
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
                :src="imageUrl"
                :alt="name"
              />
            </v-avatar>
          </v-card-title>
          <v-card-text>
            <div
              @click="open()"
              class="title font-weight-light text-center pointer"
            >
              {{ name }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        xs="12"
        sm="9"
      >
        <RankingGroup
          :ranks="sort(filter(ranks, ['repositories'], 2))"
          title="Repositories Ranking"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RankingGroup from '@/components/RankingGroup';

export default {
  name: 'RankingProfile',
  components: {
    RankingGroup,
  },
  props: {
    ranks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return this.ranks[0]?.imageUrl || '';
    },
    name() {
      return this.ranks[0]?.name || '';
    },
  },
  methods: {
    filter(ranks, tags, length = -1) {
      return ranks
        .filter((rank) => tags.every((tag) => rank.tags.join(',').includes(tag)))
        .filter((rank) => length === -1 || rank.tags.length === length);
    },
    sort(ranks) {
      return [
        ...this.filter(ranks, ['followers']),
        ...this.filter(ranks, ['stargazers']),
        ...this.filter(ranks, ['forks']),
        ...this.filter(ranks, ['watchers']),
      ];
    },
    open() {
      window.open(`https://github.com/${this.name}`, '_blank', 'noreferrer noopener');
    },
  },
};
</script>
