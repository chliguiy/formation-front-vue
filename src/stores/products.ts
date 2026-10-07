import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Product, ProductFilters, ProductInput, ProductPage } from "@/types/product";

// Une instance axios configurée une seule fois : baseURL + JSON par défaut
const api = axios.create({ baseURL: "/api/products" });

// Nest renvoie { message: string | string[] } en cas d'erreur de validation
function errorMessage(e: unknown): string {
  if (axios.isAxiosError(e)) {
    const message = e.response?.data?.message;
    return Array.isArray(message) ? message.join(", ") : (message ?? e.message);
  }
  return e instanceof Error ? e.message : "Erreur inconnue";
}

// Store "setup" : ref() = state, fonctions = actions
export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const total = ref(0);
  const pages = ref(1);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Les filtres vivent dans le store : la vue les modifie via v-model
  const filters = reactive<ProductFilters>({
    q: "",
    category: "",
    sortBy: "createdAt",
    order: "DESC",
    page: 1,
    limit: 6,
  });

  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      // axios construit la query string à partir de "params"
      // On n'envoie que les filtres renseignés
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ""));
      const { data } = await api.get<ProductPage>("", { params });
      products.value = data.data;
      total.value = data.total;
      pages.value = Math.max(data.pages, 1);
    } catch (e) {
      error.value = errorMessage(e);
    } finally {
      loading.value = false;
    }
  }

  // Les actions CRUD laissent remonter l'erreur : c'est le composant qui affiche le toast
  // (errorMessage est exposé pour formater cette erreur)
  async function createProduct(input: ProductInput) {
    await api.post<Product>("", input);
    await fetchProducts();
  }

  async function updateProduct(id: number, input: ProductInput) {
    await api.patch<Product>(`/${id}`, input);
    await fetchProducts();
  }

  async function deleteProduct(id: number) {
    await api.delete(`/${id}`);
    // Si on vient de supprimer le dernier élément d'une page, on recule d'une page
    if (products.value.length === 1 && filters.page > 1) filters.page--;
    await fetchProducts();
  }

  return {
    errorMessage,
    products,
    total,
    pages,
    loading,
    error,
    filters,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
