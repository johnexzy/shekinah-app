<template>
  <q-page class="container">
    <q-card class="card w-100" flat square>
      <q-card-section class="q-pa-lg">
        <h4 class="tt text-weight-bold text-capitalize">Ebooks</h4>
        <span class="liner"></span>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <div class="row">
          <div
            class="col-12 col-md-3 col-sm-6 q-pa-md cursor-pointer"
            v-for="(b, i) in Books.data"
            :key="i"
            @click="
              $router.push({ name: 'ebook', params: { slug: b.short_url } })
            "
          >
            <div class="flex flex-center">
              <q-card
                class="my-card square"
                :style="`background: url('${baseUrl}${b.images[0]}'); background-size: contain;
              background-position: center;`"
                flat
              >
                <q-card-section class="flex ebook-title">
                  <div
                    class="fs-12 text-center text-capitalize text-weight-bold text-white ls-06 title-text"
                  >
                    {{ b.book_name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
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
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useBookStore } from "src/stores/book";
import { createMetaMixin } from "quasar";
export default defineComponent({
  name: "EbooksPage",
  preFetch() {
    const bookStore = useBookStore();
    return bookStore.fetchBooks(1);
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE,
      current: 4,
      allBooks: [],
      teaching: {
        image: "https://www.livingwordmedia.org/old/img/album-cover/e-book.png",
        title: "CHARIS CAMPMEETING 2022 – THE MANDATE (AS WE GO)",
        slug: "helloworld",
      },
      pagination: {},
    };
  },
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // assuming `this.myTitle` exists in your mixed in component
        title: "E-books - Shekinah UNN branch",
        meta: {
          description: {
            name: "description",
            content: "Gods words tought in accuracy",
          },
          keywords: { name: "keywords", content: "Local church, Books" },
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
    ...mapState(useBookStore, ["Books"]),
    current_page: {
      set(value) {
        this.pagination.current_page = value;
      },
      get() {
        return this.pagination.current_page;
      },
    },
  },
  watch: {
    "pagination.current_page": function (page, oldPage) {
      // handler(page, oldPage) {
      if (oldPage !== null) {
        this.loading = true;
        this.fetchBooks(page).then(() => {
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
    // console.log(this.Books)
    // this.current_page = this.Teachings.meta.current_page
    this.Books.data.length > 0
      ? (this.allBooks = this.Books.data)
      : console.log("Books ", "empty");
    this.pagination.current_page = this.Books.meta.current_page;
    this.pagination.last_page = this.Books.meta.total_pages;
  },
  methods: {
    ...mapActions(useBookStore, ["fetchBooks"]),
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
  },
});
</script>
