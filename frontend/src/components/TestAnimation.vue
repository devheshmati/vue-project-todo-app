<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const boxes = ref([]);
const nextSectionBoxes = ref([]); // متغیر ref جدید برای عناصر سکشن بعدی

onMounted(() => {
  // تایم‌لاین برای سکشن اول
  const tl1 = gsap.timeline({ repeat: -1 });
  tl1.to(boxes.value, {
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
  tl1.to(boxes.value, {
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

  // تایم‌لاین جدید برای سکشن دوم
  const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 1 }); // مثلاً با repeatDelay
  tl2.from(nextSectionBoxes.value, {
    // مثالی از یک انیمیشن متفاوت
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "power2.out",
  });
  tl2.to(nextSectionBoxes.value, {
    duration: 0.8,
    rotation: 360,
    stagger: 0.1,
    ease: "elastic.out",
  });
});
</script>

<template>
  <!-- والد flex برای وسط‌چین کردن کل گرید -->
  <div class="flex justify-center">
    <div
      class="grid grid-cols-[repeat(12,1fr)] p-2 bg-gray-700 overflow-hidden gap-2"
    >
      <!-- 84 عنصر -->
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

  <div class="my-10 flex justify-center">
    <h2>این سکشن دوم است</h2>
  </div>

  <div class="flex justify-center">
    <div
      class="grid grid-cols-[repeat(6,1fr)] p-4 bg-gray-800 gap-3 overflow-hidden mb-10"
    >
      <!-- عناصر برای سکشن دوم -->
      <div
        v-for="j in 24"
        :key="j"
        ref="nextSectionBoxes"
        class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white"
      >
        {{ j }}
      </div>
    </div>
  </div>
</template>
