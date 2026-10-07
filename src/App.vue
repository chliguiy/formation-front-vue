<script setup lang="ts">
import AppHeader from "@/components /AppHeader.vue";
import AppFooter from "@/components /AppFooter.vue";
</script>

<template>
  <app-header>
    <template #nav>
      <nav>
        <ul>
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><RouterLink to="/products">Produits</RouterLink></li>
        </ul>
      </nav>
    </template>
  </app-header>

  <main>
    <RouterView />
  </main>
  <app-footer />
</template>
