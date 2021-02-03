<template>
  <div>
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
                    :field="group.field"
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
                <RankingError />
              </v-col>
            </template>
          </v-row>
        </v-fade-transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import fields from '@/util/fields';
import types from '@/util/types';
import RankingError from '@/components/RankingError';
import RankingGroup from '@/components/RankingGroup';
import RankingProfile from '@/components/RankingProfile';

export default {
  name: 'Show',
  components: {
    RankingError,
    RankingGroup,
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
          category: 'Location',
          field: 'Followers',
          ranks: [
            ...this.filter([fields.followers], 2),
            ...this.filter([fields.followers, 'location']),
          ],
          title: 'Followers Ranking',
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter([types.repository, fields.stargazers], 2),
            ...this.filter([types.repository, fields.stargazers, 'language']),
          ],
          title: 'Stars Ranking',
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter([types.repository, fields.forks], 2),
            ...this.filter([types.repository, fields.forks, 'language']),
          ],
          title: 'Forks Ranking',
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter([types.repository, fields.watchers], 2),
            ...this.filter([types.repository, fields.watchers, 'language']),
          ],
          title: 'Watchers Ranking',
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter([fields.repositories.stargazers], 2),
            ...this.filter([fields.repositories.stargazers, 'language']),
          ],
          title: 'Repository Stars Ranking',
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter([fields.repositories.forks], 2),
            ...this.filter([fields.repositories.forks, 'language']),
          ],
          title: 'Repository Forks Ranking',
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter([fields.repositories.watchers], 2),
            ...this.filter([fields.repositories.watchers, 'language']),
          ],
          title: 'Repository Watchers Ranking',
        },
        {
          category: 'Location',
          field: 'Stars',
          ranks: [
            ...this.filter([fields.gists.stargazers], 2),
            ...this.filter([fields.gists.stargazers, 'location']),
          ],
          title: 'Gist Stars Ranking',
        },
        {
          category: 'Location',
          field: 'Forks',
          ranks: [
            ...this.filter([fields.gists.forks], 2),
            ...this.filter([fields.gists.forks, 'location']),
          ],
          title: 'Gist Forks Ranking',
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
