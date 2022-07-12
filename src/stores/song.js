import { defineStore } from "pinia";
import axios from "axios";
export const useSongStore = defineStore("songStore", {
  state: () => ({
    song: {},
    songs: [
      {
        id: 27,
        music_name: "Hello World, Forgiveness of Sins",
        music_details: "hjbkbj",
        artist: "uhu",
        music_key: "57a8f4a38ec2e20f4430548c1497bce2",
        short_url: "iubu-2116008587",
        uploaded_by: "Oba John",
        short_details: "bjkjk",
        year: "",
        popular: 0,
        created_at: "2022-04-24 00:34:06",
        updated_at: "2022-04-26 08:53:35",
        audio: [
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
    Songs(state) {
      return state.songs;
    },
    getSong(state) {
      return state.song;
    },
  },

  actions: {
    async fetchSongs(page = 1) {
      try {
        console.log("fetchSongs");
        await axios.get(`/music/pages/${page}`).then((response) => {
          this.songs = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSongByUrl(short_url) {
      try {
        await axios.get(`/music/url/${short_url}`).then((response) => {
          this.song = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
