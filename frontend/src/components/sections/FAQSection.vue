<script>
// UPDATED: Import GSAP
import gsap from "gsap";

export default {
  name: "FAQSection",
  data() {
    return {
      openQuestionIndex: null,
      faqs: [
        {
          question: "Is this todo app free to use?",
          answer:
            "Yes! Our app offers a completely free plan that includes all essential features like task management, reminders, and progress tracking. We also offer a premium plan for advanced features.",
        },
        {
          question: "Can I access my tasks on multiple devices?",
          answer:
            "Absolutely. Your tasks are synced automatically across all your devices—phone, tablet, and desktop. Just log in to your account, and all your information will be right there.",
        },
        {
          question: "How do 'Smart Reminders' work?",
          answer:
            "Smart Reminders are more than just a notification. You can set location-based reminders (e.g., 'remind me when I get home') or set recurring tasks that adapt to your schedule.",
        },
        {
          question: "Can I collaborate with my team on this app?",
          answer:
            "Yes! Our premium plan includes features for team collaboration, such as shared projects, task assignments, and team member comments. You can easily manage your group projects.",
        },
      ],
    };
  },
  methods: {
    toggleQuestion(index) {
      if (this.openQuestionIndex === index) {
        this.openQuestionIndex = null;
      } else {
        this.openQuestionIndex = index;
      }
    },

    // --- UPDATED: GSAP Transition Hooks ---

    onBeforeEnter(el) {
      // Set the initial state: collapsed and transparent
      gsap.set(el, {
        height: 0,
        opacity: 0,
      });
    },

    onEnter(el, done) {
      // Animate to the natural 'auto' height and full opacity
      gsap.to(el, {
        duration: 0.5,
        height: "auto",
        opacity: 1,
        ease: "power3.out",
        onComplete: () => {
          // After animation, set height to 'auto' for responsiveness
          gsap.set(el, { height: "auto" });
          done(); // Signal to Vue that the animation is complete
        },
      });
    },

    onLeave(el, done) {
      // Animate back to the collapsed state
      gsap.to(el, {
        duration: 0.4,
        height: 0,
        opacity: 0,
        ease: "power3.in",
        onComplete: done, // Signal to Vue that the animation is complete
      });
    },
  },
};
</script>

<template>
  <section id="faq" class="bg-slate-900 py-16 sm:py-24 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-xl text-gray-300 opacity-90">
          Have questions? We've got answers. If you can't find what you're
          looking for, feel free to contact us.
        </p>
      </div>

      <div class="mt-16 max-w-3xl mx-auto">
        <div class="divide-y divide-slate-700">
          <div v-for="(faq, index) in faqs" :key="index">
            <button
              @click="toggleQuestion(index)"
              class="flex justify-between items-center w-full text-left py-6"
            >
              <span class="text-lg font-semibold text-white">
                {{ faq.question }}
              </span>
              <span class="ml-4">
                <svg
                  class="h-6 w-6 text-cyan-400 transform transition-transform duration-300"
                  :class="{ 'rotate-180': openQuestionIndex === index }"
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            <transition
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
              :css="false"
            >
              <div
                v-if="openQuestionIndex === index"
                class="pb-6 pr-4 overflow-hidden"
              >
                <p class="text-base text-gray-300 opacity-90">
                  {{ faq.answer }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
