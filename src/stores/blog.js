import { defineStore } from "pinia";
import { blogApi } from "src/boot/blogApi";
export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    featuredPosts: {},
    post: {},
    announcement: {},
    stickyPost: {},
    loadingPost: false,
    loadingAnnouncement: false,
    loadingFeaturedPosts: false,
    loadingStickyPost: false,
    categories: {},
    postsByCategories: {},
    loadingPostsByCategories: false,
    loadingCategories: false,
  }),

  getters: {
    /**
     * Fetch All Posts~
     * @param {*} state
     * @returns
     */
    FeaturedPosts(state) {
      return state.featuredPosts.posts;
    },

    /**
     * Fetch post by slug
     * @return {Object} object
     */
    Post(state) {
      return state.post;
    },
    /**
     * Loading state for Posts
     * @param {*} state
     * @returns
     */
    LoadingFeaturedPosts(state) {
      return state.loadingFeaturedPosts;
    },
    /**
     * Fetch Sticky Post~
     * @param {*} state
     * @returns
     */
    StickyPost(state) {
      return state.stickyPost;
    },
    /**
     * Fetch All categories
     * @param {*} state
     * @returns
     */
    Categories(state) {
      return state.categories;
    },

    /**
     * Fetch Posts by Categories
     * @param {*} state
     * @returns
     */
    PostsByCategories(state) {
      return state.postsByCategories;
    },

    /**
     * Show Loading for Posts by Categories
     * @param {*} state
     * @returns
     */
    LoadingPostsByCategories(state) {
      return state.loadingPostsByCategories;
    },

    /**
     * Show Loading for Categories
     * @param {*} state
     * @returns
     */
    LoadingCategories(state) {
      return state.loadingCategories;
    },
    /**
     * Fetch Announcement
     * @param {*} state
     * @returns Object
     */
    Announcement(state) {
      return state.announcement;
    },
    /**
     * Show Loading for StickyPost
     * @param {*} state
     * @returns Object
     */
    LoadingStickyPost(state) {
      return state.loadingStickyPost;
    },
  },

  actions: {
    async fetchStickyPost() {
      // alert("john")
      try {
        this.setLoadingStickyPost();
        // console.log('url', process.env.BLOG_API)
        await blogApi.get(`/posts?sticky=require&number=1`).then((response) => {
          this.stickyPost = response.data.posts[0];

          console.log("sticky post", response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingStickyPost();
      }
    },
    setLoadingStickyPost() {
      this.loadingStickyPost = !this.loadingStickyPost;
    },
    async fetchFeaturedPosts() {
      // alert("john")
      try {
        this.setLoadingFeaturedPosts();
        // console.log('url', process.env.BLOG_API)
        await blogApi.get(`/posts?number=10`).then((response) => {
          this.featuredPosts = response.data;

          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingFeaturedPosts();
      }
    },
    setLoadingFeaturedPosts() {
      this.loadingFeaturedPosts = !this.loadingFeaturedPosts;
    },

    async fetchPost(slug) {
      // alert("john")
      try {
        this.setLoadingPost();
        // console.log('url', process.env.BLOG_API)
        await blogApi.get(`/posts/slug:${slug}`).then((response) => {
          console.log(response.data);
          this.post = response.data;
          this.fetchRelatedPost();
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingPost();
      }
    },
    setLoadingPost() {
      this.loadingPost = !this.loadingPost;
    },
    async fetchRelatedPost() {
      // alert("john")
      try {
        this.setLoadingFeaturedPosts();
        // console.log('url', process.env.BLOG_API)
        await blogApi.get(`/posts?number=4`).then((response) => {
          this.featuredPosts = response.data;

          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingFeaturedPosts();
      }
    },
    async fetchCategories() {
      try {
        this.setLoadingCategories();
        await blogApi.get(`/categories`).then((response) => {
          this.categories = response.data.categories;

          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingCategories();
      }
    },
    setLoadingCategories() {
      this.loadingCategories = !this.loadingCategories;
    },

    async fetchPostsByCategories(slug) {
      try {
        this.setLoadingPostsByCategories();
        await blogApi.get(`/posts?category=${slug}`).then((response) => {
          this.postsByCategories = response.data;

          // console.log(response.data)
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingPostsByCategories();
      }
    },
    setLoadingPostsByCategories() {
      this.loadingPostsByCategories = !this.loadingPostsByCategories;
    },

    async fetchAnnouncement() {
      try {
        this.setLoadingAnnouncement();
        await blogApi.get(`/posts?category=announcement`).then((response) => {
          this.announcement = response.data.posts[0];
          console.log(response.data);
          // console.log(response.data)
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingAnnouncement();
      }
    },
    setLoadingAnnouncement() {
      this.loadingAnnouncement = !this.loadingAnnouncement;
    },
  },
});
