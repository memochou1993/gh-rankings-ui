<template>
  <v-row
    justify="center"
  >
    <v-col
      :cols="12"
      :sm="8"
      class="py-10"
    >
      <v-fade-transition>
        <v-row>
          <v-col
            :cols="12"
            :md="2"
            :style="`${$vuetify.breakpoint.mdAndUp ? 'position:fixed' : '' }`"
          >
            <RankingProfile
              v-if="loaded"
              :profile="profile"
            />
            <RankingLoader
              v-else
              :height="160"
              type="card"
            />
          </v-col>
          <v-col
            :cols="12"
            :md="9"
            :offset-md="3"
          >
            <template
              v-if="loaded"
            >
              <template
                v-if="ranks.length > 0"
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
                    :profile="profile"
                    class="mb-6"
                  />
                </template>
                <RankingTimestamp
                  :ranks="ranks"
                />
              </template>
              <RankingError
                v-else
                :message="$store.state.error.message || ''"
              />
            </template>
            <RankingLoader
              v-else
              :height="600"
              type="list-item-two-line@3"
            />
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
import {
  fields,
} from '@/assets';
import {
  scrollToTop,
} from '@/helpers';
import RankingError from '@/components/RankingError';
import RankingGroup from '@/components/RankingGroup';
import RankingLoader from '@/components/RankingLoader';
import RankingProfile from '@/components/RankingProfile';
import RankingTimestamp from '@/components/RankingTimestamp';

export default {
  name: 'Profile',
  components: {
    RankingError,
    RankingGroup,
    RankingLoader,
    RankingProfile,
    RankingTimestamp,
  },
  data: () => ({
    loaded: false,
    profile: {},
    ranks: [],
    page: 1,
    limit: 1000,
  }),
  computed: {
    groups() {
      return [
        {
          title: 'Followers Ranking',
          category: 'Location',
          ranks: this.filter(fields.followers.value, false),
        },
        {
          title: 'Repository Stars Ranking',
          category: 'Location',
          ranks: this.filter(fields.repositoryStars.value, false),
        },
        {
          title: 'Repository Forks Ranking',
          category: 'Location',
          ranks: this.filter(fields.repositoryForks.value, false),
        },
        {
          title: 'Repository Watchers Ranking',
          category: 'Location',
          ranks: this.filter(fields.repositoryWatchers.value, false),
        },
        {
          title: 'Repository Stars Ranking by Language',
          category: 'Language',
          ranks: this.filter(fields.repositoryStars.value, true),
        },
        {
          title: 'Repository Forks Ranking by Language',
          category: 'Language',
          ranks: this.filter(fields.repositoryForks.value, true),
        },
        {
          title: 'Repository Watchers Ranking by Language',
          category: 'Language',
          ranks: this.filter(fields.repositoryWatchers.value, true),
        },
        {
          title: 'Gist Stars Ranking',
          category: 'Location',
          ranks: this.filter(fields.gistStars.value, false),
        },
        {
          title: 'Gist Forks Ranking',
          category: 'Location',
          ranks: this.filter(fields.gistForks.value, false),
        },
        {
          title: 'Stars Ranking',
          category: 'Language',
          ranks: this.filter(fields.stars.value),
        },
        {
          title: 'Forks Ranking',
          category: 'Language',
          ranks: this.filter(fields.forks.value),
        },
        {
          title: 'Watchers Ranking',
          category: 'Language',
          ranks: this.filter(fields.watchers.value),
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
    setProfile(profile) {
      this.profile = profile;
    },
    setRanks(ranks) {
      this.ranks = ranks;
    },
    async fetch() {
      try {
        const ranks = await this.$store.dispatch('fetch', this.params);
        if (ranks.data.length === 0) {
          throw new Error();
        }
        this.setRanks(ranks.data);
        const profile = await this.$store.dispatch('show', {
          type: ranks.data[0]?.type,
          name: this.$route.params.name,
        });
        this.setProfile(profile.data);
        this.setLoaded(true);
      } catch (error) {
        this.$router.push('/');
      }
    },
    filter(field, language) {
      return this.ranks
        .filter((rank) => rank.field === field)
        .filter((rank) => {
          if (language === undefined) {
            return true;
          }
          return language ? rank.language !== '' : rank.language === '';
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    scrollToTop();
    next();
  },
};
</script>
