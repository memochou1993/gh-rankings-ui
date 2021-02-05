import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import fields from '@/assets/field';
import types from '@/assets/type';
import languages from '@/assets/language/index.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * @param languages
     * @param languages[].name
     */
    languages,
    /**
     * @param ranks
     * @param ranks[].name
     * @param ranks[].imageUrl
     * @param ranks[].rank
     * @param ranks[].rankCount
     * @param ranks[].totalCount
     * @param ranks[].tags
     * @param ranks[].createdAt
     */
    ranks: [],
    /**
     * @param error
     */
    error: {},
    /**
     * @param query
     * @param query.type
     * @param query.field
     */
    query: {
      type: types.user.value,
      field: fields.repositoryStars.value,
      language: '',
    },
  },
  getters: {
    rankCount(state) {
      return state.ranks[0]?.rankCount || 0;
    },
    createdAt(state) {
      return state.ranks[0]?.createdAt || '';
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
