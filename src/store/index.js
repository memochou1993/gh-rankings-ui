import Vue from 'vue';
import Vuex from 'vuex';
import {
  types,
  fields,
  languages,
  locations,
} from '@/assets';
import axios from '@/plugins/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ranks: [],
    error: {},
    loaded: false,
    query: {
      type: types.user.value,
      field: fields.repositoryStars.value,
      language: '',
      location: '',
      name: '',
    },
    languages,
    locations: (() => {
      const reducer = (acc, val) => acc.concat(val.cities.map((city) => ({ name: `${city.name}, ${val.name}` })));
      return Array.from(locations).concat(Array.from(locations).reduce(reducer, []));
    })(),
  },
  getters: {
    rankCount(state) {
      return state.ranks[0]?.rankCount || 0;
    },
  },
  mutations: {
    setRanks(state, ranks) {
      state.ranks = ranks;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoaded(state, loaded) {
      state.loaded = loaded;
    },
    setQuery(state, query) {
      state.query = query;
    },
  },
  actions: {
    fetch({
      commit,
    }, params) {
      commit('setLoaded', false);
      return new Promise((resolve, reject) => {
        axios.get('/', { params })
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error);
            reject(error);
          })
          .finally(() => {
            commit('setLoaded', true);
          });
      });
    },
    show({
      commit,
    }, opts) {
      commit('setLoaded', false);
      return new Promise((resolve, reject) => {
        axios.get(`/${types[opts.type].plural}/${opts.name}`)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error);
            reject(error);
          })
          .finally(() => {
            commit('setLoaded', true);
          });
      });
    },
  },
});
