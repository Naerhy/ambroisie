import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { Filters, Meal } from "./types";

export const useMealsStore = defineStore("meals", () => {
	const meals = ref<Meal[]>([]);
	const state = ref<"loading" | "loaded" | "error">("loading");
	return { meals, state };
});

export const useAdminStore = defineStore("admin", () => {
	const isAdmin = ref(sessionStorage.getItem("accessToken") !== null);
	return { isAdmin };
});

export const useFiltersStore = defineStore("filters", () => {
	const filters: Filters = reactive({
		name: "",
		types: [1, 2, 3, 4],
		difficulties: [1, 2, 3],
		cookingTimes: [1, 2, 3, 4],
		vegetarian: false
	});
	return { filters }
});
