<script setup>
import { useSidebarTogglerStore } from "/stores/sidebarToggler.js";
import { onMounted } from "vue";

// Define Options
defineOptions({
  name: "TodosListComponent",
});

defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  errorMessage: {
    type: String,
    required: true,
    default: () => "",
  },
});

const togglerStore = useSidebarTogglerStore();
</script>

<template>
  <div
    class="bg-gray-400 ms-auto oc"
    :class="
      togglerStore.isToggle ? 'w-[calc(100vw-300px)]' : 'w-[calc(100vw-50px)]'
    "
  >
    <ul v-if="data.length > 0 && !errorMessage">
      <li v-for="todo in data">
        <span>{{ todo.name }}</span>
      </li>
    </ul>
    <span>This is todos list</span>
    <router-view />
  </div>
</template>
