<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

onMounted(() => {
  gsap.context(() => {
    const boxes = gsap.utils.toArray(".box");
    const tl = gsap.timeline({ repeat: -1 });

    // 🔁 فاز 1: رفت — از اولین به آخرین
    boxes.forEach((box) => {
      tl.to(box, {
        duration: 1,
        x: 100,
        rotate: 360,
        ease: "bounce.out",
      });
    });

    // 🔁 فاز 2: برگشت — از آخرین به اولین
    boxes
      .slice()
      .reverse()
      .forEach((box) => {
        tl.to(box, {
          duration: 1,
          x: 0,
          rotate: 0,
          ease: "bounce.out",
        });
      });
  });
});
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <div class="box w-10 h-10 bg-red-500"></div>
    <div class="box w-10 h-10 bg-blue-500"></div>
    <div class="box w-10 h-10 bg-green-500"></div>
    <div class="box w-10 h-10 bg-yellow-500"></div>
  </div>
</template>
