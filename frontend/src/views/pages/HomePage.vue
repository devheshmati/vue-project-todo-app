<script setup>
import { useAuthStore } from "/stores/auth";
import { onMounted, ref, watch, nextTick } from "vue";
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import HeroSection from "../../components/sections/HeroSection.vue";
import FeaturesSection from "../../components/sections/FeaturesSection.vue";
import TestimonialSection from "../../components/sections/TestimonialsSection.vue";
import ParallaxCTASection from "../../components/sections/ParallaxCTASection.vue";
import FAQSection from "../../components/sections/FAQSection.vue";
import { useRoute, useRouter } from "vue-router";
import { gsap } from "gsap";

// define options
defineOptions({
  name: "HomePage",
});

const isAuthenticate = ref(false);
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const showNotif = ref(false);
const alertNotif = ref(null);

watch(
  () => route.query.message,
  (message) => {
    // 1. نمایش عنصر اگر پیام وجود دارد
    if (message) {
      showNotif.value = true;
      // تأخیر کوچک برای اطمینان از به روز رسانی DOM قبل از شروع انیمیشن
      nextTick(() => {
        if (alertNotif.value) {
          gsap.set(alertNotif.value, { xPercent: -110, autoAlpha: 0 });

          const tl = gsap.timeline();
          tl.to(alertNotif.value, {
            xPercent: 0,
            ease: "power3.out",
            autoAlpha: 1,
            duration: 1,
          }).to(alertNotif.value, {
            delay: 4,
            xPercent: -110,
            ease: "power3.out",
            autoAlpha: 0,
            duration: 1,
            onComplete: () => {
              router.replace({ query: { ...route.query, message: undefined } }); // 👈 استفاده از undefined برای حذف پارامتر
              showNotif.value = false;
            },
          });
        }
      });
    } else {
      // اگر message از URL حذف شد، مطمئن شویم که عنصر از DOM پنهان شده است
      showNotif.value = false;
    }
  },
  { immediate: true },
);

onMounted(() => {
  isAuthenticate.value = authStore.checkAuth();
});
</script>

<template>
  <div>
    <Header />
    <main class="overflow-hidden">
      <div
        ref="alertNotif"
        v-show="route.query.message"
        class="fixed top-2/10 left-0 z-100 w-fit h-fit px-4 py-2 bg-orange-500 text-white"
      >
        {{ route.query.message }}
      </div>
      <HeroSection />
      <FeaturesSection />
      <ParallaxCTASection />
      <TestimonialSection />
      <FAQSection />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
