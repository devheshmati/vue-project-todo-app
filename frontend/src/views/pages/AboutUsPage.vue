<script setup>
defineOptions({
  name: "AboutUsPage",
});
</script>

<template>
  <div>
    <main class="pt-10 min-h-screen bg-black/90">
      <div
        class="relative flex flex-col justify-center items-center h-[400px] w-10/12 mx-auto"
      >
        <img
          src="/images/about-us-abstract.webp"
          class="object-cover w-full h-full rounded-xl"
        />
        <div
          class="absolute top-5 left-1/2 -translate-x-1/2 text-amber-100 bg-black/80 px-2 py-1 text-sm rounded-xl"
        >
          Organizing Tasks, easy!
        </div>
      </div>

      <div
        class="text-amber-100/90 grid grid-cols-3 w-10/12 mx-auto text-sm mt-1"
      >
        <div class="flex justify-start">Project for productivity</div>
        <div class="flex justify-center">Best Manage Todo</div>
        <div class="flex justify-end">
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
        <div>
          <h1 class="mt-5 text-3xl font-bold">About Us</h1>
        </div>
        <div>
          <p class="mt-5">
            Your simple, fast, and reliable tool for organizing tasks and
            boosting productivity every day. Stay focused, get more done, and
            take control of your time with ease.
          </p>
          <RouterLink
            to="/"
            class="text-blue-400 hover:text-blue-300 inline-block mt-2 font-bold text-sm"
            >-> Return To Home</RouterLink
          >
        </div>
      </div>
    </main>
  </div>
</template>
