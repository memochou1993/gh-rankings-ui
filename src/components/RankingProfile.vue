<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
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
      </v-col>
      <v-col
        sm="9"
      >
        <span
          v-for="(group, i) in groups"
          :key="i"
        >
          <RankingGroup
            v-if="group.ranks.length > 0"
            :category="group.category"
            :title="group.title"
            :type="group.type"
            :ranks="group.ranks"
            class="mb-5"
          />
        </span>
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
    groups() {
      return [
        {
          category: 'Location',
          title: 'Followers Ranking',
          type: 'Followers',
          ranks: [
            ...this.filter(['followers'], 2),
            ...this.filter(['followers', 'location']),
          ],
        },
        {
          category: 'Language',
          title: 'Repository Stars Ranking',
          type: 'Stars',
          ranks: [
            ...this.filter(['repositories', 'stargazers'], 2),
            ...this.filter(['repositories', 'stargazers', 'language']),
          ],
        },
        {
          category: 'Language',
          title: 'Repository Forks Ranking',
          type: 'Forks',
          ranks: [
            ...this.filter(['repositories', 'forks'], 2),
            ...this.filter(['repositories', 'forks', 'language']),
          ],
        },
        {
          category: 'Language',
          title: 'Repository Watchers Ranking',
          type: 'Watchers',
          ranks: [
            ...this.filter(['repositories', 'watchers'], 2),
            ...this.filter(['repositories', 'watchers', 'language']),
          ],
        },
        {
          category: 'Language',
          title: 'Stars Ranking',
          type: 'Stars',
          ranks: [
            ...this.filter(['repository', 'stargazers'], 2),
            ...this.filter(['repository', 'stargazers', 'language']),
          ],
        },
        {
          category: 'Language',
          title: 'Forks Ranking',
          type: 'Forks',
          ranks: [
            ...this.filter(['repository', 'forks'], 2),
            ...this.filter(['repository', 'forks', 'language']),
          ],
        },
        {
          category: 'Language',
          title: 'Watchers Ranking',
          type: 'Watchers',
          ranks: [
            ...this.filter(['repository', 'watchers'], 2),
            ...this.filter(['repository', 'watchers', 'language']),
          ],
        },
      ];
    },
  },
  methods: {
    filter(tags, length = -1) {
      return this.ranks
        .filter((rank) => tags.every((tag) => rank.tags.join(',').includes(tag)))
        .filter((rank) => length === -1 || rank.tags.length === length);
    },
    open() {
      window.open(`https://github.com/${this.name}`, '_blank', 'noreferrer noopener');
    },
  },
};
</script>
