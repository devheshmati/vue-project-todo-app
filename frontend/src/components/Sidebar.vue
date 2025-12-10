<script setup>
import { ref, watch } from "vue";
import { useSidebarTogglerStore } from "/stores/sidebarToggler.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "/stores/auth";
import { useModalStore } from "/stores/modal";
import { gsap } from "gsap";

// define options
defineOptions({
  name: "Sidebar",
});

const modalStore = useModalStore();
const sidebar = ref(null);
const router = useRouter();
const authStore = useAuthStore();
const togglerStore = useSidebarTogglerStore();

async function logout() {
  authStore.logOut();
  router.push("/");
}

watch(
  () => modalStore.isToggle,
  (newVal) => {
    if (newVal) {
      gsap.to(sidebar.value, {
        xPercent: -110,
        ease: "power.in",
      });
    } else {
      gsap.to(sidebar.value, {
        xPercent: 0,
        ease: "power.out",
      });
    }
  },
);
</script>

<template>
  <div
    ref="sidebar"
    :class="togglerStore.isToggle ? 'w-full sm:w-[300px]' : 'w-[50px]'"
    class="sidebar fixed left-0 top-0 bg-[rgba(0,0,0,1)] h-screen overflow-hidden z-10"
  >
    <ul class="flex flex-col mt-10">
      <div
        :class="togglerStore.isToggle ? 'justify-between' : 'justify-center'"
        class="flex items-center font-bold text-white px-4 py-5"
      >
        <div v-if="togglerStore.isToggle" class="text-xl">Menu</div>
        <button @click="togglerStore.handleToggler" class="">
          <svg
            v-if="!togglerStore.isToggle"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 text-gray-300 hover:text-white cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            v-if="togglerStore.isToggle"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 text-gray-300 hover:text-white cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <li>
        <router-link
          to="/dashboard"
          :class="togglerStore.isToggle ? 'px-4' : 'px-3'"
          class="text-gray-300 py-5 hover:text-cyan-200 hover:bg-gray-800 flex items-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </span>
          <span class="text-nowrap ms-4">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/dashboard/todos/create"
          :class="togglerStore.isToggle ? 'px-4' : 'px-3'"
          class="text-gray-300 py-5 hover:text-cyan-200 hover:bg-gray-800 flex items-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span class="text-nowrap ms-4">Create new task</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/dashboard/todos"
          :class="togglerStore.isToggle ? 'px-4' : 'px-3'"
          class="py-5 text-gray-300 hover:text-cyan-200 hover:bg-gray-800 flex"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </span>

          <span class="text-nowrap ms-4">Tasks</span>
        </router-link>
      </li>
      <li class="mt-4">
        <router-link
          to="/"
          :class="togglerStore.isToggle ? 'px-4' : 'px-3'"
          class="py-5 text-gray-300 hover:text-cyan-200 hover:bg-gray-800 flex"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>

          <span class="text-nowrap ms-4">Home</span>
        </router-link>
      </li>
      <li>
        <button
          @click="logout"
          :class="togglerStore.isToggle ? 'px-4' : 'px-3'"
          class="mt-4 py-5 text-gray-300 hover:text-cyan-200 hover:bg-gray-800 flex cursor-pointer"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </span>
          <span class="text-nowrap ms-4">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>
