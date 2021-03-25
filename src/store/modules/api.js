const DEFAULT_URL_JSDELIVR = "https://data.jsdelivr.com/v1/package/npm/";

const state = () => ({
  packages: null,
  pageSize: 10,
  currentPage: 0,
  lastQuery: '',
})

const getters = {
  getFrom(state) {

    return state.pageSize * state.currentPage;
  },

  getPackages(state) {
    return state.packages;
  },
}

const mutations = {
  updatePackages(state, packages) {
    state.packages = packages;
  },

  resetPackages(state) {
    state.packages = null;
  },

  changeQuery(state, query) {
    state.lastQuery = query;
  },

  changePage(state, currentPage) {
    state.currentPage = currentPage;
  },

  resetPage(state) {
    state.currentPage = 0;
  },
}

const actions = {
  async searchPackage({
    commit,
    state,
    getters
  }, payloads) {
    commit('resetPackages');

    if (payloads.query) {
      commit('changeQuery', payloads.query);
      commit('resetPage');
    }

    if (payloads.currentPage) {
      commit('changePage', payloads.currentPage - 1);
    }

    const response = await this.dispatch('request', {
      url: 'https://registry.npmjs.org/-/v1/search',
      params: {
        size: state.pageSize,
        from: getters.getFrom,
        text: state.lastQuery
      }
    });

    commit('updatePackages', response.data);
  },

  async getPackageVersions(context, payloads) {
    const url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}`;
    const response = await this.dispatch('request', {
      url
    });

    return response.data;
  },

  async getPackageStats(context, payloads) {
    const url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}/stats`;
    const response = await this.dispatch('request', {
      url
    });

    return response.data;
  },

  async getPackageFiles(context, payloads) {
    const url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}@${payloads.version}`;
    const response = await this.dispatch('request', {
      url
    });

    return response.data;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}