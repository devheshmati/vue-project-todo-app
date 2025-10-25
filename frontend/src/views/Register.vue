<script>
// Define the component name
export default {
  name: "Register Page",
};
</script>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

// Computed property to check if passwords match
const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value;
});

async function handleRegister() {
  if (!passwordsMatch.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const url = "http://localhost:8000/api/register";
    const response = await axios.post(url, {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });

    if (response.status === 201) {
      router.push("/login");

      // i think some action should be happend here
    }
  } catch (error) {
    if (error.responses) {
      errorMessage.value =
        error.response.data.message || "Registration failed. Please try again";
    } else {
      errorMessage.value = "Network error. Please check your connection.";
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Your Account
      </h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            v-model.trim="name"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="confirm-password"
            class="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            v-model.trim="confirmPassword"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            required
          />
          <p
            v-if="!passwordsMatch && confirmPassword"
            class="mt-1 text-sm text-red-600"
          >
            Passwords do not match
          </p>
        </div>
        <button
          type="submit"
          class="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
          :disabled="!passwordsMatch"
        >
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">
          Log In
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
