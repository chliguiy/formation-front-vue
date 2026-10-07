<script setup lang="ts">
import { computed } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { Product, ProductInput } from "@/types/product";

// Props : ce que le parent nous donne. Si "product" existe => mode édition.
const props = defineProps<{
  product?: Product | null;
  saving?: boolean;
}>();

// Emits : ce que le composant dit au parent
const emit = defineEmits<{
  submit: [values: ProductInput];
  cancel: [];
}>();

const isEdit = computed(() => !!props.product);

const schema = yup.object({
  name: yup.string().trim().required("Le nom est obligatoire"),
  description: yup.string().default(""),
  price: yup
    .number()
    .typeError("Le prix doit être un nombre")
    .min(0, "Le prix doit être positif")
    .required("Le prix est obligatoire"),
  stock: yup
    .number()
    .typeError("Le stock doit être un nombre")
    .integer("Le stock doit être un entier")
    .min(0, "Le stock doit être positif")
    .default(0),
  category: yup.string().default(""),
});

// useForm gère les valeurs, la validation et les erreurs
const { defineField, errors, handleSubmit, meta } = useForm({
  validationSchema: schema,
  // Les valeurs de départ : produit existant (édition) ou formulaire vide (ajout)
  initialValues: {
    name: props.product?.name ?? "",
    description: props.product?.description ?? "",
    price: props.product?.price ?? 0,
    stock: props.product?.stock ?? 0,
    category: props.product?.category ?? "",
  },
});

// defineField renvoie [valeur, attributs] → utilisable avec v-model
const [name] = defineField("name");
const [description] = defineField("description");
const [price] = defineField("price");
const [stock] = defineField("stock");
const [category] = defineField("category");

// handleSubmit n'appelle la fonction que si le formulaire est valide
const onSubmit = handleSubmit((values) => {
  emit("submit", {
    name: values.name,
    description: values.description || undefined,
    price: values.price,
    stock: values.stock,
    category: values.category || undefined,
  });
});
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <div class="field">
      <label for="name">Nom *</label>
      <input id="name" v-model="name" type="text" placeholder="Ex : Clavier mécanique" />
      <small v-if="errors.name" class="error">{{ errors.name }}</small>
    </div>

    <div class="field">
      <label for="description">Description</label>
      <textarea id="description" v-model="description" rows="3" />
    </div>

    <div class="row">
      <div class="field">
        <label for="price">Prix (€) *</label>
        <!-- v-model.number : convertit la saisie en nombre -->
        <input id="price" v-model.number="price" type="number" step="0.01" min="0" />
        <small v-if="errors.price" class="error">{{ errors.price }}</small>
      </div>
      <div class="field">
        <label for="stock">Stock</label>
        <input id="stock" v-model.number="stock" type="number" min="0" />
        <small v-if="errors.stock" class="error">{{ errors.stock }}</small>
      </div>
    </div>

    <div class="field">
      <label for="category">Catégorie</label>
      <input id="category" v-model="category" type="text" placeholder="Ex : Informatique" />
    </div>

    <footer>
      <button type="button" class="btn" @click="emit('cancel')">Annuler</button>
      <button type="submit" class="btn btn-primary" :disabled="saving || !meta.valid">
        {{ saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Ajouter" }}
      </button>
    </footer>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}
.row {
  display: flex;
  gap: 1rem;
}
label {
  font-weight: 600;
  font-size: 0.9rem;
}
input,
textarea {
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font: inherit;
}
input:focus,
textarea:focus {
  outline: 2px solid var(--primary-soft);
  border-color: var(--primary);
}
.error {
  color: var(--danger);
}
footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
