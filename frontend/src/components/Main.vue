<script setup>
import { useSidebarTogglerStore } from "/stores/sidebarToggler.js";

// define options
defineOptions({
  name: "MainComponent",
});

const togglerStore = useSidebarTogglerStore();
</script>

<template>
  <div
    class="bg-gray-200 ms-auto oc min-h-screen relative z-0 overflow-hidden"
    :class="togglerStore.isToggle ? 'ps-[300px]' : 'ps-[50px]'"
  >
    <slot></slot>
  </div>
</template>
