import Vue from "vue";
import Vuex from "vuex";
import api from "./modules/api";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  mutations: {},

  actions: {
    async request(context, { method = "GET", url = "", headers, body, params }) {
      const req = {
        method,
        url,
        data: body,
        params,
        headers,
      };
  
      async function callback() {
        try {
          const res = await axios(req);
          return res;
        } catch (e) {
          console.error(e);
        }
      }
  
      const res = await callback.call(this);
      return res;
    }
  },

  modules: {
    api
  },
});
