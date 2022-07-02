import { defineStore } from "pinia";
import axios from "axios";
export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    searchResults: {},
    init: false,
  }),

  getters: {
    getSearch(state) {
      return state.searchResults;
    },
  },

  actions: {
    async search(q) {
      try {
        const req = await axios.get(`/search/${q}`);
        this.init = true;
        console.log(req.data);
        this.searchResults = req.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
