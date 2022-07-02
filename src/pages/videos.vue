<template>
  <q-page class="container">
    <q-card class="card w-100" flat square>
      <q-card-section class="q-pa-lg">
        <h4 class="tt text-weight-bold text-capitalize">Videos</h4>
        <span class="liner"></span>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <div class="flex flex-center" id="frame">
          <iframe
            width="1028"
            height="578"
            :src="'https://www.youtube.com/embed/' + selectedVideo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="text-center q-my-lg">
          <q-btn
            color="red"
            icon="mdi-youtube"
            flat
            label="Subscribe Now"
            @click="onClick"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <div class="row">
          <div
            class="col-12 col-md-4 col-sm-6 q-pa-md cursor-pointer"
            v-for="(v, i) in allVideos"
            :key="i"
            @click="watch(v.youtube_url)"
          >
            <q-card class="my-card" flat>
              <img :src="baseUrl + v.images[0]" class="rectangle" />
              <q-card-section>
                <div class="fs-12 text-center text-capitalize ls-06">
                  {{ v.video_title }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-separator spaced inset dark />
      <q-card-section>
        <div class="flex flex-center">
          <q-pagination
            v-model="pagination.current_page"
            color="black"
            :max="pagination.last_page"
            :max-pages="6"
            direction-links
            boundary-numbers
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useVideoStore } from "src/stores/video";
import { createMetaMixin } from "quasar";
export default defineComponent({
  name: "VideosPage",
  preFetch() {
    const videoStore = useVideoStore();
    return videoStore.fetchVideos(1);
  },
  data() {
    return {
      selected_video: null,
      baseUrl: process.env.VUE_APP_API_BASE,
      allVideos: [],
      loading: false,
      pagination: {},
    };
  },
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // assuming `this.myTitle` exists in your mixed in component
        title: "Videos - Shekinah UNN branch",
        meta: {
          description: {
            name: "description",
            content: "Gods words tought in accuracy",
          },
          keywords: { name: "keywords", content: "Local church, Teachings" },
          equiv: {
            "http-equiv": "Content-Type",
            content: "text/html; charset=UTF-8",
          },
          // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
          ogTitle: {
            property: "og:title",
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template(ogTitle) {
              return `${ogTitle} - My Website`;
            },
          },
        },
      };
    }),
  ],
  computed: {
    ...mapState(useVideoStore, ["Videos"]),

    current_page: {
      set(value) {
        this.pagination.current_page = value;
      },
      get() {
        return this.pagination.current_page;
      },
    },
    selectedVideo() {
      if (this.selected_video === null && this.allVideos.length) {
        const sv = this.allVideos[0].youtube_url.split("v=")[1];
        return sv;
      }
      return this.selected_video;
    },
  },
  methods: {
    ...mapActions(useVideoStore, ["fetchVideos"]),
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
    watch(u) {
      this.selected_video = u.split("v=")[1];
      const el = document.getElementById("frame");
      // window.scrollTo(0, 0);
    },
  },
  watch: {
    "pagination.current_page": function (page, oldPage) {
      // handler(page, oldPage) {
      if (oldPage !== null) {
        this.loading = true;
        this.fetchVideos(page).then(() => {
          window.scrollTo({
            top: 100,
            left: 100,
            behavior: "smooth",
          });
        });
      }

      // this.current_page = newVal.meta.current_page
    },
  },
  mounted() {
    // this.current_page = this.Videos.meta.current_page
    console.log(this.Videos);
    this.Videos.data.length > 0
      ? (this.allVideos = this.Videos.data)
      : console.log("videos ", "empty");
    this.pagination.current_page = this.Videos.meta.current_page;
    this.pagination.last_page = this.Videos.meta.total_pages;
  },
});
</script>
