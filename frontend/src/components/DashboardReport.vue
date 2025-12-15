<script setup>
import { computed, onMounted, ref } from "vue";
import { useTodoStore } from "/stores/todos.js";
import { gsap } from "gsap";

defineOptions({ name: "DashboardReportComponent" });

const mainFrame = ref(null);
const mainHeader = ref(null);
const miniCards = ref([]);

const todoStore = useTodoStore();

// get todoList by filtered
const totalTodos = computed(() => todoStore.todosList.length);

const doneTodos = computed(
  () => todoStore.todosList.filter((t) => t.is_done).length,
);

const pendingTodos = computed(
  () => todoStore.todosList.filter((t) => !t.is_done).length,
);

// fetch data
onMounted(() => {
  miniCards.value = gsap.utils.toArray(".mini-card");

  if (!todoStore.todosList.length) {
    todoStore.getTodos(); // We should fetch data and set into the todoList
  }

  // animation
  const tl = gsap.timeline({
    delay: 0.3,
  });

  // main frame
  tl.from(mainFrame.value, {
    autoAlpha: 0,
    ease: "power.out",
    duration: 0.8,
  })
    .from(mainHeader.value, {
      xPercent: -110,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1.5,
    })
    .from(
      miniCards.value,
      {
        scale: 0,
        autoAlpha: 0,
        ease: "expo.out",
        stagger: {
          each: 0.3,
        },
      },
      "-=0.5",
    );
});
</script>

<template>
  <div class="dashboard-report pt-4">
    <div
      ref="mainFrame"
      class="w-5/6 mx-auto p-4 bg-gray-800 text-slate-200 flex flex-col gap-2 overflow-hidden"
    >
      <h2 ref="mainHeader" class="text-xl font-bold">Todos Report</h2>

      <div class="grid grid-cols-3 gap-4 text-center">
        <div
          class="mini-card p-4 bg-blue-50 rounded col-span-full sm:col-span-1"
        >
          <div class="text-2xl font-bold text-blue-600">{{ totalTodos }}</div>
          <div class="text-sm text-gray-600">All Todos</div>
        </div>

        <div
          class="mini-card p-4 bg-green-50 rounded col-span-full sm:col-span-1"
        >
          <div class="text-2xl font-bold text-green-600">{{ doneTodos }}</div>
          <div class="text-sm text-gray-600">Completed Todo</div>
        </div>

        <div
          class="mini-card p-4 bg-yellow-50 rounded col-span-full sm:col-span-1"
        >
          <div class="text-2xl font-bold text-yellow-600">
            {{ pendingTodos }}
          </div>
          <div class="text-sm text-gray-600">Pending Todo</div>
        </div>
      </div>
    </div>

    <!-- simple loading -->
    <div v-if="todoStore.isLoading" class="mt-4 text-center text-gray-500">
      Loading...
    </div>

    <!-- error -->
    <div v-if="todoStore.errorMessage" class="mt-4 text-center text-red-500">
      {{ todoStore.errorMessage }}
    </div>
  </div>
</template>
