<script setup>
defineOptions({
  name: "NotFoundPage",
});
</script>

<template>
  <div>
    <main
      class="flex flex-col gap-2 justify-center items-center h-screen w-full"
    >
      <img src="/images/404-image.webp" class="w-1/2 sm:w-1/5" />
      <h1>404 Error, Not found page!</h1>
      <RouterLink
        to="/"
        class="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white"
        >-> Return to Home</RouterLink
      >
    </main>
  </div>
</template>
