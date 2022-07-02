<template>
  <div class="q-pa-xs">
    <carousel-component
      :itemsToShow="1"
      :wrapAround="true"
      :autoplay="8000"
      class="q-ma-xs"
    >
      <slide-component v-for="(m, i) in mainCarousel" :key="i">
        <div
          class="carousel__item main_item"
          :style="` min-height: ${minHeightSlide}px;background-image: url(${m.image});`"
        ></div>
      </slide-component>

      <template #addons>
        <pagination-component />
        <navigation-component />
      </template>
    </carousel-component>
  </div>
  <div class="w-100">
    <q-page class="container">
      <!-- <section class="author-hero-wrapper"
      style="background-image: url(http://www.milimetrik.com/wp-content/uploads/2018/04/software.jpg);">
      <div class="container-blog"></div>
    </section> -->
      <q-card class="card w-100" flat square>
        <div class="row">
          <div class="col-12 col-lg-8 col-md-12 col-sm-12">
            <q-card-section class="q-pa-lg">
              <h4 class="tt text-weight-bold">LATEST UPLOADS</h4>
              <span class="liner"></span>
            </q-card-section>

            <q-card-section>
              <carousel-component
                ref="latestUpload"
                :itemsToShow="itemsToShow"
                :wrapAround="true"
                :autoplay="5000"
              >
                <slide-component
                  v-for="(t, i) in landing.teachings"
                  :key="i"
                  class="carousel__item cursor-pointer"
                  @click="
                    $router.push({
                      name: 'teaching',
                      params: { slug: t.short_url },
                    })
                  "
                >
                  <div class="flex flex-center">
                    <q-card
                      class="my-card square"
                      :style="`background: url('${base}${t.images[0]}'); background-size: contain;
              background-position: center;`"
                      flat
                    >
                      <q-card-section class="flex ebook-title">
                        <div
                          class="fs-12 text-center text-capitalize text-weight-bold text-white ls-06 title-text"
                        >
                          {{ t.teaching_title }}
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <!-- <img :src="base + t.images[0]" alt="" /> -->
                </slide-component>

                <template #addons>
                  <navigation-component />
                  <!-- <pagination-component /> -->
                </template>
              </carousel-component>
            </q-card-section>
          </div>
          <div class="col-12 col-lg-4 col-md-12 col-sm-12">
            <q-card-section class="q-pa-lg">
              <h4 class="tt text-weight-bold">ONLINE RADIO</h4>
              <span class="liner"></span>
            </q-card-section>
            <q-card-section>
              <div class="flex flex-center">
                <!-- <div class="row"> -->
                <h4>NOW PLAYING</h4>
                <!-- </div> -->
              </div>
              <div class="row justify-center">
                <q-btn color="pink" flat rounded label="PLAY RADIO" />
              </div>
              <div class="flex flex-right q-mt-lg fs-12">
                <a href="" target="_blank" class="text-decoration-none"
                  >Shekinah is on Mixir</a
                >
              </div>
            </q-card-section>
          </div>
        </div>

        <hr class="q-ma-md" />
        <q-card-section>
          <div class="row justify-center">
            <router-link
              href=""
              class="text-decoration-none text-weight-bold"
              to="/"
              >VIEW FULL ALBUM LIST
            </router-link>
          </div>
          <q-space />
          <div class="row justify-center">
            <q-btn
              class="collection_span"
              :flat="activeCollecction('all')"
              no-caps
              rounded
              @click="sortTeaching('all')"
            >
              All</q-btn
            >
            <q-btn
              v-for="(c, i) in collection"
              :key="i"
              class="collection_span"
              :flat="activeCollecction(c.slug)"
              no-caps
              rounded
              @click="sortTeaching(c.slug)"
              >{{ c.name }}</q-btn
            >
          </div>
          <div class="list_teachings">
            <div class="row">
              <div
                class="col-12 col-lg-3 col-md-4 col-sm-6 cursor-pointer"
                v-for="(t, i) in teachings"
                :key="i"
                @click="
                  $router.push({
                    name: 'teaching',
                    params: { slug: t.short_url },
                  })
                "
              >
                <div class="teaching_card q-pa-md">
                  <q-card class="my-card animated slideInUp" bordered>
                    <img :src="base + '/' + t.images[0]" />
                    <q-card-section>
                      <div class="text-h5 text-capitalize ls-06">
                        {{ t.teaching_title }}
                      </div>
                    </q-card-section>
                    <q-card-actions vertical align="left">
                      <q-btn
                        label="Read more"
                        text-color="white"
                        color="primary"
                        padding="sm"
                        no-caps
                        class="text-weight-medium"
                      />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <hr class="q-ma-md" />
        <div class="row">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12">
            <q-card-section class="q-pa-lg">
              <h4 class="tt text-weight-bold text-capitalize">Ebooks</h4>
              <span class="liner"></span>
            </q-card-section>

            <q-card-section>
              <carousel
                ref="latestBooks"
                :itemsToShow="itemsToShow"
                :wrapAround="true"
                :autoplay="4000"
              >
                <slide
                  v-for="(t, i) in landing.books"
                  :key="i"
                  @click="
                    $router.push({
                      name: 'ebook',
                      params: { slug: t.short_url },
                    })
                  "
                  class="carousel__item cursor-pointer"
                >
                  <img :src="base + '/' + t.images[0]" alt="" />
                </slide>

                <template #addons>
                  <navigation />
                  <!-- <pagination /> -->
                </template>
              </carousel>
            </q-card-section>
            <q-card-section>
              <div class="flex flex-center">
                <q-btn
                  color="black"
                  to="/ebooks"
                  label="View All Ebooks"
                  flat
                />
              </div>
            </q-card-section>
          </div>
        </div>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useLandingStore } from "src/stores/landing";
export default defineComponent({
  name: "PageIndex",
  preFetch() {
    const landingStore = useLandingStore();
    return landingStore.fetchIndex();
  },
  data() {
    return {
      base: process.env.VUE_APP_API_BASE,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      teachings: [],
      active_collection: "all",
      collection: [
        {
          slug: "2018",
          name: "2018 Collection",
        },
        {
          slug: "2019",
          name: "2019 Collection",
        },
        {
          slug: "2020",
          name: "2020 Collection",
        },
        {
          slug: "2021",
          name: "2021 Collection",
        },
        {
          slug: "2022",
          name: "2022 Collection",
        },
      ],
      teaching: {
        image:
          "https://livingword.s3.us-west-2.amazonaws.com/Album+Arts/CCM+2022+-+The+Mandate+(As+we+go).jpeg",
        title: "CHARIS CAMPMEETING 2022 – THE MANDATE (AS WE GO)",
        slug: "helloworld",
      },
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
      mainCarousel: [
        {
          image:
            "https://www.livingwordmedia.org/wp-content/uploads/2022/01/271437167_10159790256106397_6748431319015108663_n-1.jpeg",
          link: "",
        },
        {
          image:
            "https://livingword.s3.us-west-2.amazonaws.com/Album+Arts/sccsongsvol6.jpeg",
          link: "",
        },
        {
          image:
            "https://livingword.s3.us-west-2.amazonaws.com/Album+Arts/the+body+of+christ.jpg",
          link: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(useLandingStore, {
      landing: "landing",
      AllTeachings: "AllTeachings",
    }),

    itemsToShow() {
      if (this.$q.screen.gt.md) {
        return (this.innerWidth * 3.5) / 1700;
      }
      if (this.$q.screen.lt.sm) {
        return (this.innerWidth * 6.8) / 1700;
      }
      if (this.$q.screen.sm) {
        return (this.innerWidth * 6) / 1700;
      }

      return (this.innerWidth * 5.3) / 1700;
    },
    minHeightSlide() {
      if (this.$q.screen.gt.md) {
        return this.innerWidth * 0.3;
      }
      if (this.$q.screen.lt.sm) {
        return this.innerWidth * 0.5;
      }
      return this.innerWidth * 0.34;
    },
  },
  mounted() {
    window.addEventListener("resize", this.detectResize);
    this.teachings = this.AllTeachings;
  },
  methods: {
    nextUploadSlide() {
      this.$refs.latestUpload.prev();
    },
    detectResize() {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      console.log(window.innerHeight);
    },
    formatDateString(d) {
      const fd = new Date(d);
      return date.formatDate(fd, "MMM D, YYYY");
    },
    sortTeaching(slug) {
      const teachings = this.AllTeachings;
      if (slug === "all") {
        this.teachings = teachings;
      } else {
        this.teachings = teachings.filter((r) => r.year === slug);
      }

      this.active_collection = slug;
    },
    activeCollecction(slug) {
      return this.active_collection !== slug;
    },
  },
});
</script>
<style lang="scss">
@mixin max-w($maxW) {
  @media only screen and (max-width: $maxW) {
    @content;
  }
}

@include max-w($breakpoint-sm) {
  .text-h5 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
  }
}
@include max-w($breakpoint-lg) {
  .text-h5 {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: 0px;
  }
}
.q-card__section--vert {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  background-color: $primary;
}
.main_item {
  width: 100%;
  background-size: contain;
  background-position: center top;
  background-repeat: repeat-x;
  color: #ffffff;
  font-size: 20px;

  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.author-hero-wrapper {
  /* background-image: url(http://www.milimetrik.com/wp-content/uploads/2018/04/software.jpg); */

  padding: 200px 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}

.container-blog {
  width: 1170px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;

  @include max-w($breakpoint-xs) {
    padding: 0 15px !important;
  }
}
</style>
