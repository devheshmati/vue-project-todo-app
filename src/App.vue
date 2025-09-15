// list of directives // v-bind // v-model // v-on or @: or @ // v-if // v-else
// v-show // v-for // computed // watch // watchEffect // composition function
// props -- send data to the child component // emit events -- send data to the
parent // slots // provide and inject // router // nested routes | params |
query string // pinia state manager | store | actions: if you need update state
| getters: if you don't need update state // axios | axios get | axios post //
hook lifecycle // forms // login && signup // navigation guards // form
validation | vee-validate // lazy loading

<script setup></script>

<template>
  <header class="">
    <nav class="text-white grid grid-cols-3">
      <RouterLink
        class="py-2 px-4 bg-gray-800 flex justify-center items-center hover:bg-gray-600"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        class="py-2 px-4 bg-gray-800 flex justify-center items-center hover:bg-gray-600"
        to="/login"
        >Login</RouterLink
      >
      <RouterLink
        class="py-2 px-4 bg-gray-800 flex justify-center items-center hover:bg-gray-600"
        to="/register"
        >Register</RouterLink
      >
    </nav>
  </header>
  <RouterView />
</template>

<style></style>
