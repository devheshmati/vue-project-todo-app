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
const isScrolled = ref(null);
const isToggler = computed(() => {
  if (headerStore.isToggler) {
    return true;
  } else {
    return false;
  }
});
const mobileNavbarNavLinks = ref([]);
const mainLogo = ref(null);
const mainTitle = ref(null);
const togglerBtn = ref(null);
const mainNavList = ref(null);
const mainNavLinks = ref([]);

const isAuthenticate = computed(() => {
  return !!authStore.userToken;
});

function handleScroll() {
  isScrolled.value = window.scrollY > 80;
}

// methods
function logout() {
  authStore.logOut();
  router.push("/login");
}

onMounted(async () => {
  mobileNavbarNavLinks.value = mobileNavbar.value.querySelectorAll("li");

  // scroll logic for sticky header
  window.addEventListener("scroll", handleScroll);

  // check user authenticate or not
  await authStore.checkAuth();

  // logo animation
  const tl = gsap.timeline();

  tl.from(mainLogo.value, {
    delay: 0.5,
    xPercent: -50,
    autoAlpha: 0,
    duration: 0.4,
    ease: "expo.out",
    yPercent: -50,
  }).from([mainTitle.value, mainNavList.value], {
    autoAlpha: 0,
    ease: "expo.out",
    duration: 1.4,
    stagger: {
      each: 0.4,
    },
  });
});

watch(isScrolled, (val) => {
  if (val) {
    gsap.from(mainHeader.value, {
      yPercent: -110,
      ease: "expo.out",
      duration: 0.5,
      zIndex: 100,
    });
  }
});

watch(isToggler, (val) => {
  if (isToggler.value) {
    gsap.from(mobileNavbarNavLinks.value, {
      xPercent: -110,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 0.5,
      stagger: {
        each: 0.1,
      },
    });

    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

onUnmounted(() => {
  headerStore.closeToggler();
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <!-- mobile navbar -->
    <div
      ref="mobileNavbar"
      class="fixed sm:hidden w-screen h-screen bg-black/90 z-110"
      :class="isToggler ? 'fixed' : 'hidden'"
    >
      <!-- clsoe button -->
      <button
        @click="headerStore.closeToggler"
        class="absolute right-5 top-5 z-10"
      >
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
      <nav class="block sm:hidden w-full h-full z-100">
        <ul
          class="flex flex-col space-x-6 text-xl h-full w-full pt-8 text-white"
        >
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

    <header
      class="bg-black/90 z-100 text-white shadow-lg block"
      :class="isScrolled ? 'fixed top-0 lef-0 w-full' : ''"
      ref="mainHeader"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
      >
        <div class="flex items-center space-x-4">
          <img
            ref="mainLogo"
            src="/logos/todo-logo.png"
            alt="To-Do App Logo"
            class="h-8 w-8"
          />
          <h1 ref="mainTitle" class="text-xl font-semibold">To-Do App</h1>
        </div>

        <!-- open toggler button -->
        <button
          ref="togglerBtn"
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
          <ul ref="mainNavList" class="flex space-x-6">
            <li v-if="!isAuthenticate">
              <router-link to="/login" class="hover:text-gray-200"
                >Login</router-link
              >
            </li>
            <li v-if="!isAuthenticate">
              <router-link to="/register" class="hover:text-gray-200"
                >Register</router-link
              >
            </li>
            <li v-if="isAuthenticate">
              <router-link to="/" class="hover:text-gray-200">Home</router-link>
            </li>
            <li v-if="isAuthenticate">
              <router-link to="/dashboard" class="hover:text-gray-200"
                >Dashboard</router-link
              >
            </li>
            <li v-if="isAuthenticate">
              <button @click="logout" class="hover:text-gray-200">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>
