<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        cols="10"
      >
        <v-fade-transition>
          <RankingProfile
            v-show="!loading"
            :name="name"
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
import RankingProfile from '@/components/RankingProfile';

export default {
  name: 'Profile',
  components: {
    RankingProfile,
  },
  data: () => ({
    ranks: [],
  }),
  created() {
    this.fetch();
  },
  computed: {
    ...mapState([
      'loading',
    ]),
    name() {
      return this.$route.params.name;
    },
    params() {
      return {
        name: this.name,
        limit: 1000,
      };
    },
  },
  methods: {
    setRanks(ranks) {
      this.ranks = ranks;
    },
    async fetch() {
      const { data } = await this.$store.dispatch('fetch', this.params);
      this.setRanks(data);
    },
  },
};
</script>
