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
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "todos",
        name: "todos",
        component: Todos,
      },
      {
        path: "todos/create",
        name: "createTodo",
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
