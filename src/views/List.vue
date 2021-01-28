<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        md="6"
      >
        <v-fade-transition>
          <div
            v-if="loaded"
          >
            <RankingList
              :title="'Repository Ranking'"
              :ranks="ranks"
              class="my-5"
            />
            <v-pagination
              v-model="page"
              :length="pages"
              :total-visible="9"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              class="font-weight-light my-5"
            />
          </div>
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
  name: 'List',
  components: {
    RankingList,
  },
  data: () => ({
    loaded: false,
    page: 0,
    limit: 10,
  }),
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
      if (Number(this.$route.query.page) > this.limit * 10) {
        this.$router.replace({ query: { ...this.$route.query, page: '1' } }).catch(() => {});
        return;
      }
      this.$router.push({ query: { ...this.$route.query, page: String(after) } }).catch(() => {});
      this.fetch();
    },
  },
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
