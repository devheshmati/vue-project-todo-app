import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth.js";

export const useTodoStore = defineStore("todos", () => {
  // define tasks list
  const todosList = ref([]);
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
      const response = await axios.get(`/api/todos`, { headers });

      // manage errors
      if (!response.status === 200) {
        throw new Error("Request failed!");
      }

      // return todosList
      todosList.value = response.data;
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
      const response = await axios.post(`/api/todos`, todoData, {
        headers,
      });

      // handle error
      if (response.status === 201) {
        todosList.value.push(response.data.todo); // add to todolist
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
  async function updateTodoStatus(todo) {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      const headers = { Authorization: `Bearer ${authStore.userToken}` };

      const updatedTodo = { ...todo, is_done: !todo.is_done };

      // request to the api
      const response = await axios.put(`/api/todos/${todo.id}`, updatedTodo, {
        headers,
      });

      if (response.status === 200) {
        const newTodo = response.data.todo ?? response.data;
        if (newTodo && newTodo.id) {
          const index = todosList.value.findIndex((t) => t.id === todo.id);
          if (index !== -1) {
            todosList.value[index] = newTodo; // update locally
          }
        }

        return {
          success: true,
          message: "Todo updated successfully",
          todo: newTodo,
        };
      } else {
        throw new Error("Failed to update todo!");
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message ||
        error.message ||
        "Error updating todo.";

      return { success: false, message: errorMessage.value };
    } finally {
      isLoading.value = false;
    }
  }

  // edit task
  async function editTodo(todoId, updatedTodo) {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      const headers = { Authorization: `Bearer ${authStore.userToken}` };

      // create request to api
      const response = await axios.put(`/api/todos/${todoId}`, updatedTodo, {
        headers,
      });

      if (response.status !== 200) {
        throw new Error("Update todo failed!");
      }

      const index = todosList.value.findIndex((t) => t.id === todoId);

      if (index !== -1) {
        todosList.value[index] = response.data.todo; // update locally
      }

      return {
        success: true,
        message: response.data.message,
        todo: response.data.todo,
      };
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message ||
        error.message ||
        "Error updating todo.";

      return {
        success: false,
        message: errorMessage.value,
      };
    } finally {
      isLoading.value = false;
    }
  }

  // delete task
  async function deleteTodo(todoId) {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      const headers = { Authorization: `Bearer ${authStore.userToken}` };
      const response = await axios.delete(`/api/todos/${todoId}`, {
        headers,
      });

      if (response.status === 200) {
        // update todoList
        todosList.value = todosList.value.filter((t) => t.id !== todoId);

        // return successfully message to the user
        return {
          success: true,
          message: response.data.message || "Todo deleted successfully.",
        };
      } else {
        throw new Error("Failed to delete todo!");
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message ||
        error.message ||
        "Error deleting todo.";

      return {
        success: false,
        message: errorMessage.value,
      };
    } finally {
      isLoading.value = false;
    }
  }

  // exports
  return {
    todosList,
    errorMessage,
    isLoading,
    getTodos,
    addTodo,
    updateTodoStatus,
    deleteTodo,
    editTodo,
  };
});
