<script>
// Define the component name
export default {
  name: "Login Page",
};
</script>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

const router = useRouter();
const credentials = ref({
  email: "",
  password: "",
});
const isLoading = ref(true);
const errorMessage = ref("");
const authStore = useAuthStore();

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, credentials);

async function handleLogin() {
  const result = await v$.value.$validate();

  if (result) {
    await submitForm();
  } else {
    errorMessage.value = "Please currect the form errors";
  }
}

async function submitForm() {
  errorMessage.value = "";

  try {
    authStore.login(credentials.value);
  } catch (error) {
    if (error.message) {
      console.log(error.message);
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Log in to Your Account
      </h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4 text-red-400">
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model.trim="credentials.email"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            @blur="v$.email.$touch"
          />
          <div v-if="v$.email.$error">
            <p
              class="mt-1 text-sm text-red-600"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            v-model.trim="credentials.password"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            @blur="v$.password.$touch"
          />
          <div v-if="v$.password.$error">
            <p
              class="mt-1 text-sm text-red-600"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
        >
          Log In
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline">
          Sign Up
        </router-link>
      </p>
      <p class="mt-4 text-center text-sm text-gray-600">
        Go Home.
        <router-link to="/" class="text-blue-500 hover:underline">
          Home
        </router-link>
      </p>
    </div>
  </div>
</template>
