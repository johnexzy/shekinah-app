<script>
import { defineComponent } from "vue";
import { createMetaMixin } from "quasar";
import { mapActions, mapState } from "pinia";
import { useSongStore } from "src/stores/song";
export default defineComponent({
  name: "SongPage",
  preFetch({ currentRoute }) {
    const songStore = useSongStore();
    return songStore.fetchSongByUrl(currentRoute.params.slug);
  },
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // assuming `this.myTitle` exists in your mixed in component
        title: "Shekinah UNN branch",
        meta: {
          description: {
            name: "description",
            content: "Gods words tought in accuracy",
          },
          keywords: { name: "keywords", content: "Local church, Songs" },
          equiv: {
            "http-equiv": "Content-Type",
            content: "text/html; charset=UTF-8",
          },
          // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
          ogTitle: {
            property: "og:title",
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template(ogTitle) {
              return `${ogTitle} - Shekinah`;
            },
          },
          ogDescription: {
            name: "og:description",
            content: "Gods words tought in accuracy",
          },
          ogURL: {
            property: "og:url",
            content: window.location.href,
          },
          ogImage: {
            property: "og:image",
            content: window.location.origin + "/opengraphs/home.png",
          },
        },
      };
    }),
  ],
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE,

      song: {
        image: "https://www.livingwordmedia.org/old/img/album-cover/e-book.png",
        title: "CHARIS CAMPMEETING 2022 – THE MANDATE (AS WE GO)",
        slug: "helloworld",
      },
      player: {
        // src: this.Song.tracks[0].src,
        // title: this.Song.song_title,
        // coverImage: this.baseUrl + '/' + this.Song.images[0],
      },
      activeSong: 0,
      playing: false,
      pagination: {},
    };
  },
  computed: {
    ...mapState(useSongStore, {
      Song: "song",
    }),
  },
  mounted() {
    this.player = {
      src: this.Song.audio[0].song_url,
      title: this.Song.music_name,
      coverImage: this.baseUrl + "/" + this.Song.images[0],
    };
    setTimeout(() => {
      console.log(this.$refs.mplayer);
    }, 3000);
  },
  methods: {
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
    play() {
      const mplayer = this.$refs.mplayer;
      mplayer.play();
      this.playing = true;
    },
    pause() {
      const mplayer = this.$refs.mplayer;
      mplayer.pause();
      this.playing = false;
    },
    playAudio(src, i) {
      const mplayer = this.$refs.mplayer;
      if (src === this.player.src) {
        mplayer.isPlaying ? this.pause() : this.play();
        return;
      }

      this.player.src = src;
      this.play();
      this.activeSong = i;
    },
    isPlaying(i) {
      return this.activeSong === i ? this.playing : false;
    },
  },
});
</script>

<template>
  <q-page class="container">
    <q-card class="card w-100" flat square>
      <q-card-section class="q-pa-lg">
        <h4 class="tt text-weight-bold text-capitalize">
          {{ Song.music_name }}
        </h4>
        <span class="liner"></span>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <!-- <div class="row"> -->

        <!-- <div class="col-12 col-md-12 col-sm-12 q-pa-md"> -->
        <div class="row justify-start content-start cursor-pointer">
          <div class="col-12 col-lg-3 col-md-3 q-py-lg">
            <q-img
              :src="baseUrl + Song.images[0]"
              ref="imgs"
              class="square q-mr-md"
              spinner-color="primary"
              spinner-size="82px"
            />
          </div>
          <div
            class="col-12 col-lg-9 col-md-9 q-py-lg self-start no-wrap q-ml-sm text-weight-bold text-black-50 music_name"
          >
            <!-- <div class="row w-100"> -->
            <q-list bordered separator>
              <q-item v-for="(t, i) in Song.audio" :key="i">
                <q-item-section avatar>
                  <q-btn
                    v-if="isPlaying(i)"
                    color="red"
                    @click="playAudio(t.song_url, i)"
                    flat
                    dense
                    icon="mdi-pause"
                  />
                  <q-btn
                    v-else
                    color="primary"
                    @click="playAudio(t.song_url, i)"
                    flat
                    dense
                    icon="mdi-play"
                  />
                </q-item-section>
                <q-item-section>Track {{ i + 1 }}</q-item-section>
                <q-item-section side>
                  <a
                    style="text-decoration: none"
                    :href="t.song_url"
                    :download="
                      Song.music_name + '-by' + Song.artist + '-Track' + i
                    "
                  >
                    <q-btn color="orange" flat dense icon="download" />
                  </a>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- </div> -->
          </div>
        </div>

        <!-- </div> -->
        <!-- </div> -->
      </q-card-section>
      <q-separator spaced inset dark />
      <div v-if="player.src">
        <AudioPlayer :option="player" ref="mplayer" />
      </div>
      <q-card-section
        class="q-pa-md q-ma-md excerpt"
        style="border-radius: 5px"
      >
        <div class="col-12 col-md-12 text-center col-sm-12 q-pa-sm">
          <h4 class="tt text-weight-bold text-capitalize">
            Excerpts from "{{ Song.music_name }}"
          </h4>
          <!-- <span class="liner"></span> -->
        </div>
        <div class="row" v-html="Song.music_details"></div>
        <!-- <h6 class=" text-weight-light text-monospace">{{ Song.short_details }}</h6> -->
      </q-card-section>
    </q-card>
  </q-page>
</template>
