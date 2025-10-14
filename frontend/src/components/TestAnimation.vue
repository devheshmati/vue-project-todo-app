<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { onMounted } from "vue";

// register gsap plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

onMounted(() => {
  gsap.from(".content", {
    xPercent: 150,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".content",
      start: "top bottom",
      end: "bottom center",
      scrub: true,
    },
  });
});
</script>

<template>
  <div>
    <div
      class="panel h-screen bg-blue-600 text-white text-lg px-10 flex flex-col justify-center items-center overflow-hidden"
    >
      <p class="">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
    <div
      class="panel h-screen bg-gray-600 text-white text-lg px-10 flex flex-col justify-center items-center overflow-hidden"
    >
      <p class="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
    <div
      class="panel h-screen bg-cyan-600 text-white text-lg px-10 flex flex-col justify-center items-center overflow-hidden"
    >
      <p class="">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
    <div
      class="panel h-screen bg-lime-600 text-white text-lg px-10 flex flex-col justify-center items-center overflow-hidden"
    >
      <p class="">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
