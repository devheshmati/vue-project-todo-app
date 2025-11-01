import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Todos from "../views/dashboard/todos/Todos.vue";
import CreateTodo from "../views/dashboard/todos/CreateTodo.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      {
        path: "todos",
        component: Todos,
      },
      {
        path: "todos/create",
        component: CreateTodo,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
