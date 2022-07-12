<template>
  <q-page class="container">
    <q-card class="card w-100" flat square>
      <q-card-section class="q-pa-lg">
        <h4 class="tt text-weight-bold text-capitalize">Songs</h4>
        <span class="liner"></span>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <div class="row">
          <router-link
            class="col-12 col-md-6 col-sm-6 q-pa-md text-decoration-none"
            v-for="(t, i) in Songs.data"
            :key="i"
            :to="{ name: 'song', params: { slug: t.short_url } }"
          >
            <!-- <div  @click="navigate" @keypress.enter="navigate"> -->
            <div
              class="fit row inline justify-start items-stretch content-start cursor-pointer"
            >
              <div class="flex flex-center q-mr-md">
                <q-card
                  class="square-md"
                  :style="`background: url('${baseUrl}${t.images[0]}'); background-size: contain;
              background-position: center;`"
                  flat
                >
                  <q-card-section class="flex ebook-title">
                    <div
                      class="fs-12 text-center text-capitalize text-weight-bold text-white ls-06 title-text"
                    >
                      {{ t.music_name }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="col self-center justify-between wrap q-ml-sm music_name"
              >
                <p class="text-weight-bold text-black-50 q-mb-md">
                  {{ t.music_name }}
                </p>
                <p class="text-italic text-grey-8 display-only-lg">
                  {{ truncate(t.music_details, 60) }}
                </p>
              </div>
            </div>
            <!-- </div> -->
          </router-link>
        </div>
      </q-card-section>
      <q-separator spaced inset dark />
      <q-card-section>
        <div class="flex flex-center">
          <q-pagination
            v-model="current_page"
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
import { date } from "quasar";
import { createMetaMixin } from "quasar";
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useSongStore } from "src/stores/song";
export default defineComponent({
  name: "SongsPage",
  preFetch() {
    const songStore = useSongStore();
    return songStore.fetchSongs(1);
  },
  data() {
    return {
      // current_page:
      baseUrl: process.env.VUE_APP_API_BASE,
      allSongs: [],
      loading: false,
      pagination: {},
    };
  },
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // assuming `this.myTitle` exists in your mixed in component
        title: "Songs - Shekinah UNN branch",
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
              return `${ogTitle} - My Website`;
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
  computed: {
    ...mapState(useSongStore, {
      Songs: "songs",
    }),

    current_page: {
      set(value) {
        this.pagination.current_page = value;
      },
      get() {
        return this.pagination.current_page;
      },
    },
  },
  methods: {
    ...mapActions(useSongStore, ["fetchSongs"]),
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
    truncate(t, n) {
      return t.slice(0, n) + "...";
    },
  },
  watch: {
    "pagination.current_page": function (page, oldPage) {
      // handler(page, oldPage) {
      if (oldPage !== null) {
        this.loading = true;
        this.fetchSongs(page).then(() => {
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
    // this.current_page = this.Songs.meta.current_page
    console.log(this.Songs);
    this.Songs.data.length > 0
      ? (this.allSongs = this.Songs.data)
      : console.log("Leaderboard ", "empty");
    this.pagination.current_page = this.Songs.meta.current_page;
    this.pagination.last_page = this.Songs.meta.total_pages;
  },
});
</script>
<style lang="scss" scoped>
@mixin max-w($maxW) {
  @media only screen and (max-width: $maxW) {
    @content;
  }
}
@mixin min-w($minW) {
  @media only screen and (min-width: $minW) {
    @content;
  }
}
// @include max-w(900px) {
//   .display-only-lg {
//     display: none;
//   }
// }
@include min-w(610px) {
  .music_name {
    display: none;
  }
}
@include min-w(830px) {
  .music_name {
    display: block;
  }
}
</style>
