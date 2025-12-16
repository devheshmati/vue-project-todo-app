<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, email, minLength } from "@vuelidate/validators"; // Added email and minLength
import axios from "axios";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Define Options
defineOptions({
  name: "RegisterPage",
});

// get elements for making animation for them
const mainFrame = ref(null);
const mainHeader = ref(null);
const label1 = ref(null);
const label2 = ref(null);
const label3 = ref(null);
const label4 = ref(null);
const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);
const input4 = ref(null);
const submitBtn = ref(null);
const loginLink = ref(null);
const homeLink = ref(null);

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const errorMessage = ref("");

const rules = {
  name: { required },
  email: { required, email }, // Added email validation
  password: { required, minLength: minLength(8) }, // Added minLength validation
  confirmPassword: {
    required,
    sameAs: sameAs(
      computed(() => form.password),
      "password",
    ), // Corrected sameAs usage with computed
  },
};

// useVuelidate take rules in first and reactive data in secound arguments
const v$ = useVuelidate(rules, form);

// Computed property to check if passwords match - This is now handled by Vuelidate's sameAs validator.
// We can remove it or keep it for a general UI hint if needed, but Vuelidate handles the blocking logic.
// const passwordsMatch = computed(() => {
//   return form.password === form.confirmPassword;
// });

async function handleRegister() {
  errorMessage.value = ""; // Clear previous errors

  // Perform synchronous validation
  const result = await v$.value.$validate();

  if (result) {
    // If validation passes, proceed with asynchronous form submission
    await submitData();
  } else {
    // If validation fails, display a general error message if needed
    errorMessage.value = "Please correct the form errors.";
  }
}

async function submitData() {
  isLoading.value = true;
  errorMessage.value = ""; // Clear previous errors again before API call

  try {
    const url = "/api/register";
    const response = await axios.post(url, {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
    });

    if (response.status === 201) {
      router.push("/login");
    }
  } catch (error) {
    if (error.response) {
      // Changed 'error.responses' to 'error.response' as per axios standard
      errorMessage.value =
        error.response.data.message || "Registration failed. Please try again";
    } else {
      errorMessage.value = "Network error. Please check your connection.";
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  // animation
  const splitMainHeader = SplitText.create(mainHeader.value, {
    type: "chars, words",
    mask: "chars",
  });
  const tl = gsap.timeline();

  tl.from(mainFrame.value, {
    delay: 0.4,
    autoAlpha: 0,
    duration: 0.6,
    ease: "power.out",
  })
    .from(splitMainHeader.chars, {
      yPercent: 50,
      autoAlpha: 0,
      ease: "power.out",
      stagger: {
        amount: 0.8,
        from: "random",
      },
    })
    .from(
      [label1.value, label2.value, label3.value, label4.value],
      {
        xPercent: -50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 0.8,
        stagger: {
          each: 0.3,
        },
      },
      "-=1.2",
    )
    .from(
      [input1.value, input2.value, input3.value, input4.value],
      {
        yPercent: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 2.2,
        stagger: {
          each: 0.3,
        },
      },
      "-=0.6",
    )
    .from(
      submitBtn.value,
      {
        scale: 1.3,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.5,
      },
      "-=1.8",
    )
    .from(
      [loginLink.value, homeLink.value],
      {
        yPercent: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 2,
        stagger: {
          each: 0.4,
        },
      },
      "-=1.6",
    );
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      ref="mainFrame"
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-hidden"
    >
      <h2
        ref="mainHeader"
        class="text-2xl font-bold text-center text-gray-800 mb-6"
      >
        Create Your Account
      </h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label
            ref="label1"
            for="name"
            class="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            ref="input1"
            type="text"
            id="name"
            v-model.trim="form.name"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            @blur="v$.name.$touch"
          />
          <div v-if="v$.name.$error">
            <p
              v-for="error of v$.name.$errors"
              :key="error.$uid"
              class="mt-1 text-sm text-red-600"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="mb-4">
          <label
            ref="label2"
            for="email"
            class="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            ref="input2"
            type="email"
            id="email"
            v-model.trim="form.email"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            @blur="v$.email.$touch"
          />
          <div v-if="v$.email.$error">
            <p
              v-for="error of v$.email.$errors"
              :key="error.$uid"
              class="mt-1 text-sm text-red-600"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="mb-4">
          <label
            ref="label3"
            for="password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            ref="input3"
            type="password"
            id="password"
            v-model.trim="form.password"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            @blur="v$.password.$touch"
          />
          <div v-if="v$.password.$error">
            <p
              v-for="error of v$.password.$errors"
              :key="error.$uid"
              class="mt-1 text-sm text-red-600"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="mb-6">
          <label
            ref="label4"
            for="confirm-password"
            class="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            ref="input4"
            type="password"
            id="confirm-password"
            v-model.trim="form.confirmPassword"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            @blur="v$.confirmPassword.$touch"
          />
          <div v-if="v$.confirmPassword.$error">
            <p
              v-for="error of v$.confirmPassword.$errors"
              :key="error.$uid"
              class="mt-1 text-sm text-red-600"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <p v-if="errorMessage" class="mb-4 text-center text-red-600 text-sm">
          {{ errorMessage }}
        </p>
        <button
          ref="submitBtn"
          type="submit"
          class="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
          :disabled="isLoading"
        >
          Sign Up
        </button>
      </form>
      <p ref="loginLink" class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">
          Log In
        </router-link>
      </p>
      <p ref="homeLink" class="mt-4 text-center text-sm text-gray-600">
        Go Home.
        <router-link to="/" class="text-blue-500 hover:underline">
          Home
        </router-link>
      </p>
    </div>
  </div>
</template>
