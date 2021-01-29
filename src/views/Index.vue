<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        sm="6"
      >
        <v-fade-transition>
          <v-row
            v-if="loaded"
            class="mt-3"
          >
            <v-col>
              <RankingList
                :ranks="ranks"
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
import {
  mapState,
} from 'vuex';
import RankingList from '@/components/RankingList';

export default {
  name: 'Index',
  components: {
    RankingList,
  },
  data: () => ({
    loaded: false,
    page: 0,
    limit: 10,
  }),
  computed: {
    ...mapState([
      'ranks',
    ]),
    last() {
      return this.ranks[0]?.last || 0;
    },
    pages() {
      const pages = Math.ceil(this.last / this.limit);
      const max = this.limit * 10;
      return pages > max ? max : pages;
    },
    params() {
      return {
        tags: [
          'type:user',
          'field:repositories.stargazers',
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
      if (after === 1 && before === 0) {
        this.fetch();
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
  },
  created() {
    this.setPage(Number(this.$route.query.page) || 1);
  },
  methods: {
    setLoaded(loaded) {
      this.loaded = loaded;
    },
    setPage(page) {
      this.page = page;
    },
    async fetch() {
      const { data } = await this.$store.dispatch('fetch', this.params);
      const ranks = data.filter((rank) => rank.totalCount > 0);
      this.$store.commit('setRanks', ranks);
      this.setLoaded(true);
    },
  },
};
</script>
