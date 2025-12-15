<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useAuthStore } from "/stores/auth";
import { useHeaderStore } from "/stores/header";
import { gsap } from "gsap";

// Define Options
defineOptions({
  name: "HeaderComponent",
});

const router = useRouter();
const authStore = useAuthStore();
const headerStore = useHeaderStore();
const mobileNavbar = ref(null);
const mainHeader = ref(null);

const isAuthenticate = computed(() => {
  return !!authStore.userToken;
});

onMounted(async () => {
  // check user authenticate or not
  await authStore.checkAuth();
});

// methods
function logout() {
  authStore.logOut();
  router.push("/login");
}

onUnmounted(() => {
  headerStore.closeToggler();
});
</script>

<template>
  <header class="bg-black/90 z-100 text-white shadow-lg" ref="mainHeader">
    <!-- mobile navbar -->
    <div
      v-if="headerStore.isToggler"
      ref="mobileNavbar"
      class="fixed sm:hidden w-screen h-screen bg-black/90 z-100"
    >
      <!-- clsoe button -->
      <button @click="headerStore.closeToggler" class="absolute right-5 top-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8 text-slate-400 hover:text-slate-200"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav class="block sm:hidden w-full h-full">
        <ul class="flex flex-col space-x-6 text-xl h-full w-full pt-8">
          <li v-if="!isAuthenticate">
            <router-link
              to="/login"
              class="hover:text-gray-200 transition duration-200 w-full inline-block p-4"
              >Login</router-link
            >
          </li>
          <li v-if="!isAuthenticate">
            <router-link
              to="/register"
              class="hover:text-gray-200 transition duration-200 w-full inline-block p-4"
              >Register</router-link
            >
          </li>
          <li v-if="isAuthenticate">
            <router-link
              to="/"
              class="hover:text-gray-200 transition duration-200 w-full inline-block p-4"
              >Home</router-link
            >
          </li>
          <li v-if="isAuthenticate">
            <router-link
              to="/dashboard"
              class="hover:text-gray-200 transition duration-200 w-full inline-block p-4"
              >Dashboard</router-link
            >
          </li>
          <li v-if="isAuthenticate" class="mt-10">
            <button
              @click="logout"
              class="hover:text-gray-200 transition duration-200 w-full inline-block p-4 text-start"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
    >
      <div class="flex items-center space-x-4">
        <img src="/logos/todo-logo.png" alt="To-Do App Logo" class="h-8 w-8" />
        <h1 class="text-xl font-semibold">To-Do App</h1>
      </div>
      <button
        class="block sm:hidden text-slate-500 hover:text-slate-300"
        @click="headerStore.openToggler"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <nav class="hidden sm:block">
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
