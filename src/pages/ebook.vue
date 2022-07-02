<script>
import { defineComponent } from "vue";
import { createMetaMixin } from "quasar";
import { mapActions, mapState } from "pinia";
import { useBookStore } from "src/stores/book";
export default defineComponent({
  name: "EbookPage",
  preFetch({ currentRoute }) {
    const bookStore = useBookStore();
    return bookStore.fetchBookByUrl(currentRoute.params.slug);
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
    };
  },
  computed: {
    ...mapState(useBookStore, ["getBook"]),
    Book() {
      return this.getBook;
    },
  },
  methods: {
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
  },
});
</script>

<template>
  <q-page class="container">
    <q-card class="card w-100" flat square>
      <q-card-section class="q-pa-lg">
        <h4 class="tt text-weight-bold text-capitalize">
          {{ Book.book_name }}
        </h4>
        <span class="liner"></span>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <div class="row">
          <div class="col-12 col-md-12 col-sm-12 q-pa-md">
            <div
              class="fit row inline justify-center items-stretch content-start cursor-pointer"
            >
              <q-img
                :src="baseUrl + Book.images[0]"
                ref="imgs"
                class="square q-mr-md border"
                spinner-color="primary"
                spinner-size="82px"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                color="orange"
                icon="download"
                flat
                label="Download Free Ebook"
                :href="Book.file_url"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator spaced inset dark />

      <q-card-section
        class="q-pa-md q-ma-md excerpt"
        style="border-radius: 5px"
      >
        <div class="col-12 col-md-12 text-center col-sm-12 q-pa-sm">
          <h4 class="tt text-weight-bold text-capitalize">
            About "{{ Book.book_name }}"
          </h4>
          <!-- <span class="liner"></span> -->
        </div>
        <div class="row" v-html="Book.book_details"></div>
        <!-- <h6 class=" text-weight-light text-monospace">{{ Teaching.short_details }}</h6> -->
      </q-card-section>
    </q-card>
  </q-page>
</template>
