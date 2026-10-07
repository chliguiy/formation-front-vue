<script setup lang="ts">
// Plusieurs v-model sur un même composant : v-model:q, v-model:category...
const q = defineModel<string>("q", { required: true });
const category = defineModel<string>("category", { required: true });
const sortBy = defineModel<"name" | "price" | "createdAt">("sortBy", { required: true });
const order = defineModel<"ASC" | "DESC">("order", { required: true });
</script>

<template>
  <div class="filters">
    <input v-model="q" type="search" placeholder="🔍 Rechercher un produit…" class="search" />
    <input v-model="category" type="text" placeholder="Catégorie" />
    <select v-model="sortBy">
      <option value="createdAt">Date d'ajout</option>
      <option value="name">Nom</option>
      <option value="price">Prix</option>
    </select>
    <button
      class="btn"
      :title="order === 'ASC' ? 'Ordre croissant' : 'Ordre décroissant'"
      @click="order = order === 'ASC' ? 'DESC' : 'ASC'"
    >
      {{ order === "ASC" ? "↑ Croissant" : "↓ Décroissant" }}
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}
input,
select {
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font: inherit;
  background: var(--card);
}
.search {
  flex: 1;
  min-width: 220px;
}
input:focus,
select:focus {
  outline: 2px solid var(--primary-soft);
  border-color: var(--primary);
}
</style>
