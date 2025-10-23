import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const userToken = ref("");
  const baseUrl = "http://localhost:8000/api";
  const router = useRouter();
  const errorMessage = ref("");
  const isLoading = ref(false);

  // Handle User Login
  async function login(credentials) {
    isLoading.value = true;
    errorMessage.value = "";
    const url = `${baseUrl}/login`;

    try {
      const response = await axios.post(url, credentials);

      if (response.status === 200) {
        userToken.value = response.data.token;
        localStorage.setItem("auth_token", userToken.value);
        router.push("/todos");
      } else {
        errorMessage.value = "An Unexpected login error occured.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log("Login Error.", error.message);
      errorMessage.value =
        error.response.data.message ||
        "Validation failed. Please check your inputs.";

      router.push({
        path: "/login",
        props: { message: "Validation Failed!" },
      });
    } finally {
      isLoading.value = false;
    }
  }

  // Check user login
  function checkAuth() {
    // import token from somewhere we save that before for example localStorage
    const existToken = localStorage.getItem("auth_token");
    if (existToken) {
      userToken.value = existToken;
      return true;
    } else {
      return false;
    }
  }

  // logout user
  function logOut() {
    userToken.value = "";
    localStorage.removeItem("auth_token");
    router.push("/");
  }

  return { userToken, errorMessage, isLoading, login, checkAuth, logOut };
});
