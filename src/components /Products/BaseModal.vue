<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

defineProps<{ title: string }>();

// defineModel() : crée une prop "modelValue" + l'évènement "update:modelValue"
// Le parent l'utilise avec  v-model="isOpen"
const open = defineModel<boolean>({ required: true });

function close() {
  open.value = false;
}

// Fermer avec la touche Échap
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) close();
}
onMounted(() => window.addEventListener("keydown", onKeydown));
// Toujours nettoyer ce qu'on a ajouté à window !
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <!-- Teleport : le DOM est placé dans <body>, pas dans le composant parent -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="overlay" @click.self="close">
        <div class="modal" role="dialog" aria-modal="true">
          <header>
            <h2>{{ title }}</h2>
            <button class="close" aria-label="Fermer" @click="close">✕</button>
          </header>
          <!-- Slot : le contenu est fourni par le parent -->
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgb(15 23 42 / 0.5);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 50;
}
.modal {
  background: var(--card);
  border-radius: var(--radius);
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 50px rgb(0 0 0 / 0.25);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
h2 {
  margin: 0;
  font-size: 1.25rem;
}
.close {
  border: none;
  background: none;
  font-size: 1.1rem;
  color: var(--muted);
  cursor: pointer;
}
/* Classes générées par <Transition name="modal"> */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(16px) scale(0.97);
}
</style>
