<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

defineOptions({
  name: "TestimonialsSection",
});

const mainHeader = ref(null);
const mainContext = ref(null);
const allCards = ref([]);

onMounted(() => {
  allCards.value = gsap.utils.toArray(".testimonial-card");

  // split main header and main context
  const splitMainHeader = SplitText.create(mainHeader.value, {
    type: "words",
    mask: "words",
  });
  const splitMainContext = SplitText.create(mainContext.value, {
    type: "lines",
    mask: "lines",
  });

  // main header
  gsap.from(splitMainHeader.words, {
    yPercent: 110,
    autoAlpha: 0,
    ease: "expo.out",
    stagger: {
      amount: 0.5,
    },
    scrollTrigger: {
      trigger: splitMainHeader.words[0],
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  // main context
  gsap.from(splitMainContext.lines, {
    yPercent: 110,
    autoAlpha: 0,
    ease: "expo.out",
    duration: 2,
    stagger: {
      each: 0.4,
    },
    scrollTrigger: {
      trigger: splitMainContext.lines[0],
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  // cards
  allCards.value.forEach((element, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(element.querySelector("img"), {
      delay: 0.3 * index,
      yPercent: -110,
      autoAlpha: 0,
      ease: "power3.out",
      duration: 0.5,
    }).from(element.querySelectorAll("p"), {
      yPercent: 110,
      autoAlpha: 0,
      ease: "back3.out",
      duration: 0.5,
      stagger: {
        each: 0.2,
      },
    });
  });
});
</script>

<template>
  <section class="py-16 sm:py-24 bg-gradient-to-br from-black/90 to-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          ref="mainHeader"
          class="text-4xl sm:text-5xl text-slate-200 font-extrabold tracking-tight mb-4"
        >
          What Our Users Are Saying
        </h2>
        <p
          ref="mainContext"
          class="text-xl sm:text-2xl font-light text-slate-200 max-w-3xl mx-auto"
        >
          Hear from real people who are transforming their productivity with
          TodoApp.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div
          class="testimonial-card bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center overflow-hidden"
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Customer Avatar"
            class="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-cyan-500 ring-offset-2 ring-offset-white"
          />
          <p class="text-lg text-slate-700 italic mb-4">
            "TodoApp has completely revolutionized how I manage my daily tasks.
            It's so intuitive and keeps me perfectly on track. A must-have for
            anyone serious about productivity!"
          </p>
          <p class="font-semibold text-slate-800">John Doe</p>
          <p class="text-sm text-slate-500">Marketing Manager</p>
        </div>

        <!-- Testimonial 2 -->
        <div
          class="testimonial-card bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center overflow-hidden"
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Customer Avatar"
            class="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-cyan-500 ring-offset-2 ring-offset-white"
          />
          <p class="text-lg text-slate-700 italic mb-4">
            "I used to feel overwhelmed by my to-do list, but TodoApp makes it
            simple to prioritize and conquer. The smart reminders are a
            game-changer!"
          </p>
          <p class="font-semibold text-slate-800">Jane Smith</p>
          <p class="text-sm text-slate-500">Freelance Designer</p>
        </div>

        <!-- Testimonial 3 -->
        <div
          class="testimonial-card bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center overflow-hidden"
        >
          <img
            src="https://randomuser.me/api/portraits/men/47.jpg"
            alt="Customer Avatar"
            class="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-cyan-500 ring-offset-2 ring-offset-white"
          />
          <p class="text-lg text-slate-700 italic mb-4">
            "Finally, a todo app that actually helps me achieve my goals instead
            of just listing them. The clean interface and powerful features are
            exactly what I needed."
          </p>
          <p class="font-semibold text-slate-800">David Lee</p>
          <p class="text-sm text-slate-500">Software Engineer</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No specific scoped styles needed if Tailwind handles everything */
</style>
