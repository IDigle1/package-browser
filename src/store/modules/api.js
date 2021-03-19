const DEFAULT_URL_JSDELIVR = "https://data.jsdelivr.com/v1/package/npm/";

const state = () => ({
    packages: null,
    pageSize: 10,
    page: 0,
    lastQuery: '',
    packagInfo: null
})

const getters = {
    getPackages(state) {
        return state.packages;
    },

    getPackageInfo(state) {
        return state.packageInfo;
    }
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

    changePage(state, page) {
        state.page = page;
    },

    resetPage(state) {
        state.page = 0;
    },

    updatePackageInfo(state, packagInfo) {
        state.packagInfo = packagInfo;
    }
}

const actions = {
    async searchPackage({commit, state}, settings) {
        commit('resetPackages');
        
        if (settings.query) {
            commit('changeQuery', settings.query);
            commit('resetPage');
        }

        if (settings.page) {
            commit('changePage', settings.page - 1);
        }

        const from = state.pageSize * state.page;

        const response = await this.dispatch('request', {
            url: 'https://registry.npmjs.org/-/v1/search',
            params: {
                size: state.pageSize,
                from,
                text: state.lastQuery
            }
        });

        commit('updatePackages', response.data);
    },

    async getPackageVersions(context, payloads) {
        const url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}`;
        const response = await this.dispatch('request', { url });

        return response.data;
    },

    async getPackageStats(context, payloads) {
        const url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}/stats`;
        const response = await this.dispatch('request', { url });

        return response.data;
    },

    async getPackageFiles(context, payloads) {
        const url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}@${payloads.version}`;
        const response = await this.dispatch('request', { url });
        
        return response.data;
    },

    // async getPackageInfo(context, payloads) {
        
    //     let url = '';

    //     if (payloads.dataType === 'versions') {
    //         url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}`;
    //     }

    //     if (payloads.dataType === 'stats') {
    //         url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}/stats`;
    //     }

    //     if (payloads.dataType === 'files') {
    //         url = `${DEFAULT_URL_JSDELIVR}${payloads.packageName}@${payloads.version}`;
    //     }

    //     const response = await fetch(url);
    //     const packageInfo = await response.json();

    //     return packageInfo;
    // },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}