<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

defineOptions({
  name: "AboutUsPage",
});

const mainImage = ref(null);
const mainImageText = ref(null);
const underMainImageInfo = ref(null);
const mainHeader = ref(null);
const mainContext = ref(null);
const homeLink = ref(null);

onMounted(() => {
  // main image and main text animation
  const tl1 = gsap.timeline();

  tl1
    .from(mainImage.value, {
      delay: 0.4,
      scale: 0.8,
      autoAlpha: 0,
      ease: "back.out",
      duration: 0.5,
    })
    .from(mainImageText.value, {
      yPercent: -50,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1.5,
    })
    .from(
      underMainImageInfo.value,
      {
        yPercent: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.5,
      },
      "-=1",
    );

  // main header, main context, main link
  const splitMainContext = SplitText.create(mainContext.value, {
    type: "lines, words",
    mask: "lines",
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: mainHeader.value,
      start: "top 90%",
      end: "bottom top",
      toggleActions: "play none none reset",
    },
  });

  tl2
    .from(mainHeader.value, {
      xPercent: -50,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1.5,
    })
    .from(
      splitMainContext.lines,
      {
        yPercent: -50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.5,
        stagger: {
          each: 0.1,
        },
      },
      "-=0.8",
    )
    .from(
      homeLink.value,
      {
        yPercent: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.5,
      },
      "-=1",
    );
});
</script>

<template>
  <div>
    <main class="pt-10 min-h-screen bg-black/90 overflow-hidden">
      <div
        class="relative flex flex-col justify-center items-center h-[400px] w-10/12 mx-auto overflow-hidden"
      >
        <img
          ref="mainImage"
          src="/images/about-us-abstract.webp"
          class="object-cover w-full h-full rounded-xl"
        />
        <div
          ref="mainImageText"
          class="absolute top-5 left-1/2 -translate-x-1/2 text-amber-100 bg-black/80 px-2 py-1 text-sm rounded-xl text-nowrap"
        >
          Organizing Tasks, easy!
        </div>
      </div>

      <div
        ref="underMainImageInfo"
        class="text-amber-100/90 grid grid-cols-3 w-10/12 mx-auto text-sm mt-1"
      >
        <div class="sm:flex justify-start hidden">Project for productivity</div>
        <div class="sm:flex justify-center hidden">Best Manage Todo</div>
        <div class="sm:flex justify-end hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </div>
      </div>

      <div class="text-amber-100 w-10/12 mx-auto grid grid-cols-2">
        <div class="col-span-full sm:col-span-1">
          <h1 ref="mainHeader" class="mt-5 text-xl sm:text-3xl font-bold">
            About Us
          </h1>
        </div>
        <div class="col-span-full sm:col-span-1">
          <p ref="mainContext" class="mt-5">
            Your simple, fast, and reliable tool for organizing tasks and
            boosting productivity every day. Stay focused, get more done, and
            take control of your time with ease.
          </p>
          <div ref="homeLink">
            <RouterLink
              to="/"
              class="text-blue-400 hover:text-blue-300 inline-block mt-2 mb-6 font-bold text-sm"
              >-> Return To Home</RouterLink
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
