<script setup>
import WritingNoteImage from "/images/writing-note.webp";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

defineOptions({
  name: "ParallaxCTASection",
});

const mainHeader = ref(null);
const mainContext = ref(null);
const mainLink = ref(null);

onMounted(() => {
  // animate main header and main context
  const splitMainHeader = SplitText.create(mainHeader.value, {
    type: "words",
    mask: "words",
  });

  const splitMainContext = SplitText.create(mainContext.value, {
    type: "words",
    mask: "words",
  });

  // main header
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: splitMainHeader.words[0],
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  tl1.from(splitMainHeader.words, {
    yPercent: 110,
    autoAlpha: 0,
    ease: "power3.out",
    stagger: {
      amount: 0.5,
    },
  });

  // main context
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: splitMainContext.words[0],
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  tl2.from(splitMainContext.words, {
    yPercent: 110,
    autoAlpha: 0,
    ease: "back.out",
    stagger: {
      amount: 0.5,
      from: "random",
    },
  });

  // main link
  gsap.from(mainLink.value, {
    scale: 1.3,
    autoAlpha: 0,
    delay: 0.5,
    ease: "bounce.out",
    duration: 1,
    scrollTrigger: {
      trigger: mainLink.value,
      from: "top 60%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
});
</script>

<template>
  <section
    class="relative bg-fixed bg-cover bg-center py-24 sm:py-32"
    :style="{
      backgroundImage: `url(${WritingNoteImage})`,
    }"
  >
    <!-- Overlay to ensure text readability -->
    <div class="absolute inset-0 bg-slate-800 opacity-60"></div>

    <div
      class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-yellow-200"
    >
      <h2
        ref="mainHeader"
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
      >
        Ready to Transform Your Productivity?
      </h2>
      <p
        ref="mainContext"
        class="text-lg sm:text-xl opacity-90 mb-10 max-w-2xl mx-auto"
      >
        Join thousands of users who are simplifying their lives and achieving
        more with TodoApp. Start your journey to better organization today!
      </p>
      <div ref="mainLink" class="w-fit mx-auto">
        <router-link
          to="/dashboard"
          class="flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-slate-800 bg-cyan-400 hover:bg-cyan-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
        >
          Get Started - It's Free!
          <svg
            class="ml-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No additional scoped styles needed if Tailwind handles everything,
   the parallax effect comes from `bg-fixed` */
</style>
