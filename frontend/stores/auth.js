import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const userToken = ref("");
  const baseUrl = "http://localhost:8000/api";
  const router = useRouter();

  // Handle User Login
  async function login(credentials) {
    const url = `${baseUrl}/login`;
    const response = await axios.post(url, credentials);

    if (response.status === 200 && response) {
      userToken.value = response.data.token;
      localStorage.setItem("auth_token", userToken.value);
      router.push("/todos");
    } else {
      router.back();
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

  return { userToken, login, checkAuth, logOut };
});
