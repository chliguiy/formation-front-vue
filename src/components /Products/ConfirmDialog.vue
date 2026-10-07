<script setup lang="ts">
import BaseModal from "./BaseModal.vue";

defineProps<{ message: string; loading?: boolean }>();
const emit = defineEmits<{ confirm: []; cancel: [] }>();

const open = defineModel<boolean>({ required: true });
</script>

<template>
  <!-- On réutilise BaseModal : composition de composants -->
  <BaseModal v-model="open" title="Confirmer la suppression">
    <p class="message">{{ message }}</p>
    <footer>
      <button class="btn" @click="open = false">Annuler</button>
      <button class="btn btn-danger" :disabled="loading" @click="emit('confirm')">
        {{ loading ? "Suppression…" : "Supprimer" }}
      </button>
    </footer>
  </BaseModal>
</template>

<style scoped>
.message {
  color: var(--muted);
  margin: 0 0 1.5rem;
}
footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
