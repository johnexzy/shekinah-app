import { defineStore } from "pinia";
import axios from "axios";
export const useLandingStore = defineStore("landingStore", {
  state: () => ({
    landing: {
      books: [],
      teachings: [],
      latest: {},
    },
    allTeachings: [],
  }),

  getters: {
    Landing(state) {
      return state.landing;
    },
    AllTeachings(state) {
      return state.allTeachings;
    },
  },

  actions: {
    async fetchIndex() {
      try {
        await axios.get(`/index`).then((response) => {
          this.landing = response.data;
          this.allTeachings = response.data.allTeachings.slice(0, 10);

          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
