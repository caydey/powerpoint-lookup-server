// initial state
const state = {
  stats: {},
  loaded: false,
};

// getters
const getters = {
  stats(state) {
    return state.stats;
  },
  loaded(state) {
    return state.loaded;
  },
};

// mutations
const mutations = {
  setStats(state, stats) {
    state.stats = stats;
    state.loaded = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
