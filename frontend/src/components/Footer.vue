<script setup>
// Import RouterLink if you're using it, though it's often globally available
import { RouterLink } from "vue-router";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ref, onMounted } from "vue";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const scrollTo = (selector) => {
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: selector, offsetY: 0 }, // 80px offset برای هدر ثابت
    ease: "power2.inOut",
  });
};

// Define component options, consistent with your header
defineOptions({
  name: "FooterComponent",
});

// get elements for animation
const mainLogo = ref(null);
const mainHeader = ref(null);
const mainContext = ref(null);
const col2Header = ref(null);
const col2LinkList = ref(null);
const col2LinkItems = ref([]);
const col3Header = ref(null);
const col3LinkList = ref(null);
const col3LinkItems = ref([]);
const col4Header = ref(null);
const col4LinkList = ref(null);
const col4LinkItems = ref([]);
const copyrightContext = ref(null);
const socialLink = ref(null);
const socialLinkItems = ref([]);

onMounted(() => {
  col2LinkItems.value = col2LinkList.value.querySelectorAll("li");
  col3LinkItems.value = col3LinkList.value.querySelectorAll("li");
  col4LinkItems.value = col4LinkList.value.querySelectorAll("li");
  socialLinkItems.value = socialLink.value.querySelectorAll("li");

  // main header, logo and main context
  const splitMainContext = SplitText.create(mainContext.value, {
    type: "words, lines",
    mask: "lines",
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: mainHeader.value,
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(mainLogo.value, {
    xPercent: -50,
    autoAlpha: 0,
    ease: "expo.out",
    duration: 1.4,
  })
    .from(
      mainHeader.value,
      {
        yPercent: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.4,
      },
      "-=1",
    )
    .from(
      splitMainContext.lines,
      {
        yPercent: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 3,
        stagger: {
          each: 0.1,
        },
      },
      "-=1",
    );
  // col2
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: col2Header.value,
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  tl2
    .from(col2Header.value, {
      delay: 0.2,
      yPercent: 50,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1.4,
    })
    .from(
      col2LinkItems.value,
      {
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.2,
        stagger: {
          each: 0.1,
        },
      },
      "-=1",
    );

  // col3
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: col3Header.value,
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  tl3
    .from(col3Header.value, {
      delay: 0.4,
      yPercent: 50,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1.4,
    })
    .from(
      col3LinkItems.value,
      {
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.2,
        stagger: {
          each: 0.1,
        },
      },
      "-=1",
    );

  // col4
  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: col4Header.value,
      start: "top 70%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  tl4
    .from(col4Header.value, {
      delay: 0.6,
      yPercent: 50,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1.4,
    })
    .from(
      col4LinkItems.value,
      {
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.2,
        stagger: {
          each: 0.1,
        },
      },
      "-=1",
    );

  // bottom section
  gsap.from(copyrightContext.value, {
    delay: 0.6,
    yPercent: 50,
    autoAlpha: 0,
    ease: "expo.out",
    duration: 1.4,
    scrollTrigger: {
      trigger: copyrightContext.value,
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(socialLinkItems.value, {
    delay: 0.6,
    yPercent: 50,
    autoAlpha: 0,
    ease: "expo.out",
    duration: 1.4,
    stagger: {
      each: 0.1,
    },
    scrollTrigger: {
      trigger: socialLink.value,
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
});
</script>

<template>
  <div>
    <footer
      class="bg-black/90 text-white px-6 sm:px-18 pb-4 pt-12 overflow-hidden"
    >
      <!--Top Section-->
      <div class="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-4">
        <!--col 1-->
        <div class="flex flex-col gap-2">
          <!-- logo -->
          <router-link
            :to="{ name: 'Home' }"
            class="flex flex-col md:flex-row gap-1 items-start md:items-center"
          >
            <span>
              <img
                ref="mainLogo"
                src="/logos/todo-logo.png"
                alt="To-Do App Logo"
                class="h-8 w-8"
              />
            </span>
            <span ref="mainHeader" class="text-xl font-bold">To-Do App</span>
          </router-link>
          <!-- text -->
          <div>
            <span ref="mainContext" class="text-gray-400 text-lg"
              >Organize your life, achieve your goals.</span
            >
          </div>
        </div>

        <!--col 2-->
        <div ref="col2" class="text-sm">
          <h4 ref="col2Header" class="font-bold">APP</h4>
          <ul ref="col2LinkList" class="mt-4 text-gray-300">
            <li class="py-1">
              <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </li>
            <li class="py-1">
              <router-link to="#features" @click.prevent="scrollTo('#features')"
                >Features</router-link
              >
            </li>
            <li class="py-1">
              <router-link to="#faq" @click.prevent="scrollTo('#faq')"
                >FAQ</router-link
              >
            </li>
          </ul>
        </div>

        <!--col 3-->
        <div ref="col3" class="text-sm">
          <h4 ref="col3Header" class="font-bold">COMPANY</h4>
          <ul ref="col3LinkList" class="mt-4 text-gray-300">
            <li class="py-1">
              <router-link :to="{ name: 'AboutUs' }">About Us</router-link>
            </li>
            <li class="py-1">
              <router-link :to="{ name: 'ContactUs' }">Contact</router-link>
            </li>
          </ul>
        </div>

        <!--col 4-->
        <div ref="col4" class="text-sm">
          <h4 ref="col4Header" class="font-bold">LEGAL</h4>
          <ul ref="col4LinkList" class="mt-4 text-gray-300">
            <li class="py-1">
              <router-link :to="{ name: 'Dashboard' }"
                >Privacy Plicy</router-link
              >
            </li>
            <li class="py-1">
              <router-link :to="{ name: 'Dashboard' }"
                >Terms of Service</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!--Bottom Section-->
      <div
        ref="bottomSection"
        class="grid grid-cols-1 border-t-1 border-t-slate-600 pt-5 sm:grid-cols-2"
      >
        <!--col 1 copyright-->
        <div>
          <span
            ref="copyrightContext"
            class="text-sm text-slate-400 block text-center sm:text-start"
          >
            &copy; To-Do App. All rights reserved.
          </span>
        </div>

        <!--col 2 social links-->
        <div>
          <ul ref="socialLink" class="flex justify-center sm:justify-end gap-6">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.92.678 1.854 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.328-.027-3.037-1.849-3.037-1.85 0-2.135 1.446-2.135 2.942v5.7h-3v-11h2.869v1.316h.04c.4-.759 1.37-1.55 2.83-1.55 3.02 0 3.579 1.987 3.579 4.574v5.66h-2.939z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* You can add any scoped styles here if needed */
</style>
