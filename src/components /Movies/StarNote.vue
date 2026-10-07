<script setup lang="ts">
const note = defineModel<number>();
</script>

<template>
  <button @click="note = (note ?? 0) - 1">-</button>
  <button @click="note = (note ?? 0) + 1">+</button>
  <span>{{ note }}</span>
</template>
