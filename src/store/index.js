import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * @param ranks
     * @param ranks[].name
     * @param ranks[].imageUrl
     * @param ranks[].rank
     * @param ranks[].last
     * @param ranks[].totalCount
     * @param ranks[].tags
     * @param ranks[].createdAt
     */
    ranks: [],
  },
  mutations: {
    setRanks(state, ranks) {
      state.ranks = ranks;
    },
  },
  actions: {
    async fetch({
      commit,
    }, params) {
      const { data } = await axios.get('/', { params });
      commit('setRanks', data.data || []);
    },
  },
});
