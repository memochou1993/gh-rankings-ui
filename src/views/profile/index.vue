<template>
  <v-row
    justify="center"
  >
    <v-col
      :cols="10"
      :sm="8"
    >
      <v-fade-transition>
        <v-row
          v-if="loaded"
          class="mt-3"
        >
          <template
            v-if="ranks.length > 0"
          >
            <v-col
              :md="2"
              :style="`${$vuetify.breakpoint.mdAndUp ? 'position:fixed' : '' }`"
            >
              <RankingProfile
                :name="name"
                :image-url="imageUrl"
              />
            </v-col>
            <v-col
              :md="9"
              :offset-md="3"
            >
              <template
                v-for="(group, i) in groups"
              >
                <RankingGroup
                  v-if="group.ranks.length > 0"
                  :key="i"
                  :category="group.category"
                  :ranks="group.ranks"
                  :title="group.title"
                  class="mb-6"
                />
              </template>
            </v-col>
          </template>
          <template
            v-else
          >
            <v-col>
              <RankingError
                :message="$store.state.error.message || 'No ranking found'"
              />
            </v-col>
          </template>
        </v-row>
        <RankingLoader
          v-else
        />
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
import fields from '@/assets/field';
import types from '@/assets/type';
import RankingError from '@/components/RankingError';
import RankingGroup from '@/components/RankingGroup';
import RankingLoader from '@/components/RankingLoader';
import RankingProfile from '@/components/RankingProfile';

export default {
  name: 'Profile',
  components: {
    RankingError,
    RankingGroup,
    RankingLoader,
    RankingProfile,
  },
  data: () => ({
    loaded: false,
    ranks: [],
    page: 1,
    limit: 1000,
  }),
  computed: {
    name() {
      return this.ranks[0]?.name || '';
    },
    imageUrl() {
      return this.ranks[0]?.imageUrl || '';
    },
    groups() {
      return [
        {
          title: 'Followers Ranking',
          category: 'Location',
          ranks: this.filter([fields.followers.value]),
        },
        {
          title: 'Repository Stars Ranking',
          category: 'Location',
          ranks: [
            ...this.filter([fields.repositoryStars.value], 2),
            ...this.filter([fields.repositoryStars.value, 'location']),
          ],
        },
        {
          title: 'Repository Forks Ranking',
          category: 'Location',
          ranks: [
            ...this.filter([fields.repositoryForks.value], 2),
            ...this.filter([fields.repositoryForks.value, 'location']),
          ],
        },
        {
          title: 'Repository Watchers Ranking',
          category: 'Location',
          ranks: [
            ...this.filter([fields.repositoryWatchers.value], 2),
            ...this.filter([fields.repositoryWatchers.value, 'location']),
          ],
        },
        {
          title: 'Repository Stars Ranking by Language',
          category: 'Language',
          ranks: this.filter([fields.repositoryStars.value, 'language']),
        },
        {
          title: 'Repository Forks Ranking by Language',
          category: 'Language',
          ranks: this.filter([fields.repositoryForks.value, 'language']),
        },
        {
          title: 'Repository Watchers Ranking by Language',
          category: 'Language',
          ranks: this.filter([fields.repositoryWatchers.value, 'language']),
        },
        {
          title: 'Gist Stars Ranking',
          category: 'Location',
          ranks: this.filter([fields.gistStars.value]),
        },
        {
          title: 'Gist Forks Ranking',
          category: 'Location',
          ranks: this.filter([fields.gistForks.value]),
        },
        {
          title: 'Stars Ranking',
          category: 'Language',
          ranks: this.filter([types.repository.value, fields.stars.value]),
        },
        {
          title: 'Forks Ranking',
          category: 'Language',
          ranks: this.filter([types.repository.value, fields.forks.value]),
        },
        {
          title: 'Watchers Ranking',
          category: 'Language',
          ranks: this.filter([types.repository.value, fields.watchers.value]),
        },
      ];
    },
    params() {
      return {
        name: this.$route.params.name,
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
      this.$store.dispatch('fetch', this.params)
        .then(({ data }) => {
          this.setRanks(data);
        })
        .catch(() => {})
        .finally(() => {
          this.setLoaded(true);
        });
    },
    filter(tags, length) {
      return this.ranks
        .filter((rank) => tags.every((tag) => rank.tags.join(',').includes(tag)))
        .filter((rank) => !length || rank.tags.length === length);
    },
  },
};
</script>
