<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "@/types/product";

const props = defineProps<{ product: Product }>();
const emit = defineEmits<{ edit: [product: Product]; delete: [product: Product] }>();

// computed : valeur dérivée, recalculée automatiquement
const formattedPrice = computed(() =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(props.product.price),
);

const stockStatus = computed(() => {
  if (props.product.stock === 0) return { label: "Rupture", cls: "out" };
  if (props.product.stock < 5) return { label: `Stock faible (${props.product.stock})`, cls: "low" };
  return { label: `En stock (${props.product.stock})`, cls: "ok" };
});
</script>

<template>
  <article class="card">
    <div class="top">
      <span v-if="product.category" class="category">{{ product.category }}</span>
      <span class="stock" :class="stockStatus.cls">{{ stockStatus.label }}</span>
    </div>
    <h3>{{ product.name }}</h3>
    <p class="description">{{ product.description || "Aucune description" }}</p>
    <div class="bottom">
      <strong class="price">{{ formattedPrice }}</strong>
      <div class="actions">
        <button class="btn btn-sm" @click="emit('edit', product)">✏️ Modifier</button>
        <button class="btn btn-sm" @click="emit('delete', product)">🗑️</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.15s;
}
.card:hover {
  transform: translateY(-2px);
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  min-height: 1.6rem;
}
.category {
  background: var(--primary-soft);
  color: var(--primary);
  padding: 0.15rem 0.6rem;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 600;
}
.stock {
  font-size: 0.78rem;
  font-weight: 600;
  margin-left: auto;
}
.stock.ok {
  color: var(--success);
}
.stock.low {
  color: #d97706;
}
.stock.out {
  color: var(--danger);
}
h3 {
  margin: 0;
  font-size: 1.1rem;
}
.description {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
  flex: 1;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}
.price {
  font-size: 1.2rem;
}
.actions {
  display: flex;
  gap: 0.4rem;
}
</style>
