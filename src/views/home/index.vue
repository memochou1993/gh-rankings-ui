<template>
  <v-row
    justify="center"
  >
    <v-col
      :cols="10"
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
            <Search />
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
                v-if="$store.state.ranks.length > 0"
              >
                <Ranking />
                <v-pagination
                  v-model="page"
                  :length="pages"
                  :total-visible="9"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  class="font-weight-light py-6"
                />
              </template>
              <RankingError
                v-else
                :message="$store.state.error.message || ''"
              />
            </template>
            <RankingLoader
              v-else
              :height="800"
              :type="`list-item-two-line@${limit}`"
            />
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
import {
  defer,
  scrollToTop,
} from '@/helpers';
import RankingError from '@/components/RankingError';
import RankingLoader from '@/components/RankingLoader';
import Ranking from './ranking';
import Search from './search';

export default {
  name: 'Home',
  components: {
    Ranking,
    RankingError,
    RankingLoader,
    Search,
  },
  data: () => ({
    loaded: false,
    page: 1,
    limit: 10,
  }),
  computed: {
    pages() {
      if (this.$store.state.ranks.length === 1) {
        return 1;
      }
      const last = Math.ceil(this.$store.getters.rankCount / this.limit);
      const max = this.limit * 10;
      const pages = last > max ? max : last;
      if (this.page > pages) {
        return last;
      }
      return pages;
    },
    query() {
      return {
        page: this.page,
        limit: this.limit,
      };
    },
    params() {
      return {
        ...this.$store.state.query,
        ...this.query,
      };
    },
    isSamePage() {
      return this.page === (Number(this.$route.query.page) || 1);
    },
    isSameLimit() {
      return this.limit === (Number(this.$route.query.limit) || 10);
    },
  },
  watch: {
    $route() {
      this.retrieve();
      this.restore();
      this.fetch();
    },
    query(after) {
      this.updateRoute(after);
    },
  },
  beforeRouteEnter(to, from, next) {
    scrollToTop();
    next();
  },
  created() {
    this.retrieve();
    this.restore();
    this.fetch();
  },
  methods: {
    setLoaded(loaded) {
      this.loaded = loaded;
    },
    setPage(page) {
      this.page = page;
    },
    setLimit(limit) {
      this.limit = limit;
    },
    retrieve() {
      this.setPage(Number(this.$route.query.page) || 1);
      this.setLimit(Number(this.$route.query.limit) || 10);
    },
    restore() {
      this.$store.commit('setQuery', {
        type: this.$route.query.type || this.$store.state.query.type,
        field: this.$route.query.field || this.$store.state.query.field,
        language: this.$route.query.language || this.$store.state.query.language,
        location: this.$route.query.location || this.$store.state.query.location,
        name: this.$route.query.name || this.$store.state.query.name,
      });
    },
    updateRoute(after) {
      if (this.isSamePage && this.isSameLimit) {
        return;
      }
      const query = {
        ...this.$route.query,
        page: after.page !== 1 ? String(after.page) : 0,
        limit: after.limit !== 10 ? String(after.limit) : 0,
      };
      Object.entries(query).forEach(([key, val]) => !val && delete query[key]);
      this.$router.push({ query });
    },
    async fetch() {
      this.$store.dispatch('fetch', this.params)
        .then(({ data }) => {
          this.$store.commit('setRanks', data.filter((rank) => rank.itemCount > 0));
        })
        .catch(() => {})
        .finally(async () => {
          await defer(0.25);
          await this.setLoaded(true);
        });
    },
  },
};
</script>
