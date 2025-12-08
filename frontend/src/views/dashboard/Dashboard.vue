<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Main from "../../components/Main.vue";
import DashboardReport from "../../components/DashboardReport.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// define options
defineOptions({
  name: "DashboardPage",
});

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
