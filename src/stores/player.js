import { defineStore } from "pinia";

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    options: {},
  }),

  getters: {
    options(state) {
      return state.options;
    },
  },

  actions: {
    setOptions(options) {
      this.options = options;
    },
  },
});
