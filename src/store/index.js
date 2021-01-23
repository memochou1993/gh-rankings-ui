import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * @param ranks
     * @param ranks[].id
     * @param ranks[].image
     * @param ranks[].rank.rank
     * @param ranks[].rank.last
     * @param ranks[].rank.totalCount
     * @param ranks[].rank.tags
     * @param ranks[].rank.createdAt
     */
    ranks: [],
  },
  mutations: {
    setRanks(state, ranks) {
      state.ranks = ranks;
    },
  },
  actions: {
    async fetchRepositories({ commit }) {
      const { data } = await axios.get('/repositories?tags=stargazers&limit=100&page=1');
      commit('setRanks', data.data);
    },
  },
});
