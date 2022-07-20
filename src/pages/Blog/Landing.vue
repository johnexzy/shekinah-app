<template>
  <q-page class="blog" padding>
    <!-- header -->
    <section class="hero-wrapper q-py-xl">
      <div class="container-blog">
        <h1 class="text-h2 q-mb-md">Shekinah UNN Branch: Blog</h1>
        <h2 class="text-subtitle1">
          Get news and annoucement featuring events and schedules
        </h2>
      </div>
    </section>

    <!-- featured section -->
    <section class="q-py-xl">
      <div class="container-blog">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6 col-lg-6">
            <img class="full-width" :src="StickyPost.featured_image" alt="" />
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <router-link
              custom
              v-slot="{ navigate }"
              :to="{
                name: 'blog',
                query: {
                  categories: Object.keys(
                    StickyPost.categories
                  )[0].toLocaleLowerCase(),
                },
              }"
            >
              <div
                class="text-caption text-grey-10 q-mb-sm cursor-pointer"
                @click="navigate"
                @keypress.enter="navigate"
              >
                {{ Object.keys(StickyPost.categories)[0].toLocaleUpperCase() }}
              </div>
            </router-link>
            <router-link
              :to="{ name: 'blogs.blog', params: { blog: StickyPost.slug } }"
              class="text-h3 text-black text-weight-bold"
            >
              {{ StickyPost.title }}
            </router-link>
            <div
              v-html="StickyPost.excerpt"
              class="text-subtitle q-my-sm"
            ></div>
            <div class="row">
              <div class="col-12 col-md-7 col-lg-7">
                <q-list>
                  <q-item class="q-pa-none">
                    <q-item-section avatar>
                      <q-avatar size="30px">
                        <q-img
                          style="width: 30px; height: 30px"
                          :src="StickyPost.author.avatar_URL"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{
                      StickyPost.author.name
                    }}</q-item-section>
                    <q-item-section side>{{
                      formatDateString(StickyPost.modified)
                    }}</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- content  -->
    <section class="q-py-xl">
      <div class="container-blog">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3 col-lg-3">
            <div class="text-caption text-grey-10">EXPLORE</div>

            <!-- section sidebar -->
            <q-tabs
              v-model="tab"
              vertical
              class="text-left q-mb-xl secondfont"
              active-color="primary"
              style="height: unset !important"
            >
              <q-tab
                style="font-size: 1.2rem"
                class="blog-category-tab"
                no-caps
                v-for="(cat, i) in Categories"
                :key="i"
                :name="cat.slug"
                :label="cat.name.toUpperCase()"
              />
            </q-tabs>
          </div>
          <div class="col-12 col-md-9 col-lg-9">
            <q-tab-panels
              v-model="tab"
              animated
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel
                v-for="(cat, i) in Categories"
                :key="i"
                :name="cat.slug"
              >
                <div
                  v-if="LoadingPostsByCategories"
                  class="row q-col-gutter-lg"
                >
                  <q-card
                    v-for="i in 4"
                    :key="i"
                    class="col-12 col-md-6 col-lg-6 q-mb-xl"
                    flat
                    style="max-width: 300px; background: transparent"
                  >
                    <q-item>
                      <q-item-section avatar>
                        <q-skeleton animation="wave" width="100%" type="text" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>
                          <q-skeleton animation="wave" type="text" />
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-skeleton animation="wave" height="100px" square />

                    <q-card-section>
                      <q-item>
                        <q-item-section avatar>
                          <q-skeleton animation="wave" type="QAvatar" />
                        </q-item-section>

                        <q-item-section>
                          <q-skeleton
                            type="text"
                            width="50%"
                            class="text-subtitle2"
                            animation="wave"
                          />
                        </q-item-section>
                        <q-item-section avatar>
                          <q-skeleton
                            type="text"
                            width="100%"
                            class="text-caption"
                            animation="wave"
                          />
                        </q-item-section>
                      </q-item>
                    </q-card-section>
                  </q-card>
                </div>
                <div v-else class="row q-col-gutter-lg">
                  <div
                    v-for="(post, i) in PostsByCategories.posts"
                    :key="i"
                    class="col-12 col-md-6 col-lg-6 q-mb-xl q-pa-sm"
                  >
                    <div class="q-pa-sm shadow-3 news-card">
                      <div class="news-header">
                        <router-link
                          :to="{
                            name: 'blogs.blog',
                            params: { blog: post.slug },
                          }"
                          class="cursor-pointer text-weight-bold text-h4 text-black text-center"
                        >
                          {{ post.title }}
                        </router-link>
                      </div>
                      <div
                        v-html="post.excerpt"
                        class="ellipsis-2-lines text-subtitle text-grey-10 q-my-sm"
                      ></div>
                      <div class="row">
                        <div class="col-12 col-md-10 col-lg-10">
                          <q-list>
                            <q-item class="q-pa-none">
                              <q-item-section avatar>
                                <q-avatar size="30px">
                                  <q-img
                                    style="width: 30px; height: 30px"
                                    :src="post.author.avatar_URL"
                                  />
                                </q-avatar>
                              </q-item-section>
                              <q-item-section>{{
                                post.author.name
                              }}</q-item-section>
                              <q-item-section side>{{
                                formatDateString(post.modified)
                              }}</q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="flex justify-center">
                  <q-btn unelevated color="grey-5" label="View more" />
                </div> -->
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { createMetaMixin } from "quasar";
import { useBlogStore } from "src/stores/blog";
import { defineComponent } from "vue";
import { date } from "quasar";
export default defineComponent({
  name: "BlogLanding",
  preFetch() {
    const blogStore = useBlogStore();
    return blogStore.fetchStickyPost();
  },
  data() {
    return {
      tab: this.$route.query.categories || "announcement",
      email: "",
      // StickyPost: {}
    };
  },
  watch: {
    tab(val) {
      this.fetchPostsByCategories(val);
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchPostsByCategories(this.tab);
  },
  computed: {
    ...mapState(useBlogStore, [
      // 'FeaturedPosts',
      "StickyPost",
      "Categories",
      "LoadingPostsByCategories",
      "PostsByCategories",
      "LoadingCategories",
      "LoadingStickyPost",
    ]),
  },
  methods: {
    ...mapActions(useBlogStore, ["fetchCategories", "fetchPostsByCategories"]),

    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
    // subscribe() {
    //   this.$refs.email.validate()
    //   if (this.$refs.email.hasError) {
    //     return false
    //   }
    //   this.$store.dispatch('like/subscribe', this.email).then(() => {
    //     this.email = ''
    //   })
    // }
  },
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // assuming `this.myTitle` exists in your mixed in component
        title: "Blog - Shekinah UNN branch",
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
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap");

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

.blog {
  font-size: 1rem;
  font-family: "Source Sans Pro", sans-serif;
  line-height: normal;
  -webkit-font-smoothing: antialiased;

  .container-blog {
    width: 1170px;
    max-width: 100%;
    margin: 0 auto;
    padding: 0;

    @include max-w($breakpoint-xs) {
      padding: 0 15px !important;
    }
  }

  h1 {
    line-height: 2.75rem;

    @include max-w($breakpoint-xs) {
      font-size: 1.6rem !important;
      line-height: 2.75rem !important;
    }
  }

  h2 {
    @include max-w($breakpoint-xs) {
      font-size: 1.7rem;
      line-height: 2.5rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 5px;
  }

  a {
    text-decoration: none;
  }

  .text-h1 {
    font-size: 2.7rem;
    line-height: 3rem !important;
  }

  .text-h2 {
    font-size: 2.125rem;
    line-height: 2.5rem;
  }

  .text-h3 {
    font-size: 1.725rem;
    line-height: 2.75rem;
  }

  .text-h4 {
    font-size: 1.45rem;
    line-height: 2rem;
  }

  .text-h5 {
    font-size: 1.125rem;
    line-height: 1.8rem;

    @media only screen and (max-width: 600px) {
      font-size: 1rem;
      // line-height: 1.5rem;
    }
  }

  .text-h6 {
    font-size: 0.95rem;
  }

  .text-body1 {
    letter-spacing: 0;
  }

  .text-subtitle {
    line-height: 1.5rem !important;
  }

  .text-subtitle1 {
    @media only screen and (max-width: 600px) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  .blog-category-tab {
    display: flex;
    justify-content: flex-start;
  }

  .blog-category-tab .q-tab__indicator {
    display: none;
  }

  .blog-category-tab .q-tab__content .q-tab__label {
    font-size: 1.5rem !important;
    font-weight: 800;
  }
  .q-tab-panels {
    background: transparent !important;
  }
  .news-card {
    border-radius: 5px;
    .news-header {
      text-align: center;
    }
  }
  section.hero-wrapper {
    background: linear-gradient(
      100deg,
      rgba(22, 21, 21, 0.8) 0%,
      rgb(80, 76, 53) 25%
    );
    color: rgb(230, 222, 222) !important;
  }
}
</style>
