<script setup>
import { useTodoStore } from "/stores/todos.js";
import { reactive, ref, computed, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import axios from "axios";
import { gsap } from "gsap";

// Define Options
defineOptions({
  name: "CreateTodoPage",
});

const mainForm = ref(null);
const mainHeader = ref(null);
const input1 = ref(null);
const input2 = ref(null);
const label1 = ref(null);
const label2 = ref(null);
const submitBtn = ref(null);
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

onMounted(() => {
  // get all labels and inputs element
  const tl = gsap.timeline();
  tl.from(mainForm.value, {
    autoAlpha: 0,
    ease: "power.out",
    duration: 0.6,
    delay: 0.5,
  }).from(
    [
      mainHeader.value,
      label1.value,
      input1.value,
      label2.value,
      input2.value,
      submitBtn.value,
    ],
    {
      yPercent: 110,
      autoAlpha: 0,
      ease: "expo.out",
      stagger: {
        each: 0.1,
      },
    },
  );
});
</script>

<template>
  <div class="flex justify-center items-center h-screen w-full">
    <form
      ref="mainForm"
      @submit.prevent="handleCreateTodo"
      class="bg-gray-800 w-8/10 sm:w-1/2 mx-auto p-4 sm:p-8 rounded-lg"
    >
      <div class="m-4">
        <h3
          ref="mainHeader"
          class="text-center text-gray-200 text-md sm:text-2xl font-bold"
        >
          Create Task
        </h3>
      </div>
      <!-- Title input -->
      <div class="mb-4">
        <label
          ref="label1"
          for="name"
          class="block text-md font-bold text-gray-300"
        >
          Title
        </label>
        <input
          ref="input1"
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
        <label
          ref="label2"
          for="name"
          class="block text-md font-bold text-gray-300"
        >
          Description
        </label>
        <textarea
          ref="input2"
          id="description"
          v-model.trim="form.description"
          class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300 resize-none"
          placeholder="Enter description..."
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
        ref="submitBtn"
        type="submit"
        class="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
        :disabled="isLoading"
      >
        Create Task
      </button>
    </form>
  </div>
</template>
