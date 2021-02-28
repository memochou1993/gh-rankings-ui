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
            <Search />
          </v-col>
          <v-col
            :cols="12"
            :md="9"
            :offset-md="3"
          >
            <template
              v-if="$store.state.loaded"
            >
              <Ranking
                v-if="$store.state.ranks.length > 0"
              />
              <RankingError
                v-else
                :message="$store.state.error.message || ''"
              />
            </template>
            <RankingLoader
              v-else
              :height="64 * limit + (limit - 1)"
              :type="`list-item-two-line@${limit}`"
            />
            <v-pagination
              v-if="pages > 1"
              v-model="page"
              :disabled="!$store.state.loaded"
              :length="pages"
              :total-visible="9"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              class="font-weight-light py-6"
            />
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
import types from '@/assets/type';
import fields from '@/assets/field';
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
    page: 1,
    limit: 20,
  }),
  computed: {
    pages() {
      if (this.$store.state.query.name !== '') {
        return 1;
      }
      const last = Math.ceil(this.$store.getters.rankCount / this.limit);
      const max = 100;
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
      return this.limit === (Number(this.$route.query.limit) || 20);
    },
    isSameQuery() {
      return this.isSamePage && this.isSameLimit;
    },
  },
  watch: {
    $route(after, before) {
      this.retrieve();
      this.restore(after, before);
      this.fetch();
    },
    query(after) {
      this.updateRoute(after);
    },
  },
  created() {
    this.retrieve();
    this.restore();
    if (this.$store.state.ranks.length > 0) {
      this.$store.commit('setLoaded', true);
      return;
    }
    this.fetch();
  },
  methods: {
    setPage(page) {
      this.page = page;
    },
    setLimit(limit) {
      this.limit = limit;
    },
    retrieve() {
      this.setPage(Number(this.$route.query.page) || 1);
      this.setLimit(Number(this.$route.query.limit) || 20);
    },
    restore(after = null, before = null) {
      const handle = (key, def) => {
        let value = this.$route.query[key] || this.$store.state.query[key];
        if (!!before?.query[key] && !after?.query[key]) {
          value = def;
        }
        return value;
      };
      this.$store.commit('setQuery', {
        type: handle('type', types.user.value),
        field: handle('field', fields.repositoryStars.value),
        language: handle('language', ''),
        location: handle('location', ''),
        name: handle('name', ''),
      });
    },
    updateRoute(after) {
      if (this.isSameQuery) {
        return;
      }
      const query = {
        ...this.$route.query,
        page: after.page !== 1 ? String(after.page) : 0,
        limit: after.limit !== 20 ? String(after.limit) : 0,
      };
      Object.entries(query).forEach(([key, val]) => !val && delete query[key]);
      this.$router.push({ query });
    },
    async fetch() {
      const ranks = await this.$store.dispatch('fetchRanks', this.params);
      if (ranks.data) this.$store.commit('setRanks', ranks.data.filter((rank) => rank.itemCount > 0));
    },
  },
};
</script>
