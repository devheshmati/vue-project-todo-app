<script setup>
import { ref, watch, nextTick, onUnmounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { gsap } from "gsap";

// define Options
defineOptions({
  name: "LoginPage",
});

const router = useRouter();
const credentials = ref({
  email: "",
  password: "",
});
const authStore = useAuthStore();
const showNotif = ref(false);
const alertNotif = ref(null);
const insidePageErrorMessage = ref(null);

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, credentials);

async function handleLogin() {
  const result = await v$.value.$validate();

  if (result) {
    await submitData();
  }
}

async function submitData() {
  insidePageErrorMessage.value = "";
  await authStore.login(credentials.value);

  if (authStore.errorMessage) {
    insidePageErrorMessage.value = authStore.errorMessage;
  }
}

watch(
  () => insidePageErrorMessage.value,
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
              // 2. پاکسازی URL
              insidePageErrorMessage.value = "";
              // 3. پنهان کردن عنصر پس از انیمیشن
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

onUnmounted(() => {
  insidePageErrorMessage.value = "";
  showNotif.value = false;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <main class="overflow-hidden">
      <div
        ref="alertNotif"
        v-show="showNotif"
        class="fixed top-2/10 left-0 z-100 w-fit h-fit px-4 py-2 bg-orange-500 text-white"
      >
        {{ insidePageErrorMessage }}
      </div>

      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Log in to Your Account
        </h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model.trim="credentials.email"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              @blur="v$.email.$touch"
            />
            <div v-if="v$.email.$error">
              <p
                class="mt-1 text-sm text-red-600"
                v-for="error of v$.email.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model.trim="credentials.password"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              @blur="v$.password.$touch"
            />
            <div v-if="v$.password.$error">
              <p
                class="mt-1 text-sm text-red-600"
                v-for="error of v$.password.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </div>
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full bg-cyan-600 text-white py-2 rounded-lg transition duration-300"
            :class="{
              'opacity-50 cursor-not-allowed': authStore.isLoading,
              'hover:bg-cyan-700': !authStore.isLoading,
            }"
          >
            <span v-if="authStore.isLoading">Logging in...</span>
            <span v-else>Log In</span>
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">
            Sign Up
          </router-link>
        </p>
        <p class="mt-4 text-center text-sm text-gray-600">
          Go Home.
          <router-link to="/" class="text-blue-500 hover:underline">
            Home
          </router-link>
        </p>
      </div>
    </main>
  </div>
</template>
