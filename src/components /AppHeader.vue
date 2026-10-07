<script setup lang="ts"></script>

<template>
  <header>
    <h1>Formation Vue.js</h1>
    <slot name="nav"></slot>
  </header>
</template>

<style>
header {
  background-color: var(--primary, #4f46e5);
  color: #fff;
  padding: 1rem;
  width: 100%;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
nav a {
  color: #fff;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: 700;
  text-decoration: underline;
}
nav a:hover {
  text-decoration: underline;
}
</style>
