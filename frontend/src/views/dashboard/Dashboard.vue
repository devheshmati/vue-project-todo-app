<script setup>
import { useAuthStore } from "/stores/auth";
import Sidebar from "../../components/Sidebar.vue";
import Main from "../../components/Main.vue";
import { onMounted } from "vue";

// define options
defineOptions({
  name: "DashboardPage",
});

const authStore = useAuthStore();

onMounted(() => {
  // check saved user token after logged in
  authStore.checkAuth();
});

// fetch todos
</script>
<template>
  <div>
    <Sidebar />
    <Main>
      <router-view />
    </Main>
  </div>
</template>
