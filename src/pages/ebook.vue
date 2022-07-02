<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useBookStore } from "src/stores/book";
export default defineComponent({
  name: "EbookPage",
  preFetch({ currentRoute }) {
    const bookStore = useBookStore();
    return bookStore.fetchBookByUrl(currentRoute.params.slug);
  },
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
