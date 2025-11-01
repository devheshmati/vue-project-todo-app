import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebarTogglerStore = defineStore("sidebarToggler", () => {
  const isToggle = ref(false);

  function handleToggler() {
    isToggle.value = !isToggle.value;
  }

  return { isToggle, handleToggler };
});
