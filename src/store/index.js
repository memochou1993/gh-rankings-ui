import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
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
    setLoading(state, loading) {
      state.loading = loading;
    },
    setRanks(state, ranks) {
      state.ranks = ranks;
    },
  },
  actions: {
    fetch({
      commit,
    }, params) {
      commit('setLoading', true);
      return new Promise((resolve, reject) => {
        axios.get('/', { params })
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false);
          });
      });
    },
  },
});
