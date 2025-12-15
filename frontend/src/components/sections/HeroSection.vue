<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AbstractTodoCard from "/images/abstract-like-todo-card.webp";

gsap.registerPlugin(SplitText, ScrollTrigger);

defineOptions({
  name: "HeroSection",
});

const firstHeader = ref(null);
const firstText = ref(null);
const mainImage = ref(null);
const btn1 = ref(null);
const btn2 = ref(null);

const defaultSettings = {
  wordsClass: "word",
  charsClass: "char",
  linesClass: "line",
  autoSplit: true,
};

// create timeline
const tl = gsap.timeline();

// anime for headers
const anime1 = {
  autoAlpha: 0,
  yPercent: 20,
  rotation: "random(-60,60)",
  ease: "back.out",
  stagger: {
    each: 0.04,
  },
};

// anime for text
const anime2 = {
  autoAlpha: 0,
  yPercent: 100,
  ease: "power3.out",
  stagger: {
    amount: 0.2,
  },
};

const anime3 = {
  opacity: 0,
  duration: 1,
  xPercent: 50,
  ease: "power3.out",
};

onMounted(() => {
  // split header
  const splitFirstHeader = SplitText.create(firstHeader.value, {
    ...defaultSettings,
    type: "lines",
    mask: "lines",
  });

  // split text
  const splitFirstText = SplitText.create(firstText.value, {
    ...defaultSettings,
    type: "lines",
    mask: "lines",
  });

  tl.from(splitFirstHeader.lines, {
    ...anime1,
    onComplete: () => splitFirstHeader.revert(),
  }).from(
    splitFirstText.lines,
    { ...anime2, onComplete: () => splitFirstText.revert() },
    "-=0.6",
  );

  tl.eventCallback("onComplete", () => {
    splitFirstHeader.revert();
    splitFirstText.revert();
  });

  gsap.from(mainImage.value, {
    delay: 0.5,
    xPercent: 100,
    autoAlpha: 0,
    ease: "power.out",
  });

  gsap.from([btn1.value, btn2.value], {
    autoAlpha: 0,
    yPercent: 110,
    delay: 0.7,
    duration: 0.4,
    stagger: {
      each: 0.1,
    },
  });
});
</script>

<template>
  <section
    class="relative text-white overflow-hidden bg-gradient-to-br from-slate-400 to-slate-600"
  >
    <div class="absolute inset-0">
      <!-- Background Image or Pattern - Let's generate a subtle, abstract background pattern -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-20"
        style="background-image: url(&quot;${}&quot;)"
      ></div>
      <div class="absolute inset-0 bg-black opacity-30"></div>
    </div>

    <div
      class="relative z-10 container mx-auto px-6 py-20 md:py-32 flex flex-col lg:flex-row items-center justify-between"
    >
      <!-- Left Content Area -->
      <div class="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
        <h1
          ref="firstHeader"
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up"
        >
          Organize Your Life, Achieve Your Goals.
        </h1>
        <p
          ref="firstText"
          class="first-text text-lg sm:text-xl mb-8 opacity-90 animate-fade-in-up delay-200"
        >
          Effortlessly manage your tasks, boost productivity, and conquer your
          day with our intuitive todo app.
        </p>
        <div
          class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up delay-400"
        >
          <div ref="btn1">
            <router-link
              to="/dashboard"
              class="inline-block bg-white text-cyan-700 hover:bg-cyan-100 font-bold py-3 px-8 rounded-full shadow-lg"
            >
              Get Started - It's Free!
            </router-link>
          </div>
          <button
            ref="btn2"
            class="border border-white text-white bg-transparent hover:bg-slate-200 hover:text-cyan-700 font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Learn More
          </button>
        </div>
      </div>

      <!-- Right Image Area -->
      <div class="lg:w-1/2 flex justify-center lg:justify-end">
        <!-- Placeholder for a compelling app screenshot or illustration -->
        <!-- I'll generate an image of a clean, modern todo app interface on a device -->
        <img
          ref="mainImage"
          src="/images/hero-section-image.webp"
          alt="Todo App Interface"
          class="rounded-lg shadow-2xl w-full max-w-md lg:max-w-lg"
        />
      </div>
    </div>
  </section>
</template>
