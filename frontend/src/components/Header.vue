<script>
export default {
  name: "HeaderComponent",
};
</script>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// computed property
const isAuthenticated = computed(() => {
  return false;
});

// methods
const logout = () => {
  console.log("Logging out");
  router.push("/login");
};
</script>

<template>
  <header
    class="bg-linear-to-r from-gray-700 to-[rgba(0,0,100,0.7)] text-white shadow-lg"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
    >
      <div class="flex items-center space-x-4">
        <img src="/images/todo-logo.png" alt="To-Do App Logo" class="h-8 w-8" />
        <h1 class="text-xl font-semibold">To-Do App</h1>
      </div>
      <nav>
        <ul class="flex space-x-6">
          <li v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="hover:text-gray-200 transition duration-200"
              >Login</router-link
            >
          </li>
          <li v-if="!isAuthenticated">
            <router-link
              to="/register"
              class="hover:text-gray-200 transition duration-200"
              >Register</router-link
            >
          </li>
          <li v-if="isAuthenticated">
            <router-link
              to="/home"
              class="hover:text-gray-200 transition duration-200"
              >Home</router-link
            >
          </li>
          <li v-if="isAuthenticated">
            <button
              @click="logout"
              class="hover:text-gray-200 transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
