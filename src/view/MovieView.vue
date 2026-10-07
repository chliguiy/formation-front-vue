<script setup lang="ts">
import { ref } from "vue";
import MovieCard, { type Film } from "@/components /Movies/MovieCard.vue";
import AddFormMovie from "@/components /Movies/AddFormMovie.vue";
import { useCount } from "@/stores/useCount.js";
import { storeToRefs } from "pinia";
const ajoutFilm = ref(false);
const counter = useCount();
const { increment } = counter;
const { count } = storeToRefs(counter);
const films = ref<Film[]>([
  {
    id: 1,
    titre: "Parasite",
    note: 5,
    vu: true,
    description: "Une famille pauvre s'infiltre chez une famille riche.",
  },
  {
    id: 2,
    titre: "Mommy",
    note: 4,
    vu: true,
    description: "Une mère veuve élève seule son fils hyperactif.",
  },
  {
    id: 3,
    titre: "Dune",
    note: 0,
    vu: false,
    description: "Paul Atreides part pour la planète désertique Arrakis.",
  },
  {
    id: 4,
    titre: "Amélie",
    note: 0,
    vu: false,
    description: "Une jeune serveuse parisienne décide d'améliorer la vie des autres.",
  },
]);
const onSubmit = (values: { titre: string; note: number; vu: boolean; description: string }) => {
  const newFilm: Film = {
    id: films.value.length + 1,
    titre: values.titre,
    note: values.note,
    vu: values.vu,
    description: values.description,
  };
  films.value.push(newFilm);
  ajoutFilm.value = false;
};
</script>

<template>
  <button @click="increment">Compteur: {{ count }}</button>

  <button @click="ajoutFilm = !ajoutFilm">Afficher formulaire du film</button>
  <AddFormMovie v-if="ajoutFilm" @submit="onSubmit" />
  <h1>Liste des films</h1>
  <MovieCard v-for="film in films" :key="film.id" :movie="film" />
</template>
