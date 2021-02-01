import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import fields from '@/util/fields';
import types from '@/util/types';

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
    query: {
      type: types.user,
      field: fields.repositories.stargazers,
    },
    ranks: [],
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setQuery(state, query) {
      state.query = query;
    },
    setRanks(state, ranks) {
      state.ranks = ranks;
    },
  },
  actions: {
    fetch({
      commit,
    }, params) {
      // FIXME
      console.log('dispatch', params);
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
