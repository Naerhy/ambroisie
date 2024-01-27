import { defineStore } from "pinia";
import { ref } from "vue";
import { Meal } from "./types";

export const useMealsStore = defineStore("meals", () => {
	const meals = ref<Meal[]>([]);
	const state = ref<"loading" | "loaded" | "error">("loading");
	return { meals, state };
});

export const useAdminStore = defineStore("admin", () => {
	const isAdmin = ref(sessionStorage.getItem("accessToken") !== null);
	return { isAdmin };
});
