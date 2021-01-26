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
            v-show="loaded"
          >
            <RankingList
              :title="'Repository Ranking'"
              :ranks="ranks"
              class="my-5"
            />
            <v-pagination
              v-model="page"
              :length="length"
              :total-visible="9"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              class="my-5"
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
    page(after, before) {
      if (after === before) {
        return;
      }
      this.$router.push({ query: { ...this.$route.query, page: String(after) } }).catch(() => {});
      this.fetch();
    },
  },
  created() {
    this.setPage(Number(this.$route.query.page) || 1);
  },
  computed: {
    ...mapState([
      'ranks',
    ]),
    last() {
      return this.ranks[0]?.last || 0;
    },
    length() {
      return Math.ceil(this.last / this.limit);
    },
    params() {
      return {
        tags: [
          'repository',
          'stargazers',
        ],
        page: this.page,
        limit: this.limit,
      };
    },
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
