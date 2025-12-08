<script setup>
defineOptions({
  name: "NotConnectionPage",
});
</script>

<template>
  <div>
    <main
      class="h-screen w-full gap-2 flex flex-col justify-center items-center overflow-hidden"
    >
      <h1>Not Connection Detected! Please check you backend Connection.</h1>
      <RouterLink
        to="/"
        class="inline-block px-4 p-2 bg-purple-600 hover:bg-purple-500 text-white"
        >Try Again</RouterLink
      >
    </main>
  </div>
</template>
