<template>
  <q-layout class="main-container shadow-10" container>
    <q-header class="bg-white text-black">
      <div class="row border-line-bottom">
        <!-- <div class="col-12 col-md-1 col-sm-2 col-xs-2 col-lg-1 news-block">
          <div class="">NEWS</div>
        </div> -->
        <div class="col-12">
          <marquee
            behavior=""
            truespeed="200"
            direction="rtl"
            style="padding: 5px 0 0 0"
            ><router-link
              style="margin: 0 5px"
              v-for="(n, i) in featuredPosts"
              class="text-decoration-none"
              :key="i"
              :to="{ name: 'blogs.blog', params: { blog: n.slug } }"
              >&nbsp;&nbsp;&nbsp;{{ n.title }} &nbsp;&nbsp;&nbsp;</router-link
            >
          </marquee>
        </div>
      </div>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          :icon="showMenu ? 'close' : 'menu'"
          class="q-mr-sm lt-md"
        >
          <q-menu
            class="bg-black text-white"
            v-model="showMenu"
            transition-duration="500"
            transition-hide="jump-up"
            transition-show="jump-down"
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/">
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/teachings">
                <q-item-section>Teachings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/ebooks">
                <q-item-section>Books</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/songs">
                <q-item-section>Songs</q-item-section>
              </q-item>
              <q-separator dark />
              <q-item clickable v-close-popup to="/videos">
                <q-item-section>Videos</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/blog">
                <q-item-section>Blog</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Socials</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item
                      v-for="(s, n) in socials"
                      :key="n"
                      dense
                      clickable
                      :href="s.link"
                      target="_blank"
                    >
                      <q-item-section>{{ s.name }}</q-item-section>
                      <q-item-section side>
                        <q-icon name="open_in_new" size="xs" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-separator dark />
            </q-list>
          </q-menu>
        </q-btn>
        <q-space></q-space>
        <div>
          <q-input
            @input.capture="makeSearch"
            @keyup.enter="makeSearch"
            rounded
            outlined
            v-model="query"
            placeholder="Search..."
            dense
            class="nav-search-input"
          >
            <template v-slot:append>
              <q-avatar icon="search" />
            </template>
          </q-input>

          <q-menu
            v-if="init"
            square
            transition-show="scale"
            transition-hide="scale"
            no-focus
            max-height="600px"
            style="width: 400px"
            v-model="showSearchResults"
          >
            <!-- <q-list v-if="searchResults.hasOwnProperty('data')" bordered style="width: 500px"> -->
            <q-scroll-area
              style="height: 600px; background: #ddd"
              class="q-pa-md"
            >
              <div class="row">
                <div class="block">
                  <p class="tt text-weight-bold fs-17">Teaching</p>
                  <span class="liner"></span>
                </div>
                <q-separator dark />
                <div
                  v-if="searchResults.data[0].data.length === 0"
                  class="col-12 col-md-12 col-sm-12 q-pa-md text-decoration-non block"
                >
                  No result match {{ query }} for Teachings
                </div>
                <router-link
                  class="col-12 col-md-12 col-sm-12 q-pa-md text-decoration-none"
                  v-for="(t, n) in searchResults.data[0].data"
                  :key="n"
                  :to="{ name: 'teaching', params: { slug: t.short_url } }"
                >
                  <!-- <div  @click="navigate" @keypress.enter="navigate"> -->
                  <div
                    class="fit row inline justify-start items-stretch content-start cursor-pointer"
                  >
                    <q-img
                      :src="baseUrl + '' + t.images[0]"
                      class="square-sm q-mr-md"
                      spinner-color="primary"
                      spinner-size="82px"
                    />
                    <div
                      class="col self-start justify-between wrap q-ml-sm teaching_title"
                    >
                      <p class="text-weight-bold text-black-50 q-mb-md">
                        {{ t.teaching_title }}
                      </p>
                      <p class="gt-sm text-italic text-grey-8">
                        {{ truncate(t.short_details, 60) }}
                      </p>
                    </div>
                  </div>
                  <!-- </div> -->
                </router-link>
                <span class="liner"></span>
                <div>
                  <p class="tt text-weight-bold fs-17">E-books</p>
                  <span class="liner"></span>
                </div>
                <div
                  v-if="searchResults.data[1].data.length === 0"
                  class="col-12 col-md-12 col-sm-12 q-pa-md text-decoration-non block"
                >
                  No result match {{ query }} for E-books
                </div>
                <router-link
                  v-else
                  class="col-12 col-md-12 col-sm-12 q-pa-md text-decoration-none"
                  v-for="(t, n) in searchResults.data[1].data"
                  :key="n"
                  :to="{ name: 'ebook', params: { slug: t.short_url } }"
                >
                  <!-- <div  @click="navigate" @keypress.enter="navigate"> -->
                  <div
                    class="fit row inline justify-start items-stretch content-start cursor-pointer"
                  >
                    <q-img
                      :src="baseUrl + '' + t.images[0]"
                      class="square-sm q-mr-md"
                      spinner-color="primary"
                      spinner-size="82px"
                    />
                    <div
                      class="col self-center justify-between wrap q-ml-sm teaching_title"
                    >
                      <p class="text-weight-bold text-black-50 q-mb-md">
                        {{ t.book_name }}
                      </p>
                      <p class="text-italic text-grey-8">
                        {{ truncate(t.book_details, 60) }}
                      </p>
                    </div>
                  </div>
                  <!-- </div> -->
                </router-link>
              </div>
            </q-scroll-area>
            <!-- </q-list> -->
          </q-menu>
        </div>
        <div class="gt-sm q-pa-md">
          <q-btn
            v-for="(c, i) in socials"
            :key="i"
            flat
            :title="c.name"
            round
            dense
            :color="c.color"
            :icon="c.icon"
            class="q-mx-sm"
            :size="c.size"
            :href="c.link"
            target="_blank"
          />
        </div>
      </q-toolbar>
      <q-toolbar
        spellcheck
        inset
        class="nav-menu fs-17"
        style="justify-content: center !important"
      >
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->
        <router-link to="/" custom v-slot="{ navigate }">
          <div
            @click="navigate"
            class="q-mr-md"
            @keypress.enter="navigate"
            :style="$q.screen.gt.sm ? '' : 'text-align: center;'"
          >
            <img src="~assets/logo.png" title="Bringing sons to glory" />
          </div>
        </router-link>

        <div class="q-pa-lg gt-sm">
          <router-link
            exact-active-class="exact-active-class"
            to="/"
            class="text-decoration-none text-capitalize"
            >Home</router-link
          >
        </div>
        <div class="q-pa-lg gt-sm">
          <router-link
            to="/teachings"
            exact-active-class="exact-active-class"
            class="text-decoration-none text-capitalize"
            >Teachings</router-link
          >
        </div>
        <div class="q-pa-lg gt-sm">
          <router-link
            to="/songs"
            exact-active-class="exact-active-class"
            class="text-decoration-none text-capitalize"
            >Songs</router-link
          >
        </div>
        <div class="q-pa-lg gt-sm">
          <router-link
            to="/videos"
            exact-active-class="exact-active-class"
            class="text-decoration-none text-capitalize"
            >Videos</router-link
          >
        </div>
        <div class="q-pa-lg gt-sm">
          <router-link
            to="/ebooks"
            exact-active-class="exact-active-class"
            class="text-decoration-none text-capitalize"
            >Ebooks</router-link
          >
        </div>
        <div class="q-pa-lg gt-sm">
          <router-link
            to="/blog"
            exact-active-class="exact-active-class"
            class="text-decoration-none text-capitalize"
            >Blog</router-link
          >
        </div>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="text-black footer">
      <div class="row justify-between">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-md">
          <q-card class="card" flat square>
            <q-card-section class="q-pa-lg">
              <h4 class="tt text-weight-bold text-capitalize">Recent news</h4>
              <span class="liner"></span>
            </q-card-section>
            <q-card-section class="q-pa-lg">
              <ul class="recent-news-footer">
                <li v-for="(n, i) in featuredPosts" :key="i">
                  <div class="fs-13 ls-06 title-text">
                    <router-link
                      class="text-decoration-none"
                      :to="{ name: 'blogs.blog', params: { blog: n.slug } }"
                    >
                      {{ n.title }}</router-link
                    >
                  </div>
                </li>
              </ul>

              <q-separator spaced inset dark />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-md">
          <q-card class="card" flat square>
            <q-card-section class="q-pa-lg">
              <h4 class="tt text-weight-bold text-capitalize">
                Like us on facebook
              </h4>
              <span class="liner"></span>
            </q-card-section>
            <q-card-section class="q-pa-lg text-center">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FShekinahAssemblyUnnCampusChurch&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="500"
                style="border: none; overflow: hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-pa-lg bg-white text-black">
      Copyright &copy; {{ new Date().getFullYear() }} Shekinah Assembly Unn
      Campus Church. All rights reserved
    </div>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useBlogStore } from "src/stores/blog";
import { useSearchStore } from "src/stores/search";
import { useLandingStore } from "src/stores/landing";
export default defineComponent({
  preFetch({ store }) {
    const blogStore = useBlogStore();
    const landingStore = useLandingStore();

    blogStore.fetchFeaturedPosts();
    blogStore.fetchCategories();
    blogStore.fetchAnnouncement();
    return landingStore.fetchIndex();
  },
  name: "MainLayout",

  components: {},

  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE,
      showMenu: false,
      recent: [],
      socials: [
        {
          name: "FaceBook",
          link: "https://www.facebook.com/ShekinahAssemblyUnnCampusChurch",
          size: "sm",
          icon: "mdi-facebook",
          color: "blue-10",
        },
        {
          name: "Telegram",
          link: "https://t.me/shekinahUNNlive?livestream",
          size: "xs",
          color: "blue-7",
          icon: "fas fa-paper-plane",
        },
        {
          name: "Twitter",
          link: "https://twitter.com/shekinahunn",
          size: "sm",
          color: "blue",
          icon: "mdi-twitter",
        },
        {
          name: "Instagram",
          link: "https://www.instagram.com/shekinahunn",
          size: "sm",
          color: "pink-7",
          icon: "mdi-instagram",
        },
        {
          name: "Youtube",
          link: "https://www.youtube.com/channel/UCbAnyTfkN1uSN4viPVx3crw",
          size: "sm",
          color: "red-8",
          icon: "mdi-youtube",
        },
        {
          name: "Mixir Radio",
          link: "https://t.me/shekinahUNNlive?livestream",
          size: "sm",
          color: "grey-9",
          icon: "mdi-radio",
        },
      ],
      text: "",
      query: "",
      showSearchResults: false,
    };
  },
  computed: {
    ...mapState(useBlogStore, {
      featuredPosts: "FeaturedPosts",
      Announcement: "Announcement",
    }),
    ...mapState(useSearchStore, ["searchResults", "init"]),
  },
  watch: {
    query: {
      handler: function (val, oldVal) {
        val.length > 1
          ? (this.showSearchResults = true)
          : (this.showSearchResults = false);
      },
    },
  },
  methods: {
    ...mapActions(useSearchStore, ["search"]),
    makeSearch() {
      console.log("john");
      this.search(this.query);
    },
    gotoSearch(val) {
      this.$router.push({
        name: "teaching",
        params: { slug: val.short_url },
      });
      this.search = "";
    },
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
    truncate(t, n) {
      return t.slice(0, n) + "...";
    },
  },
});
</script>
<style lang="scss" scoped>
.exact-active-class {
  border-bottom: 3px solid $primary;
  color: $primary !important;
  padding: 3px 0;
}
.news-block {
  background-color: $primary;
  padding: 5px 10px;
  color: #fff;
  font-weight: bold;
}
.border-line-bottom {
  border: 2.5px solid $primary;
}
</style>
