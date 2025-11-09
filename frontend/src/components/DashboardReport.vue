<script setup>
import { computed, onMounted } from "vue";
import { useTodoStore } from "/stores/todos.js";

defineOptions({ name: "DashboardReportComponent" });

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
  if (!todoStore.todosList.length) {
    todoStore.getTodos(); // We should fetch data and set into the todoList
  }
});
</script>

<template>
  <div class="dashboard-report pt-4">
    <div
      class="w-5/6 mx-auto p-4 bg-gray-800 text-slate-200 flex flex-col gap-2"
    >
      <h2 class="text-xl font-bold">Todos Report</h2>

      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="p-4 bg-blue-50 rounded">
          <div class="text-2xl font-bold text-blue-600">{{ totalTodos }}</div>
          <div class="text-sm text-gray-600">All Todos</div>
        </div>

        <div class="p-4 bg-green-50 rounded">
          <div class="text-2xl font-bold text-green-600">{{ doneTodos }}</div>
          <div class="text-sm text-gray-600">Completed Todo</div>
        </div>

        <div class="p-4 bg-yellow-50 rounded">
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
