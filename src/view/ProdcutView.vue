<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products";
import type { Product, ProductInput } from "@/types/product";
import BaseModal from "@/components /Products/BaseModal.vue";
import ConfirmDialog from "@/components /Products/ConfirmDialog.vue";
import ProductForm from "@/components /Products/ProductForm.vue";
import ProductFilters from "@/components /Products/ProductFilters.vue";
import ProductCard from "@/components /Products/ProductCard.vue";
import AppPagination from "@/components /Products/AppPagination.vue";
import ToastMessage from "@/components /Products/ToastMessage.vue";

const store = useProductsStore();
// storeToRefs : garde la réactivité quand on déstructure le state.
// Les actions (fonctions) se récupèrent directement depuis le store.
const { products, loading, error, total, pages, filters } = storeToRefs(store);

// --- État local de l'interface -------------------------------------------
const formOpen = ref(false); // modal ajout / modification
const editing = ref<Product | null>(null); // null = ajout, sinon modification
const deleteOpen = ref(false); // modal de confirmation
const toDelete = ref<Product | null>(null);
const saving = ref(false);
const toast = ref<{ message: string; type: "success" | "error" } | null>(null);

function notify(message: string, type: "success" | "error" = "success") {
  toast.value = { message, type };
  setTimeout(() => (toast.value = null), 3000);
}

// --- Chargement & filtres ------------------------------------------------
onMounted(store.fetchProducts);

// Changer la page => on recharge
watch(() => filters.value.page, store.fetchProducts);

// Changer un filtre => retour page 1 + rechargement (avec "debounce" pour la saisie)
let timer: ReturnType<typeof setTimeout>;
watch(
  () => [filters.value.q, filters.value.category, filters.value.sortBy, filters.value.order],
  () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // Si on est déjà page 1, le watch de la page ne se déclenche pas : on recharge à la main
      if (filters.value.page === 1) store.fetchProducts();
      else filters.value.page = 1;
    }, 300);
  },
);

// --- Ajout / modification ------------------------------------------------
function openCreate() {
  editing.value = null;
  formOpen.value = true;
}

function openEdit(product: Product) {
  editing.value = product;
  formOpen.value = true;
}

async function save(values: ProductInput) {
  saving.value = true;
  try {
    if (editing.value) {
      await store.updateProduct(editing.value.id, values);
      notify("Produit modifié ✅");
    } else {
      await store.createProduct(values);
      notify("Produit ajouté ✅");
    }
    formOpen.value = false;
  } catch (e) {
    notify(store.errorMessage(e), "error");
  } finally {
    saving.value = false;
  }
}

// --- Suppression ---------------------------------------------------------
function askDelete(product: Product) {
  toDelete.value = product;
  deleteOpen.value = true;
}

async function confirmDelete() {
  if (!toDelete.value) return;
  saving.value = true;
  try {
    await store.deleteProduct(toDelete.value.id);
    notify("Produit supprimé 🗑️");
    deleteOpen.value = false;
  } catch (e) {
    notify(store.errorMessage(e), "error");
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <section>
    <div class="head">
      <div>
        <h1>Produits</h1>
        <p class="subtitle">Gérez votre catalogue : ajout, modification et suppression.</p>
      </div>
      <button class="btn btn-primary" @click="openCreate">+ Nouveau produit</button>
    </div>

    <ProductFilters
      v-model:q="filters.q"
      v-model:category="filters.category"
      v-model:sort-by="filters.sortBy"
      v-model:order="filters.order"
    />

    <!-- Rendu conditionnel : chargement / erreur / vide / liste -->
    <p v-if="loading" class="state">Chargement…</p>
    <div v-else-if="error" class="state error">
      <p>⚠️ {{ error }}</p>
      <button class="btn" @click="store.fetchProducts">Réessayer</button>
    </div>
    <p v-else-if="products.length === 0" class="state">
      Aucun produit trouvé. Cliquez sur « Nouveau produit » pour en ajouter un.
    </p>
    <template v-else>
      <div class="grid">
        <!-- v-for + :key obligatoire (identifiant unique) -->
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @edit="openEdit"
          @delete="askDelete"
        />
      </div>
      <AppPagination v-model="filters.page" :pages="pages" :total="total" />
    </template>

    <!-- Modal ajout / modification : le même formulaire sert aux deux cas.
         :key force la recréation du formulaire (valeurs initiales) à chaque ouverture. -->
    <BaseModal v-model="formOpen" :title="editing ? 'Modifier le produit' : 'Nouveau produit'">
      <ProductForm
        :key="editing?.id ?? 'new'"
        :product="editing"
        :saving="saving"
        @submit="save"
        @cancel="formOpen = false"
      />
    </BaseModal>

    <ConfirmDialog
      v-model="deleteOpen"
      :message="`Voulez-vous vraiment supprimer « ${toDelete?.name} » ? Cette action est irréversible.`"
      :loading="saving"
      @confirm="confirmDelete"
    />

    <Transition name="fade">
      <ToastMessage v-if="toast" :message="toast.message" :type="toast.type" />
    </Transition>
  </section>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
h1 {
  margin: 0;
}
.subtitle {
  margin: 0.2rem 0 0;
  color: var(--muted);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.state {
  text-align: center;
  color: var(--muted);
  padding: 3rem 1rem;
  background: var(--card);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
.state.error {
  color: var(--danger);
  background: var(--danger-soft);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
