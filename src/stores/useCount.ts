import { defineStore } from "pinia";
import { ref, provide, type Ref, inject } from "vue";

export const useCount = defineStore("count", () => {
  const count: Ref<number> = ref(0);

  const increment = () => {
    count.value++;
  };

  return { count, increment };
});
