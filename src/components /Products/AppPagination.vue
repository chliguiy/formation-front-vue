<script setup lang="ts">
defineProps<{ pages: number; total: number }>();
const page = defineModel<number>({ required: true });
</script>

<template>
  <nav class="pagination">
    <button class="btn btn-sm" :disabled="page <= 1" @click="page--">← Précédent</button>
    <span>Page {{ page }} / {{ pages }} · {{ total }} produit(s)</span>
    <button class="btn btn-sm" :disabled="page >= pages" @click="page++">Suivant →</button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
