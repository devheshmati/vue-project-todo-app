<script setup>
import { useAuthStore } from "/stores/auth";
import Sidebar from "../../components/Sidebar.vue";
import Main from "../../components/Main.vue";
import DashboardReport from "../../components/DashboardReport.vue";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// define options
defineOptions({
  name: "DashboardPage",
});

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isAuthenticate = computed(() => authStore.checkAuth());

watch(
  isAuthenticate,
  (value) => {
    if (!value && route.path.startsWith("/dashboard") && route.path !== "/") {
      router.push("/");
    }
  },
  { immediate: true },
);

// fetch todos
</script>
<template>
  <div>
    <Sidebar />
    <Main>
      <DashboardReport v-if="route.path === '/dashboard'" />
      <router-view />
    </Main>
  </div>
</template>
