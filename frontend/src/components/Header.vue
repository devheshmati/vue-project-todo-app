<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "/stores/auth";

// Define Options
defineOptions({
  name: "HeaderComponent",
});

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticate = computed(() => {
  return !!authStore.userToken;
});

onMounted(async () => {
  // check user authenticate or not
  await authStore.checkAuth();
});

// methods
function logout() {
  router.push("/login");
  authStore.logOut();
}
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
          <li v-if="!isAuthenticate">
            <router-link
              to="/login"
              class="hover:text-gray-200 transition duration-200"
              >Login</router-link
            >
          </li>
          <li v-if="!isAuthenticate">
            <router-link
              to="/register"
              class="hover:text-gray-200 transition duration-200"
              >Register</router-link
            >
          </li>
          <li v-if="isAuthenticate">
            <router-link
              to="/"
              class="hover:text-gray-200 transition duration-200"
              >Home</router-link
            >
          </li>
          <li v-if="isAuthenticate">
            <router-link
              to="/dashboard"
              class="hover:text-gray-200 transition duration-200"
              >Dashboard</router-link
            >
          </li>
          <li v-if="isAuthenticate">
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
