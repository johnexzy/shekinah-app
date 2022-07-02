<template>
  <q-page class="blog">
    <section
      class="author-hero-wrapper"
      :style="`background-image: url(${Post.featured_image});`"
    >
      <div class="container-blog"></div>
    </section>

    <!-- header -->
    <section class="q-pt-xl q-pb-xs q-px-md">
      <div class="container-blog">
        <router-link
          :to="{
            name: 'blog',
            query: {
              categories: Object.keys(Post.categories)[0].toLocaleLowerCase(),
            },
          }"
          class="text-subtitle1 text-black"
          style="font-size: 14px"
        >
          {{ Object.keys(Post.categories)[0].toLocaleUpperCase() }}
        </router-link>
        <h1 class="text-h2 text-weight-bold text-black">
          {{ Post.title }}
        </h1>

        <div class="row items-center q-my-md">
          <div class="text-subtitle1 text-black">
            {{ Post.author.name }}
          </div>
          <div class="text-subtitle1 text-black q-mx-md">•</div>
          <div class="text-subtitle2 text-black">
            {{ formatDateString(Post.modified) }}
          </div>
        </div>
      </div>
    </section>

    <!-- Dash seperator -->
    <div class="container-blog">
      <div class="dashed-separator"></div>
    </div>

    <section class="q-py-xl q-px-md">
      <div class="container-blog">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-3 col-lg-3 column items-start">
            <div class="text-subtitle1 text-black q-mb-md">
              SHARE THIS ARTICLE
            </div>
            <a
              class="share-btn q-mb-sm"
              :href="`https://www.facebook.com/dialog/share?app_id=937345527055140&display=popup&title=${shareInfo.head}&description=${shareInfo.text}&quote=${shareInfo.text}&href=${shareInfo.link}`"
              target="_blank"
            >
              <q-icon
                size="25px"
                name="ion-logo-facebook"
                class="q-mr-md"
              />Facebook
            </a>
            <a
              class="share-btn q-mb-sm"
              :href="`http://twitter.com/intent/tweet/?text=${shareInfo.text} \n${shareInfo.link}`"
              target="_blank"
            >
              <q-icon
                size="25px"
                name="ion-logo-twitter"
                class="q-mr-md"
              />Twitter
            </a>
            <a
              class="share-btn q-mb-sm"
              :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareInfo.link}`"
              target="_blank"
            >
              <q-icon
                size="25px"
                name="ion-logo-linkedin"
                class="q-mr-md"
              />Linkedin
            </a>
            <a
              class="share-btn q-mb-sm"
              target="_blank"
              :href="`mailto:?subject=${shareInfo.head}&body=${shareInfo.text} ${shareInfo.link}`"
            >
              <q-icon size="25px" name="ion-mail" class="q-mr-md" />Mail
            </a>
            <a
              class="share-btn"
              :href="`whatsapp://send?text=${shareInfo.text} ${shareInfo.link}`"
            >
              <q-icon
                size="25px"
                name="ion-logo-whatsapp"
                class="q-mr-md"
              />Whatsapp
            </a>
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <div v-html="Post.content" class="blog-html html" />

            <div class="q-my-xl">
              last updated on: {{ formatDateString(Post.modified) }}
            </div>

            <!-- <Newsletter></Newsletter> -->
          </div>

          <div class="col-12 col-md-3 col-lg-3"></div>
        </div>
      </div>
    </section>

    <section class="q-py-xl q-px-md">
      <div class="container-blog">
        <div class="text-subtitle1 text-black q-mb-xl">FEATURED POSTS</div>
        <div class="row q-col-gutter-lg">
          <div
            v-for="(s, i) in FeaturedPosts"
            :key="i"
            class="col-12 col-md-3 col-lg-3"
          >
            <div class="text-caption text-weight-bold text-black">
              {{ Object.keys(s.categories)[0].toLocaleUpperCase() }}
            </div>
            <div>
              <q-img
                style="max-height: 150px"
                @click="
                  $router.push({ name: 'blogs.blog', params: { blog: s.slug } })
                "
                :src="s.featured_image"
                class="cursor-pointer"
              />
            </div>

            <router-link
              :to="{ name: 'blogs.blog', params: { blog: s.slug } }"
              class="text-subtitle1 text-black text-weight-bold text-black"
            >
              {{ s.title }}
            </router-link>
            <div class="dashed-separator q-mt-md"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- <get-access-to-more-features /> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useBlogStore } from "src/stores/blog";
import { date } from "quasar";
export default defineComponent({
  name: "BlogPage",
  preFetch({ currentRoute }) {
    // alert("John")
    const blogStore = useBlogStore();
    return blogStore.fetchPost(currentRoute.params.blog);
  },
  data() {
    return {
      tab: "news",
      newsletter1: true,
      newsletter2: false,
      newsletter3: false,
    };
  },
  components: {
    // GetAccessToMoreFeatures,
    // Newsletter
  },
  methods: {
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
  },
  computed: {
    ...mapState(useBlogStore, ["Post", "FeaturedPosts"]),
    /**
     * Share Meta Data
     * @return Object
     */
    shareInfo() {
      return {
        head: `${this.Post.title} - Shekinah`,
        text: this.Post.title.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, ""),
        link: `https://shekinahunnbranch.org${this.$route.fullPath}`,
      };
    },
  },
  meta() {
    const title = this.Post.title;
    const description = this.Post.excerpt.replace(/<[^>]*>?/gm, "");
    // const image = '../assets/img/world-map-vector.svg'
    const image = this.Post.featured_image;

    return {
      // Title tag
      title: title,

      // meta tags
      meta: {
        description: {
          name: "description",
          content: description,
        },

        // Open Graph Tags
        ogTitle: {
          name: "og:title",
          content: title,
        },
        ogDescription: {
          name: "og:description",
          content: description,
        },
        ogURL: {
          property: "og:url",
          content: window.location.href,
        },
        ogImage: {
          property: "og:image",
          content: image,
        },
        twitterCard: { name: "twitter:card", content: "summary_large_image" },
        twitterTitle: {
          name: "twitter:title",
          content: title,
        },
        twitterDescription: {
          name: "twitter:description",
          content: description,
        },
        twitterImage: {
          name: "twitter:image",
          content: image,
        },
        // Google / Schema.org markup:
        schemaName: {
          itemprop: "name",
          content: title,
        },
        schemaDesc: {
          itemprop: "description",
          content: description,
        },
        schemaImage: {
          itemprop: "image",
          content: image,
        },
      },
    };
  },
});
</script>

<style lang="scss">
$font-primary: "Museo Sans", Arial, sans-serif;

.author-hero-wrapper {
  /* background-image: url(http://www.milimetrik.com/wp-content/uploads/2018/04/software.jpg); */

  padding: 200px 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}

.dashed-separator {
  border: 1px dashed #bbb;
}

.share-btn {
  color: unset;
  font-weight: bold;
}

.blog-html {
  max-width: 650px;

  font-size: 16px !important;
  line-height: 24px !important;
  /* margin-bottom: 2rem; */
  font-weight: 400;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 5px;
  }

  img {
    width: 100% !important;
    margin: 10px 0;
    /* padding: 10px; */
    /* background: #eee; */
  }

  a {
    color: #0045e6;

    &:hover {
      text-decoration: underline;
    }
  }

  h1 {
    font-size: 3rem;
    line-height: 3rem !important;
    font-family: $font-primary;
  }

  h2 {
    margin-top: 40px;
    font-size: 1.7rem;
    line-height: 2rem;
    font-family: $font-primary;
  }

  h3 {
    margin-top: 40px;
    font-size: 1.725rem;
    font-weight: normal;
    line-height: 2.75rem;
    font-family: $font-primary;
  }

  h4 {
    font-size: 1.45rem;
    line-height: 2rem;
    font-family: $font-primary;
  }

  h5 {
    font-size: 1.125rem;
    line-height: 1.95rem;
    font-family: $font-primary;
  }

  h6 {
    font-size: 0.95rem;
    font-family: $font-primary;
  }

  p {
    margin-bottom: 1rem;
  }

  .wp-block-quote {
    border-left: 3px solid #0045e6;
    margin-left: 0;
    padding-left: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}
</style>

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
