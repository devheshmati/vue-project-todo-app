<script setup>
import { gsap } from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  gsap.to(".box", {
    keyframes: {
      25: { x: 100, y: 0, ease: "back.out" },
      50: { x: 100, y: 100, ease: "back.out" },
      75: { x: 0, y: 100, ease: "back.out" },
      100: { x: 0, y: 0, ease: "back.out" },
    },
    duration: 2,
    repeat: -1,
  });
});
</script>

<template>
  <div class="overflow-hidden bg-gray-700 h-screen">
    <div class="box h-[40px] w-[40px] bg-blue-400 inline-block m-4"></div>
  </div>
</template>

<style></style>
