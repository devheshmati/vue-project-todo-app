import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isToggle = ref(false);

  return {
    isToggle,
  };
});
