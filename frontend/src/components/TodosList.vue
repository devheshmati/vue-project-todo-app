<script setup>
import { useSidebarTogglerStore } from "/stores/sidebarToggler.js";
import { onMounted, computed } from "vue";
import { useTodoStore } from "/stores/todos.js";

// Define Options
defineOptions({
  name: "TodosListComponent",
});

const todoStore = useTodoStore();

defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  errorMessage: {
    type: String,
    required: true,
    default: () => "",
  },
});

const togglerStore = useSidebarTogglerStore();
</script>

<template>
  <div v-if="!data.length > 0" class="bg-orange-800 text-white p-4">
    There is not any task in list.
  </div>
  <div v-if="errorMessage" class="bg-red-800 text-white p-4">
    {{ errorMessage }}
  </div>

  <div v-if="data.length > 0 && !errorMessage" class="min-w-2/5">
    <div class="bg-gray-800 p-4 rounded-t-lg">
      <h3 class="text-xl font-bold text-center text-white">Todo List</h3>
    </div>
    <div class="bg-gray-800 p-4 h-3/4 rounded-b-lg">
      <ul class="flex flex-col gap-4 mx-auto overflow-y-scroll h-[400px] pe-4">
        <li
          v-for="todo in data"
          :key="todo.id"
          class="grid grid-cols-6 p-4 w-full"
          :class="todo.is_done ? 'bg-lime-600' : 'bg-gray-300'"
        >
          <div class="col-span-4">
            <span>{{ todo.title }}</span>
          </div>
          <div class="col-span-2 flex justify-end gap-2">
            <!-- Check -->
            <button
              class="cursor-pointer text-slate-600 hover:text-green-500"
              @click="todoStore.updateTodo(todo)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>

            <!--Update -->
            <button class="cursor-pointer text-slate-600 hover:text-amber-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>

            <!-- Delete -->
            <button
              class="cursor-pointer text-slate-600 hover:text-red-500"
              @click="todoStore.deleteTodo(todo.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
