<template>
  <section id="features" class="py-16 sm:py-24 bg-gray-200 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2
        class="text-4xl sm:text-5xl text-slate-800 font-extrabold tracking-tight mb-6"
      >
        Simplify Your Life, One Task at a Time
      </h2>
      <p
        class="text-xl sm:text-2xl font-light text-slate-800 opacity-90 mb-12 max-w-3xl mx-auto"
      >
        TodoApp helps you organize your day, boost productivity, and achieve
        your goals with ease.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
        <!-- Feature 1 -->
        <div
          class="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <div class="flex-shrink-0 mb-4">
            <svg
              class="h-12 w-12 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-3 text-slate-600">
            Intuitive Management
          </h3>
          <p class="text-lg opacity-80 text-slate-600">
            Easily add, edit your tasks. Stay on top of your commitments with
            simple interface.
          </p>
        </div>

        <!-- Feature 2 -->
        <div
          class="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <div class="flex-shrink-0 mb-4">
            <svg
              class="h-12 w-12 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h.01M17 11h.01M9 15h.01M15 15h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-3 text-slate-600">
            Smart Reminders
          </h3>
          <p class="text-lg opacity-80 text-slate-600">
            Never miss a deadline again. Set reminders due your workflow smooth
            and efficient.
          </p>
        </div>

        <!-- Feature 3 -->
        <div
          class="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <div class="flex-shrink-0 mb-4">
            <svg
              class="h-12 w-12 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-3 text-slate-600">
            Track Your Progress
          </h3>
          <p class="text-lg opacity-80 text-slate-600">
            See your completed tasks at a glance and celebrate your productivity
            milestones.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturesSection",
};
</script>

<style scoped></style>
