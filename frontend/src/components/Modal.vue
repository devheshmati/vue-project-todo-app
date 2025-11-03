<script setup>
defineOptions({
  name: "ModalComponent",
});

defineProps({
  isToggle: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    v-if="isToggle"
    class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96 relative">
      <slot></slot>
    </div>
  </div>
</template>
