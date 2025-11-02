<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useAuthStore } from "/stores/auth";
import { useTodoStore } from "/stores/todos.js";
import Sidebar from "../../../components/Sidebar.vue";
import TodosList from "../../../components/TodosList.vue";

// define options
defineOptions({
  name: "TodosPage",
});

const authStore = useAuthStore();
const todoStore = useTodoStore();
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  errorMessage.value = "";
  // check saved user token after logged in
  const isAuthenticate = await !!authStore.checkAuth();
  if (isAuthenticate) {
    try {
      await todoStore.getTodos();
    } catch (error) {
      errorMessage.value = error.message || "Failed to load todos.";
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = "You are not Authenticate!";
  }
});

// fetch todos
</script>
<template>
  <div class="flex flex-cols justify-center items-center h-screen">
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <TodosList
      v-else-if="todoStore.todosList"
      :data="todoStore.todosList"
      :errorMessage="todoStore.errorMessage"
    />
    <div v-else>No todos, found!</div>
  </div>
</template>
