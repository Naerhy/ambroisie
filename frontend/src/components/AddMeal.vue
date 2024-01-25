<script setup lang="ts">
	import { FormMessage, Inputs, Meal } from "../types";
	import MealInputs from "./MealInputs.vue";
	import Form from "./Form.vue";
	import { getErrorMessage, requestsBaseUrl } from "../constants";
	import { ref } from "vue";
	import axios from "axios";
	import { useMealsStore } from "../stores";

	const baseInputs: Inputs = {
		name: "",
		isRecipe: false,
		types: [],
		difficulty: 1,
		cookingTime: 1,
		isVegetarian: false,
		servings: 0,
		ingredients: "",
		directions: "",
		imageBase64: ""
	};

	const mealsStore = useMealsStore();

	const inputs = ref<Inputs>(baseInputs);
	const formMessage = ref<FormMessage>(null);

	async function handleSubmit(): Promise<void> {
		try {
			const accessToken = sessionStorage.getItem("accessToken");
			const { data: newMeal } = await axios.post<Meal>(
				requestsBaseUrl + "/meals",
				inputs.value,
				{ headers: { "Authorization": `Bearer ${accessToken}` }}
			);
			mealsStore.meals = [newMeal, ...mealsStore.meals];
			formMessage.value = {
				level: "success",
				message: `Le repas "${newMeal.name}" a été ajouté`
			};
		} catch (error: unknown) {
			formMessage.value = { level: "error", message: getErrorMessage(error) };
		}
	}
</script>

<template>
	<Form @submit.prevent="handleSubmit()" btn-text="Ajouter" :form-message="formMessage">
		<MealInputs :base-inputs="baseInputs" @inputs-change="(newInputs) => inputs = newInputs" />
	</Form>
</template>
