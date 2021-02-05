<template>
  <v-row
    justify="center"
  >
    <v-col
      :cols="10"
      :sm="8"
      class="mt-6"
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
                  class="font-weight-light my-5"
                />
              </template>
              <RankingError
                v-else
                :message="$store.state.error.message || ''"
              />
            </template>
            <RankingLoader
              v-else
              :height="400"
              type="list-item-two-line@5"
            />
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
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
      const last = Math.ceil(this.$store.getters.rankCount / this.limit);
      const max = this.limit * 10;
      const pages = last > max ? max : last;
      if (last > max && this.page > pages) {
        return last;
      }
      return pages;
    },
    params() {
      return {
        type: this.$store.state.query.type,
        field: this.$store.state.query.field,
        language: this.$store.state.query.language,
        page: this.page,
        limit: this.limit,
      };
    },
    isSamePage() {
      return this.page === Number(this.$route.query.page);
    },
  },
  watch: {
    $route() {
      this.retrieve();
      this.restore();
      this.fetch();
    },
    page(after) {
      this.updateRoute(after);
    },
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
    retrieve() {
      this.setPage(Number(this.$route.query.page) || 1);
    },
    restore() {
      this.$store.commit('setQuery', {
        type: this.$route.query.type || this.$store.state.query.type,
        field: this.$route.query.field || this.$store.state.query.field,
        language: this.$route.query.language || this.$store.state.query.language,
      });
    },
    updateRoute(after) {
      if (this.isSamePage) {
        return;
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          page: String(after),
        },
      });
    },
    async fetch() {
      this.$store.dispatch('fetch', this.params)
        .then(({ data }) => {
          this.$store.commit('setRanks', data.filter((rank) => rank.itemCount > 0));
        })
        .catch(() => {})
        .finally(() => {
          this.setLoaded(true);
        });
    },
  },
};
</script>
