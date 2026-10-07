<script lang="ts" setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
const emit = defineEmits<{
  (
    e: "submit",
    values: {
      titre: string;
      note: number;
      vu: boolean;
      description: string;
    },
  ): void;
}>();
const schema = yup.object({
  titre: yup.string().required("Le titre est requis"),
  note: yup.number().min(0).max(5).required("La note est requise"),
  vu: yup.boolean().required("Le statut de visionnage est requis"),
  description: yup.string().required("La description est requise"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const formData = ref({
  titre: "",
  note: 0,
  vu: false,
  description: "",
});
const errors = ref({
  titre: "",
  note: "",
  vu: "",
  description: "",
});
const submitForm = (values) => {
  if (formData.value.titre && formData.value.description) {
    emit("submit", values);
    resetForm();
  } else {
    console.log("Formulaire invalide");
    errors.value.titre = formData.value.titre ? "" : "Le titre est requis";
    errors.value.description = formData.value.description ? "" : "La description est requise";
  }
};
</script>

<template>
  <form @submit="submitForm">
    <div>
      <label for="titre">Titre:</label>
      <input id="titre" v-model="formData.titre" type="text" />
      <span>{{ errors.titre }}</span>
    </div>

    <div>
      <label for="note">Note:</label>
      <input id="note" v-model.number="formData.note" type="number" min="0" max="5" />
      <span>{{ errors.note }}</span>
    </div>

    <div>
      <label for="vu">Vu:</label>
      <input id="vu" v-model="formData.vu" type="checkbox" />
      <span>{{ errors.vu }}</span>
    </div>

    <div>
      c
      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description"></textarea>
      <span>{{ errors.description }}</span>
    </div>

    <button type="submit">Ajouter le film</button>
  </form>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input,
textarea {
  padding: 5px;
  font-size: 1rem;
}

span {
  color: red;
  font-size: 0.9rem;
}
</style>
