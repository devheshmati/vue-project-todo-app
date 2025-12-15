<script setup>
import { onMounted, computed, ref, reactive, watch, nextTick } from "vue";
import { useTodoStore } from "/stores/todos.js";
import { useModalStore } from "/stores/modal";
import { gsap } from "gsap";

import Modal from "../components/Modal.vue";

// Define Options
defineOptions({
  name: "TodosListComponent",
});

const mainTodoListParent = ref(null);
const hasScrollbar = ref(false);

const mainFrame = ref(null);
const mainHeader = ref(null);
const mainSortFrame = ref(null);
const mainTodoList = ref(null);
const todoItems = ref([]);

const modalStore = useModalStore();
const todoStore = useTodoStore();
const filters = reactive({
  todoStatus: "none",
  todoSortBy: "none",
});

// check overflow
const checkScrollbar = () => {
  if (mainTodoListParent.value) {
    hasScrollbar.value =
      mainTodoListParent.value.scrollHeight >
      mainTodoListParent.value.clientHeight;
  }
};

// this is for modal
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
  modalStore.isToggle = true;
}

function closeModal() {
  modalStore.isToggle = false;
}

async function submitEdit() {
  await todoStore.editTodo(newTodoData.id, {
    title: newTodoData.title,
    description: newTodoData.description,
  });

  closeModal();
}

const filteredAndSortedTodos = computed(() => {
  let list = [...todoStore.todosList];

  if (filters.todoStatus === "unfinished") {
    list = list.filter((todo) => !todo.is_done);
  } else if (filters.todoStatus === "finished") {
    list = list.filter((todo) => todo.is_done);
  } else if (filters.todoStatus === "none") {
    list = list.filter((todo) => todo);
  }

  list.sort((a, b) => {
    if (filters.todoSortBy === "unfinished-first") {
      return a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1;
    }
    if (filters.todoSortBy === "finished-first") {
      return a.is_done === b.is_done ? 0 : a.is_done ? -1 : 1;
    }
    if (filters.todoSortBy === "newest") {
      return b.id - a.id;
    }
    if (filters.todoSortBy === "oldest") {
      return a.id - b.id;
    }
    return 0;
  });

  return list;
});

function refreshPage() {
  window.location.reload();
}

onMounted(() => {
  // check scroll bar of todo list
  checkScrollbar();
  const resizeObserver = new ResizeObserver(() => {
    checkScrollbar();
  });

  if (mainTodoList.value) {
    resizeObserver.observe(mainTodoListParent.value);
  }

  // animation
  const tl = gsap.timeline();

  tl.from(mainFrame.value, {
    autoAlpha: 0,
    ease: "power.out",
    delay: 0.6,
    duration: 0.6,
  })
    .from(mainHeader.value, {
      autoAlpha: 0,
      xPercent: -50,
      ease: "expo.out",
      duration: 0.4,
    })
    .from(mainSortFrame.value, {
      yPercent: 50,
      autoAlpha: 0,
      ease: "expo.out",
      duration: 1,
    })
    .from(
      mainTodoListParent.value,
      {
        autoAlpha: 0,
        ease: "power.out",
        duration: 0.5,
      },
      "-=0.5",
    )
    .from(
      todoItems.value,
      {
        xPercent: -110,
        autoAlpha: 0,
        ease: "expo.out",
        stagger: {
          each: 0.1,
        },
      },
      "-=0.5",
    );
});

watch(
  filteredAndSortedTodos,
  () => {
    nextTick(() => checkScrollbar());
  },
  { deep: true },
);
</script>

<template>
  <div class="w-full h-full flex items-center">
    <!-- Modal -->
    <Modal>
      <form class="flex flex-col gap-3 w-full" @submit.prevent="submitEdit">
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
          <button
            type="submit"
            class="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>

    <!-- errors section -->
    <div
      v-if="!todoStore.todosList.length && !todoStore.errorMessage"
      class="bg-orange-800 text-white p-4"
    >
      There are no tasks in list.
    </div>

    <div
      v-if="todoStore.errorMessage"
      class="bg-red-800 text-white p-4 flex justify-between items-center"
    >
      {{ todoStore.errorMessage }}
      <button
        @click="refreshPage"
        class="bg-cyan-600 text-white hover:bg-cyan-500 p-2 rounded-lg"
      >
        -> Refresh Page
      </button>
    </div>

    <!-- main Frame section -->
    <div
      ref="mainFrame"
      v-if="todoStore.todosList.length > 0 && !todoStore.errorMessage"
      class="w-9/10 sm:w-3/4 sm:min-w-2/5 md:w-1/2 bg-gray-400 rounded-lg mx-auto justify-items-center h-8/10"
    >
      <!-- main header -->
      <div class="bg-gray-800 p-4 col-span-1 w-full h-fit">
        <h3 ref="mainHeader" class="text-xl font-bold text-center text-white">
          Todo List
        </h3>
      </div>

      <div class="w-9/10 py-2">
        <!-- sort section -->
        <div
          ref="mainSortFrame"
          class="flex flex-col sm:flex-row gap-2 justify-between p-2 bg-gray-200 rounded-xl text-md sm:text-sm w-full h-fit"
        >
          <div>
            <label for="#todoSortByEl" class="text-gray-700">Sort by: </label>
            <select ref="todoSortByEl" v-model="filters.todoSortBy" class="">
              <option value="none" selected disabled>Not Selected</option>
              <option value="unfinished-first">Unfinished first</option>
              <option value="finished-first">Finished first</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div>
            <label for="#todoStatus" class="text-gray-700"
              >Is Done Filter:
            </label>
            <select ref="todoStatusEl" v-model="filters.todoStatus" class="">
              <option value="none" selected>None</option>
              <option value="unfinished">Unfinished</option>
              <option value="finished">Finished</option>
            </select>
          </div>
        </div>

        <div class="py-2 h-full">
          <div ref="mainTodoListParent" class="w-full overflow-y-auto h-98">
            <ul
              ref="mainTodoList"
              class="flex flex-col gap-2"
              :class="{ 'pe-2': hasScrollbar }"
            >
              <li
                ref="todoItems"
                v-for="todo in filteredAndSortedTodos"
                :key="todo.id"
                class="grid grid-cols-6 p-4 w-full h-fit rounded-lg"
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
      </div>
    </div>
  </div>
</template>
