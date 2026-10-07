import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: () => import("@/view/HomeView.vue") },
    { path: "/products", name: "products", component: () => import("@/view/ProdcutView.vue") },
  ],
});

export default router;
