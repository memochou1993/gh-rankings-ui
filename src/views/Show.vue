<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        sm="8"
      >
        <v-fade-transition>
          <v-row
            v-if="loaded"
            class="mt-3"
          >
            <v-col
              sm="3"
            >
              <RankingProfile
                :name="name"
                :image-url="imageUrl"
              />
            </v-col>
            <v-col
              sm="9"
            >
              <template
                v-for="(group, i) in groups"
              >
                <RankingGroup
                  v-if="group.ranks.length > 0"
                  :key="i"
                  :category="group.category"
                  :title="group.title"
                  :type="group.type"
                  :ranks="group.ranks"
                  class="mb-6"
                />
              </template>
            </v-col>
          </v-row>
        </v-fade-transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RankingGroup from '@/components/RankingGroup';
import RankingProfile from '@/components/RankingProfile';

export default {
  name: 'Show',
  components: {
    RankingGroup,
    RankingProfile,
  },
  data: () => ({
    loaded: false,
    page: 1,
    limit: 1000,
    ranks: [],
  }),
  computed: {
    name() {
      return this.$route.params.name;
    },
    imageUrl() {
      return this.ranks[0]?.imageUrl || '';
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
    params() {
      return {
        name: this.name,
        page: this.page,
        limit: this.limit,
      };
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    setLoaded(loaded) {
      this.loaded = loaded;
    },
    setRanks(ranks) {
      this.ranks = ranks;
    },
    async fetch() {
      const { data } = await this.$store.dispatch('fetch', this.params);
      this.setRanks(data);
      this.setLoaded(true);
    },
    filter(tags, length = -1) {
      return this.ranks
        .filter((rank) => tags.every((tag) => rank.tags.join(',').includes(tag)))
        .filter((rank) => length === -1 || rank.tags.length === length);
    },
  },
};
</script>
