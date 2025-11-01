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
    class="bg-gray-400 ms-auto oc min-h-screen"
    :class="
      togglerStore.isToggle ? 'w-[calc(100vw-300px)]' : 'w-[calc(100vw-50px)]'
    "
  >
    <slot></slot>
  </div>
</template>
