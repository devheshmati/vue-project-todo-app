<script setup>
import Header from "../../../components/Header.vue";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "/stores/auth";
import { useRouter } from "vue-router";
import Sidebar from "../../../components/Sidebar.vue";
import TodosList from "../../../components/TodosList.vue";
import { useTodoStore } from "/stores/todos.js";

// define options
defineOptions({
  name: "TodosPage",
});

const isLoading = ref(false);
const errorMessage = ref("");
const authStore = useAuthStore();
const router = useRouter();
const todoStore = useTodoStore();
const testText = ref("testText");

onMounted(() => {
  // check saved user token after logged in
  authStore.checkAuth();
  todoStore.getTodos();
});

// fetch todos
</script>
<template>
  <div>
    <Sidebar />
    <TodosList
      :data="todoStore.todoList"
      :errorMessage="todoStore.errorMessage"
    />
    <span>This is todos</span>
  </div>
</template>
