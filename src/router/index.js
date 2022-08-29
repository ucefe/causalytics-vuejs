import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";
import DashboardView from "../views/DashboardView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import store from "../store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
      meta: { requiresUnauth: true }
    },
    {
      path: "/dashboard",
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: "/:notFound(.*)",
      component: NotFoundView
    }
  ]
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
