<script setup>
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

gsap.registerPlugin(SplitText, ScrollTrigger);

let split = ref(null);

onMounted(() => {
  document.fonts.ready.then(() => {
    SplitText.create(".txt1", {
      type: "lines",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split.value = gsap.from(self.lines, {
          opacity: 0,
          duration: 0.6,
          yPercent: 100,
          stagger: 0.1,
          ease: "expo.out",
        });
      },
    });
  });
});

function handleClick() {
  if (split.value) {
    split.value.play(0);
  }
}
</script>

<template>
  <div>
    <p class="txt1 w-1/2 mx-auto mt-10 text-xl">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
  <div>
    <p class="txt2 w-1/2 mx-auto mt-10">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>

  <div>
    <button
      @click="handleClick"
      class="bg-purple-700 text-white px-4 py-2 mx-auto"
    >
      Run Animation Again
    </button>
  </div>
</template>

<style scoped></style>
