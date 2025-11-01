import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth.js";

export const useTodoStore = defineStore("todos", () => {
  // define tasks list
  const todosList = ref([]);
  const baseUrl = "http://localhost:8000/api";
  const errorMessage = ref("");
  const isLoading = ref(false);
  const authStore = useAuthStore();

  authStore.checkAuth();
  // computed when todos changes happend

  // read tasks
  async function getTodos() {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      // checkauth

      // if user token not ready
      if (!authStore.userToken) {
        throw new Error("You have not access to action! Please login first.");
      }

      const headers = {
        Authorization: `Bearer ${authStore.userToken}`,
      };

      // fetch data from api
      const response = await axios.get(`${baseUrl}/todos`, { headers });

      // manage errors
      if (!response.status === 200) {
        throw new Error("Request failed!");
      }

      // return todosList
      todosList.value = response.data.todos;
    } catch (error) {
      errorMessage.value =
        error.message?.data?.message ||
        error.message ||
        "Error fetching todos.";
    } finally {
      isLoading.value = false;
    }
  }

  // add task
  async function addTodo(todoData) {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      // headers
      const headers = {
        Authorization: `Bearer ${authStore.userToken}`,
      };

      // we need to fetch data to the api for create todo
      const response = await axios.post(`${baseUrl}/todos`, todoData, {
        headers,
      });

      // handle error
      if (response.status === 201) {
        todosList.value.unshift(response.data.todo);
        return {
          success: true,
          message: "Todo created successfully.",
          todo: response.data.todo,
        };
      } else {
        throw new Error("Failed to create todo.");
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message ||
        error.message ||
        "Error creating todo.";
      return { success: false, message: errorMessage.value };
    } finally {
      isLoading.value = false;
    }
  }

  // update task
  async function updateTodo(id) {}

  // delete task
  async function deleteTodo(id) {}

  // exports
  return { todosList, errorMessage, isLoading, getTodos, addTodo };
});
