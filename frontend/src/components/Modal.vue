<script setup>
import { useModalStore } from "/stores/modal";

defineOptions({
  name: "ModalComponent",
});

const modalStore = useModalStore();
</script>

<template>
  <div
    v-if="modalStore.isToggle"
    class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-6 w-8/10 sm:w-96 relative">
      <slot></slot>
    </div>
  </div>
</template>
