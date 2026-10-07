<script setup lang="ts">
defineProps<{ message: string; type: "success" | "error" }>();
</script>

<template>
  <div class="toast" :class="type" role="status">{{ message }}</div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
  z-index: 60;
}
.success {
  background: var(--success);
}
.error {
  background: var(--danger);
}
</style>
