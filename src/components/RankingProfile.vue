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
        <v-card
          :elevation="5"
        >
          <v-card-text
            class="pa-0"
          >
            <RankingGroup
              :ranks="stargazers"
              title="Stargazers Ranking"
            />
            <v-divider />
            <RankingGroup
              :ranks="forks"
              title="Forks Ranking"
            />
            <v-divider />
            <RankingGroup
              :ranks="watchers"
              title="Watchers Ranking"
            />
          </v-card-text>
        </v-card>
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
    stargazers() {
      return this.ranks.filter((rank) => rank.tags.join(',').includes('stargazers'));
    },
    forks() {
      return this.ranks.filter((rank) => rank.tags.join(',').includes('forks'));
    },
    watchers() {
      return this.ranks.filter((rank) => rank.tags.join(',').includes('watchers'));
    },
  },
  methods: {
    open() {
      window.open(`https://github.com/${this.name}`, '_blank', 'noreferrer noopener');
    },
  },
};
</script>
