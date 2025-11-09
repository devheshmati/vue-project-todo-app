<script setup>
import { useAuthStore } from "/stores/auth";
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import HeroSection from "../components/sections/HeroSection.vue";
import FeaturesSection from "../components/sections/FeaturesSection.vue";
import TestimonialSection from "../components/sections/TestimonialsSection.vue";
import ParallaxCTASection from "../components/sections/ParallaxCTASection.vue";
import FAQSection from "../components/sections/FAQSection.vue";

// define options
defineOptions({
  name: "HomePage",
});

const isAuthenticate = ref(false);

const authStore = useAuthStore();

onMounted(() => {
  isAuthenticate.value = authStore.checkAuth();
});
</script>

<template>
  <div>
    <Header />
    <HeroSection />
    <FeaturesSection />
    <ParallaxCTASection />
    <TestimonialSection />
    <FAQSection />
    <Footer />
  </div>
</template>

<style scoped></style>
