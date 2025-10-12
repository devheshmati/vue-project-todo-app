<script setup>
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

gsap.registerPlugin(SplitText, ScrollTrigger);

onMounted(() => {});
</script>

<template></template>

<style scoped></style>
