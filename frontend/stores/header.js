import { defineStore } from "pinia";
import { ref } from "pinia";

export const useHeaderStore = defineStore("header", () => {
  const isToggler = ref(false);

  function openToggler() {
    isToggler.value = true;
  }
  function closeToggler() {
    isToggler.value = false;
  }

  return { isToggler, openToggler, closeToggler };
});
