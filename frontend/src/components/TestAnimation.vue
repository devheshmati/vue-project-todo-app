<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const boxes = ref([]);

onMounted(() => {
  // boxes.value یک آرایه از عناصر DOM است — با ترتیب دقیق
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.to(boxes.value, {
    duration: 0.5,
    scale: 0.1,
    ease: "power1.inOut",
    stagger: {
      amount: 1.5,
      from: "center",
      grid: [7, 12],
      ease: "power1.out",
    },
  });
  tl.to(boxes.value, {
    duration: 0.5,
    scale: 1,
    ease: "power1.inOut",
    stagger: {
      amount: 1.5,
      from: "center",
      grid: [7, 12],
      ease: "power1.out",
    },
  });
});
</script>

<template>
  <!-- والد flex برای وسط‌چین کردن کل گرید -->
  <div class="flex justify-center">
    <div
      class="grid grid-cols-[repeat(12,1fr)] p-2 bg-gray-700 overflow-hidden gap-2"
    >
      <!-- 105 عنصر = 15 × 7 -->
      <div
        v-for="i in 84"
        :key="i"
        ref="boxes"
        class="w-10 h-10"
        :class="[
          i % 4 === 1
            ? 'bg-blue-500'
            : i % 4 === 2
              ? 'bg-lime-500'
              : i % 4 === 3
                ? 'bg-purple-500'
                : 'bg-cyan-500',
        ]"
      ></div>
    </div>
  </div>
</template>
