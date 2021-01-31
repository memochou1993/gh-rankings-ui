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
            class="mt-3"
          >
            <v-col
              :md="2"
              :style="`${$vuetify.breakpoint.mdAndUp ? 'position:fixed' : '' }`"
            >
              <RankingSearch />
            </v-col>
            <v-col
              v-if="$store.state.ranks.length > 0"
              :md="9"
              :offset-md="3"
            >
              <RankingList
                :ranks="$store.state.ranks"
                :title="'Repository Ranking'"
              />
              <v-pagination
                v-model="page"
                :length="pages"
                :total-visible="9"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                class="font-weight-light my-5"
              />
            </v-col>
          </v-row>
        </v-fade-transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RankingList from '@/components/RankingList';
import RankingSearch from '@/components/RankingSearch';

export default {
  name: 'Index',
  components: {
    RankingList,
    RankingSearch,
  },
  data: () => ({
    page: 1,
    limit: 10,
  }),
  computed: {
    last() {
      return this.$store.state.ranks[0]?.last || 0;
    },
    pages() {
      const pages = Math.ceil(this.last / this.limit);
      const max = this.limit * 10;
      return pages > max ? max : pages;
    },
    query() {
      return this.$store.state.query;
    },
    params() {
      return {
        tags: [
          this.$store.state.query.type,
          this.$store.state.query.field,
        ],
        page: this.page,
        limit: this.limit,
      };
    },
  },
  watch: {
    $route(after) {
      this.setPage(Number(after.query.page) || 1);
    },
    page(after, before) {
      if (after === before) {
        return;
      }
      const { query } = this.$route;
      if (Number(query.page) > this.pages) {
        this.$router.replace({ query: { ...query, page: '1' } }).catch(() => {});
        return;
      }
      this.$router.push({ query: { ...query, page: String(after) } }).catch(() => {});
      this.fetch();
    },
    query() {
      if (this.page === 1) {
        this.fetch();
        return;
      }
      this.setPage(1);
    },
  },
  methods: {
    setPage(page) {
      this.page = page;
    },
    async fetch() {
      const { data } = await this.$store.dispatch('fetch', this.params);
      this.$store.commit('setRanks', data.filter((rank) => rank.totalCount > 0));
    },
  },
};
</script>
