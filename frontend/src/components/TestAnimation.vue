<script setup>
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { onMounted } from "vue";

gsap.registerPlugin(SplitText);

onMounted(() => {
  let splitText1 = SplitText.create(".txt1", {
    type: "chars, words, lines",
  });

  gsap.from(splitText1.words, {
    yPercent: "random([-100, 100])",
    rotation: "random(-30, 30)",
    ease: "power3.out",
    autoAlpha: 0,
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 1,
      from: "random",
    },
  });
});
</script>

<template>
  <div>
    <p class="txt1 w-1/2 mx-auto mt-10">
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
</template>

<style scoped></style>
