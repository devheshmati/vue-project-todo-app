<script>
export default {
  name: "Home Page",
};
</script>

<script setup>
import Header from "../components/Header.vue";
import { useAuthStore } from "/stores/auth";
import { onMounted, ref } from "vue";

const isAuthenticate = ref(false);

const authStore = useAuthStore();

onMounted(() => {
  isAuthenticate.value = authStore.checkAuth();
});
</script>

<template>
  <div>
    <Header />
    <div>This is home page</div>
    <p></p>
  </div>
</template>

<style scoped></style>
