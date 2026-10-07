<script setup lang="ts">
import { ref } from "vue";

export interface Film {
  id: number;
  titre: string;
  note: number;
  vu: boolean;
  synopsis?: string;
}

defineProps<{ film: Film }>();

const ouvert = ref(false);
</script>

<template>
  <article class="movie-card">
    <h2>{{ film.titre }}</h2>
    <span v-if="film.vu">Vu</span>
    <span v-else>À voir</span>

    <p v-if="film.note >= 4">Coup de cœur</p>
    <p v-else-if="film.note >= 2">À voir</p>
    <p v-else>Sans plus</p>

    <template v-if="film.vu">
      <h3>Mon avis</h3>
      <p>Note : {{ film.note }} / 5</p>
    </template>

    <button @click="ouvert = !ouvert">Synopsis</button>
    <div v-show="ouvert" v-html="film.synopsis"></div>
  </article>
</template>

<style scoped>
.movie-card {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>
