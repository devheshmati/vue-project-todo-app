<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

onMounted(() => {
  const tl = gsap.timeline();
  const anime1 = {
    scale: 0.1,
    duration: 1,
    stagger: { amount: 1, from: "center", grid: "auto" },
    repeat: -1,
    yoyo: true,
    opacity: 1,
  };
  tl.to(".box", anime1);
});
</script>

<template>
  <div>
    <ul
      class="grid grid-cols-12 gap-2 bg-gray-700 p-2 justify-items-center h-screen items-center overflow-hidden"
    >
      <li
        v-for="x in 72"
        :key="x"
        class="w-[90px] h-[90px] bg-red-600 box flex justify-center items-center text-white"
      ></li>
    </ul>
  </div>
</template>
