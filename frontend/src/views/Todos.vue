<script>
export default {
  name: "Todos Page",
};
</script>

<script setup>
import Header from "../components/Header.vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from "/stores/auth";
import { useRouter } from "vue-router";

const todos = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  // check saved user token after logged in
  const checkAuth = authStore.checkAuth();
  console.log(checkAuth, authStore.userToken);
});

// fetch todos
</script>
<template>
  <div>
    <Header />
  </div>
</template>
