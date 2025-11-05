<script setup>
import { useTodoStore } from "/stores/todos.js";
import { reactive, ref, computed, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import axios from "axios";

// Define Options
defineOptions({
  name: "CreateTodoPage",
});

const errorMessage = ref("");
const message = ref("");
const isLoading = ref(false);
const form = reactive({
  title: "",
  desc: "",
  is_done: false,
});
const baseUrl = "http://localhost:8000/api";

const rules = {
  title: { required },
  description: { maxLength: maxLength(500) },
};

const v$ = useVuelidate(rules, form);

const todoStore = useTodoStore();

async function handleCreateTodo() {
  errorMessage.value = "";

  const result = await v$.value.$validate();

  if (result) {
    await submitData();
  } else {
    errorMessage.value = "Please currect the form errors.";
  }
}

async function submitData() {
  errorMessage.value = "";
  isLoading.value = true;

  const result = await todoStore.addTodo(form);

  if (result.success) {
    message.value = "Task created successfully";

    form.title = "";
    form.description = "";
    form.is_done = false;

    v$.value.$reset();
  } else {
    errorMessage.value = result.message;
  }

  isLoading.value = false;
}

//computed isAuthenticate

onMounted(() => {
  // checkauth
});
</script>

<template>
  <div class="flex justify-center items-center h-screen w-full">
    <form
      @submit.prevent="handleCreateTodo"
      class="bg-gray-800 w-1/2 mx-auto p-8 rounded-lg"
    >
      <div class="m-4">
        <h3 class="text-center text-gray-200 text-2xl font-bold">
          Create Task
        </h3>
      </div>
      <!-- Title input -->
      <div class="mb-4">
        <label for="name" class="block text-md font-bold text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="name"
          v-model.trim="form.title"
          class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
          placeholder="Enter your name"
          @blur="v$.title.$touch"
        />
        <div v-if="v$.title.$error">
          <p
            v-for="error of v$.title.$errors"
            :key="error.$uid"
            class="mt-1 text-sm text-red-600"
          >
            {{ error.$message }}
          </p>
        </div>
      </div>

      <!-- Description input -->
      <div class="mb-4">
        <label for="name" class="block text-md font-bold text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          v-model.trim="form.description"
          class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300 resize-none"
          placeholder="Enter description..."
          rows="4"
          @blur="v$.description.$touch"
        ></textarea>
        <div v-if="v$.description.$error">
          <p
            v-for="error of v$.description.$errors"
            :key="error.$uid"
            class="mt-1 text-sm text-red-600"
          >
            {{ error.$message }}
          </p>
        </div>
      </div>

      <!-- Error showing -->
      <p v-if="errorMessage" class="mb-4 text-center text-red-600 text-sm">
        {{ errorMessage }}
      </p>

      <!-- Error showing from todoStore -->
      <p
        v-if="todoStore.errorMessage"
        class="mb-4 text-center text-red-600 text-sm"
      >
        {{ todoStore.errorMessage }}
      </p>

      <!-- Successfully showing from todoStore -->
      <p v-if="message" class="mb-4 text-center text-lime-600 text-sm">
        {{ message }}
      </p>

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
        :disabled="isLoading"
      >
        Create Task
      </button>
    </form>
  </div>
</template>
