import { defineStore } from "pinia";
import axios from "axios";
export const useTeachingStore = defineStore("teachingStore", {
  state: () => ({
    teaching: {},
    teachings: [
      {
        id: 27,
        teaching_title: "Hello World, Forgiveness of Sins",
        teaching_details: "hjbkbj",
        teacher: "uhu",
        teaching_key: "57a8f4a38ec2e20f4430548c1497bce2",
        short_url: "iubu-2116008587",
        uploaded_by: "Oba John",
        youtube_url: "https://www.youtube.com/watch?v=t1Qxu_bfFzQ",
        short_details: "bjkjk",
        year: "",
        popular: 0,
        created_at: "2022-04-24 00:34:06",
        updated_at: "2022-04-26 08:53:35",
        tracks: [
          {
            file_url:
              "https://shekinah.s3.af-south-1.amazonaws.com/iubu-uhu50.mp3",
            file_bytes: 3330755,
          },
        ],
        images: ["uploads/images/202204260951521508975530.jpeg"],
        comments: [],
        deleting: false,
      },
    ],
  }),

  getters: {
    Teachings(state) {
      return state.teachings;
    },
    getTeaching(state) {
      return state.teaching;
    },
  },

  actions: {
    async fetchTeachings(page = 1) {
      try {
        console.log("fetchTeachings");
        await axios.get(`/teaching/pages/${page}`).then((response) => {
          this.teachings = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTeachingByUrl(short_url) {
      try {
        await axios.get(`/teaching/url/${short_url}`).then((response) => {
          this.teaching = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
