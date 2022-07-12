const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "teachings", component: () => import("pages/teachings.vue") },

      {
        path: "teaching/:slug",
        name: "teaching",
        component: () => import("pages/teaching.vue"),
      },
      { path: "songs", component: () => import("src/pages/songs.vue") },
      {
        path: "song/:slug",
        name: "song",
        component: () => import("pages/song.vue"),
      },
      { path: "videos", component: () => import("src/pages/videos.vue") },
      {
        path: "ebooks",
        name: "ebooks",
        component: () => import("pages/ebooks.vue"),
      },
      {
        path: "ebook/:slug",
        name: "ebook",
        component: () => import("pages/ebook.vue"),
      },
      //blog
      {
        path: "/blog",
        name: "blog",
        component: () => import("src/pages/Blog/Landing.vue"),
      },
      {
        path: "/blogs",
        component: () => import("src/pages/Blog/Landing.vue"),
      },
      {
        path: "/blog/:blog",
        name: "blogs.blog",
        component: () => import("src/pages/Blog/Blog.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
