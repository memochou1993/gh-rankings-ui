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
            <v-col
              :md="2"
              :style="`${$vuetify.breakpoint.mdAndUp ? 'position:fixed' : '' }`"
            >
              <RankingFilter />
            </v-col>
            <v-col
              :md="9"
              :offset-md="3"
            >
              <template
                v-if="$store.state.ranks.length > 0"
              >
                <RankingList />
                <v-pagination
                  v-model="page"
                  :length="pages"
                  :total-visible="9"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  class="font-weight-light my-5"
                />
              </template>
              <template
                v-else
              >
                <RankingError
                  :message="$store.state.error.message || 'No ranking found'"
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
import RankingError from '@/components/RankingError';
import RankingFilter from './filter';
import RankingList from './list';

export default {
  name: 'Home',
  components: {
    RankingError,
    RankingFilter,
    RankingList,
  },
  data: () => ({
    loaded: false,
    page: 1,
    limit: 10,
  }),
  computed: {
    last() {
      return this.$store.state.ranks[0]?.last || 0;
    },
    pages() {
      const last = Math.ceil(this.last / this.limit);
      const limit = this.limit * 10;
      const pages = last > limit ? limit : last;
      if (last > limit && this.page > pages) {
        return last;
      }
      return pages;
    },
    params() {
      return {
        type: this.$store.state.query.type,
        field: this.$store.state.query.field,
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
          this.$store.commit('setRanks', data.filter((rank) => rank.totalCount > 0));
        })
        .catch(() => {})
        .finally(() => {
          this.setLoaded(true);
        });
    },
  },
};
</script>
