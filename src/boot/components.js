import { boot } from "quasar/wrappers";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// import VueSmoothScroll from "vue3-smooth-scroll";
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";
export default boot(({ app }) => {
  app.component("CarouselComponent", Carousel);
  app.component("SlideComponent", Slide);
  app.component("NavigationComponent", Navigation);
  app.component("PaginationComponent", Pagination);
  app.component("AudioPlayer", AudioPlayer);
  // app.use(VueSmoothScroll, {
  //   duration: 400,
  //   updateHistory: false,
  // });
  // setTimeout(() => {
  //   console.clear();
  // }, 6000);
});
