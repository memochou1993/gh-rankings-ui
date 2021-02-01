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
            v-if="ranks.length > 0"
            class="mt-3"
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
    ranks: [],
    page: 1,
    limit: 1000,
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
          field: 'Followers',
          ranks: [
            ...this.filter(['followers'], 2),
            ...this.filter(['followers', 'location']),
          ],
          title: 'Followers Ranking',
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter(['repositories', 'stargazers'], 2),
            ...this.filter(['repositories', 'stargazers', 'language']),
          ],
          title: 'Repository Stars Ranking',
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter(['repositories', 'forks'], 2),
            ...this.filter(['repositories', 'forks', 'language']),
          ],
          title: 'Repository Forks Ranking',
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter(['repositories', 'watchers'], 2),
            ...this.filter(['repositories', 'watchers', 'language']),
          ],
          title: 'Repository Watchers Ranking',
        },
        {
          category: 'Location',
          field: 'Stars',
          ranks: [
            ...this.filter(['gists', 'stargazers'], 2),
            ...this.filter(['gists', 'stargazers', 'location']),
          ],
          title: 'Gist Stars Ranking',
        },
        {
          category: 'Location',
          field: 'Forks',
          ranks: [
            ...this.filter(['gists', 'forks'], 2),
            ...this.filter(['gists', 'forks', 'location']),
          ],
          title: 'Gist Forks Ranking',
        },
        {
          category: 'Language',
          field: 'Stars',
          ranks: [
            ...this.filter(['repository', 'stargazers'], 2),
            ...this.filter(['repository', 'stargazers', 'language']),
          ],
          title: 'Stars Ranking',
        },
        {
          category: 'Language',
          field: 'Forks',
          ranks: [
            ...this.filter(['repository', 'forks'], 2),
            ...this.filter(['repository', 'forks', 'language']),
          ],
          title: 'Forks Ranking',
        },
        {
          category: 'Language',
          field: 'Watchers',
          ranks: [
            ...this.filter(['repository', 'watchers'], 2),
            ...this.filter(['repository', 'watchers', 'language']),
          ],
          title: 'Watchers Ranking',
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
    setRanks(ranks) {
      this.ranks = ranks;
    },
    async fetch() {
      const { data } = await this.$store.dispatch('fetch', this.params);
      if (data.length < 1) {
        this.$router.push('/');
        return;
      }
      this.setRanks(data);
    },
    filter(tags, length) {
      return this.ranks
        .filter((rank) => tags.every((tag) => rank.tags.join(',').includes(tag)))
        .filter((rank) => !length || rank.tags.length === length);
    },
  },
};
</script>
