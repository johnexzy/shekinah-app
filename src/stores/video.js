import { defineStore } from "pinia";
import axios from "axios";
export const useVideoStore = defineStore("videoStore", {
  state: () => ({
    video: {},
    videos: [
      {
        id: 27,
        video_title: "Hello World, Forgiveness of Sins",
        video_key: "57a8f4a38ec2e20f4430548c1497bce2",
        short_url: "iubu-2116008587",
        uploaded_by: "Oba John",
        youtube_url: "https://www.youtube.com/watch?v=t1Qxu_bfFzQ",
        short_details: "bjkjk",
        year: 2020,
        popular: 0,
        created_at: "2022-04-24 00:34:06",
        updated_at: "2022-04-26 08:53:35",
        images: ["uploads/images/202204260951521508975530.jpeg"],
        comments: [],
        deleting: false,
      },
    ],
  }),

  getters: {
    Videos(state) {
      return state.videos;
    },
    getVideo(state) {
      return state.video;
    },
  },

  actions: {
    async fetchVideos(page = 1) {
      try {
        console.log("fetchVideos");
        await axios.get(`/video/pages/${page}`).then((response) => {
          this.videos = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchVideoByUrl(short_url) {
      try {
        await axios.get(`/video/url/${short_url}`).then((response) => {
          this.video = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
