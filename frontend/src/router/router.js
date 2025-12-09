import HomePage from "../views/pages/HomePage.vue";
import LoginPage from "../views/pages/LoginPage.vue";
import RegisterPage from "../views/pages/RegisterPage.vue";
import Todos from "../views/dashboard/todos/Todos.vue";
import CreateTodo from "../views/dashboard/todos/CreateTodo.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import NotConnectionPage from "../views/errors/NotConnectionPage.vue";
import NotFoundPage from "../views/errors/NotFoundPage.vue";
import AboutUsPage from "../views/pages/AboutUsPage.vue";
import ContactUsPage from "../views/pages/ContactUsPage.vue";
import { useAuthStore } from "/stores/auth";

import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: AboutUsPage,
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUsPage,
  },
  {
    path: "/dashboard",
    meta: { requiresAuth: true },
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "todos",
        name: "Todos",
        component: Todos,
      },
      {
        path: "todos/create",
        name: "TodosCreate",
        component: CreateTodo,
      },
    ],
  },
  {
    path: "/not-connection",
    name: "/NotConnection",
    component: NotConnectionPage,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    if (authStore.isLoading) {
      await authStore.checkAuth();
    }

    if (!authStore.userToken) {
      return next({
        path: "/",
        query: { message: "You have not access! first logged in." },
      });
    }
  }

  if (to.path === "/not-connection") return next();

  try {
    const res = await axios("/api/ping");
    if (res.data.status === "ok") {
      next();
    } else {
      throw new Error("Server connection failed!");
    }
  } catch (e) {
    next("/not-connection");
  }
});

export default router;
