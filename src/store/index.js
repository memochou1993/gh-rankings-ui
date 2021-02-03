import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import fields from '@/util/fields';
import types from '@/util/types';

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
    /**
     * @param error
     */
    error: null,
    /**
     * @param query
     * @param query.type
     * @param query.field
     */
    query: {
      type: types.user,
      field: fields.repositories.stargazers,
    },
  },
  mutations: {
    setRanks(state, ranks) {
      state.ranks = ranks;
    },
    setError(state, error) {
      state.error = error;
    },
    setQuery(state, query) {
      state.query = query;
    },
  },
  actions: {
    fetch({
      commit,
    }, params) {
      return new Promise((resolve, reject) => {
        axios.get('/', { params })
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error);
            reject(error);
          });
      });
    },
  },
});
