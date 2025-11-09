<script setup>
import { onMounted, computed, ref, reactive } from "vue";
import { useTodoStore } from "/stores/todos.js";
import Modal from "../components/Modal.vue";

// Define Options
defineOptions({
  name: "TodosListComponent",
});

defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  errorMessage: {
    type: String,
    required: true,
    default: "",
  },
});

const todoStore = useTodoStore();

// this is for modal
const isToggle = ref(false);
const newTodoData = reactive({
  id: null,
  title: "",
  description: "",
});

// open modal and set data
function openEditModal(todo) {
  newTodoData.id = todo.id;
  newTodoData.title = todo.title;
  newTodoData.description = todo.description;
  isToggle.value = true;
}

function closeModal() {
  isToggle.value = false;
}

async function submitEdit() {
  await todoStore.editTodo(newTodoData.id, {
    title: newTodoData.title,
    description: newTodoData.description,
  });

  closeModal();
}
</script>

<template>
  <!-- Modal -->
  <Modal :isToggle="isToggle">
    <form class="flex flex-col gap-3" @submit.prevent="submitEdit">
      <h2 class="text-xl font-semibold mb-2">Edit Todo</h2>
      <input
        v-model="newTodoData.title"
        placeholder="Enter title..."
        class="border p-2 rounded"
      />
      <textarea
        v-model="newTodoData.description"
        placeholder="Enter description..."
        class="border p-2 rounded"
      ></textarea>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="bg-gray-500 text-white px-3 py-1 rounded"
          @click="closeModal"
        >
          Cancel
        </button>
        <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded">
          Update
        </button>
      </div>
    </form>
  </Modal>

  <div
    v-if="!data.length && !errorMessage"
    class="bg-orange-800 text-white p-4"
  >
    There are no tasks in list.
  </div>
  <div v-if="errorMessage" class="bg-red-800 text-white p-4">
    {{ errorMessage }}
  </div>

  <div v-if="data.length > 0 && !errorMessage" class="min-w-2/5">
    <div class="bg-gray-800 p-4 rounded-t-lg">
      <h3 class="text-xl font-bold text-center text-white">Todo List</h3>
    </div>
    <div class="bg-gray-400 p-4 h-3/4 rounded-b-lg">
      <ul class="flex flex-col gap-4 mx-auto overflow-y-scroll h-[400px]">
        <li
          v-for="todo in data"
          :key="todo.id"
          class="grid grid-cols-6 p-4 w-full rounded-lg"
          :class="todo.is_done ? 'bg-gray-300' : 'bg-white'"
        >
          <div class="col-span-4">
            <span :class="todo.is_done ? 'text-slate-600' : ''">{{
              todo.title
            }}</span>
          </div>
          <div class="col-span-2 flex justify-end gap-2">
            <!-- Check -->
            <button
              class="cursor-pointer rounded-md"
              :class="todo.is_done ? 'bg-slate-400' : 'bg-slate-300'"
              @click="todoStore.updateTodoStatus(todo)"
            >
              <input
                type="checkbox"
                :checked="todo.is_done"
                class="peer sr-only"
              />
              <svg
                class="w-6 h-6 text-transparent peer-checked:text-slate-700 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>

            <!--Update -->
            <button
              class="cursor-pointer text-slate-600 hover:text-amber-500"
              @click="openEditModal(todo)"
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

<style scoped>
ul::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
}

ul {
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}
</style>
