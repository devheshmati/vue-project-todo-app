<script setup>
import WritingNoteImage from "/images/writing-note.webp";
defineOptions({
  name: "ParallaxCTASection",
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
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
      >
        Ready to Transform Your Productivity?
      </h2>
      <p class="text-lg sm:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
        Join thousands of users who are simplifying their lives and achieving
        more with TodoApp. Start your journey to better organization today!
      </p>
      <router-link
        to="/dashboard"
        class="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-slate-800 bg-cyan-400 hover:bg-cyan-500 shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
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
  </section>
</template>

<style scoped>
/* No additional scoped styles needed if Tailwind handles everything,
   the parallax effect comes from `bg-fixed` */
</style>
