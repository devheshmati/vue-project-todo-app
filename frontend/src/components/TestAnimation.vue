<script setup>
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { onMounted } from "vue";

gsap.registerPlugin(SplitText);

onMounted(() => {
  document.fonts.ready.then(() => {
    // txt1
    gsap.set(".txt1", { opacity: 1 });

    let split;
    SplitText.create(".txt1", {
      type: "words, lines",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.lines, {
          duration: 0.6,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "expo.out",
        });

        return split;
      },
    });

    // txt2
    let split2 = SplitText.create(".txt2", {
      type: "lines, words, chars",
      mask: "lines",
      autoSplit: true,
    });

    gsap.from(split2.lines, {
      duration: 0.6,
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "expo.out",
    });
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
</template>

<style scoped></style>
