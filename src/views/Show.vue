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
            ...this.filter([types.user.value, fields.followers.value]),
            ...this.filter([types.user.value, fields.followers.value, 'location']),
          ],
          title: `${fields.followers.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter([types.user.value, fields.repositoryStars.value]),
            ...this.filter([types.user.value, fields.repositoryStars.value, 'location']),
          ],
          title: `${fields.repositoryStars.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter([types.user.value, fields.repositoryForks.value]),
            ...this.filter([types.user.value, fields.repositoryForks.value, 'location']),
          ],
          title: `${fields.repositoryForks.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter([types.user.value, fields.repositoryWatchers.value]),
            ...this.filter([types.user.value, fields.repositoryWatchers.value, 'location']),
          ],
          title: `${fields.repositoryWatchers.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter([types.user.value, fields.repositoryStars.value, 'language']),
          ],
          title: `${fields.repositoryStars.text} Ranking by Language`,
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter([types.user.value, fields.repositoryForks.value, 'language']),
          ],
          title: `${fields.repositoryForks.text} Ranking by Language`,
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter([types.user.value, fields.repositoryWatchers.value, 'language']),
          ],
          title: `${fields.repositoryWatchers.text} Ranking by Language`,
        },
        {
          category: 'Location',
          field: 'Stars',
          ranks: [
            ...this.filter([types.user.value, fields.gistStars.value]),
            ...this.filter([types.user.value, fields.gistStars.value, 'location']),
          ],
          title: `${fields.gistStars.text} Ranking`,
        },
        {
          category: 'Location',
          field: 'Forks',
          ranks: [
            ...this.filter([types.user.value, fields.gistForks.value]),
            ...this.filter([types.user.value, fields.gistForks.value, 'location']),
          ],
          title: `${fields.gistForks.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter([types.repository.value, fields.stars.value]),
            ...this.filter([types.repository.value, fields.stars.value, 'language']),
          ],
          title: `${fields.stars.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter([types.repository.value, fields.forks.value]),
            ...this.filter([types.repository.value, fields.forks.value, 'language']),
          ],
          title: `${fields.forks.text} Ranking`,
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter([types.repository.value, fields.watchers.value]),
            ...this.filter([types.repository.value, fields.watchers.value, 'language']),
          ],
          title: `${fields.watchers.text} Ranking`,
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
    filter(tags) {
      return this.ranks
        .filter((rank) => tags.every((tag) => rank.tags.join(',').includes(tag)))
        .filter((rank) => rank.tags.length === tags.length);
    },
  },
};
</script>
