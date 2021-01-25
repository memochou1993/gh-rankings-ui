<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        md="6"
      >
        <v-fade-transition>
          <RankingList
            v-show="!loading"
            :title="'Repository Ranking'"
            :ranks="ranks"
            class="my-5"
          />
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
  created() {
    this.fetch();
  },
  computed: {
    ...mapState([
      'loading',
      'ranks',
    ]),
    params() {
      return {
        tags: [
          'user',
          'repositories.stargazers',
        ],
        limit: 100,
      };
    },
  },
  methods: {
    async fetch() {
      const { data } = await this.$store.dispatch('fetch', this.params);
      const ranks = data.filter((rank) => rank.totalCount > 0);
      this.$store.commit('setRanks', ranks);
    },
  },
};
</script>
