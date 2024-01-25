<script setup lang="ts">
	import { FormMessage, Inputs, Meal } from "../types";
	import MealInputs from "./MealInputs.vue";
	import Form from "./Form.vue";
	import { getErrorMessage, requestsBaseUrl } from "../constants";
	import { ref } from "vue";
	import axios from "axios";
	import { useMealsStore } from "../stores";

	const mealsStore = useMealsStore();

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

	const selectedMeal = ref<Meal | null>(null);
	const inputs = ref<Inputs>(baseInputs);
	const formMessage = ref<FormMessage>(null);

	async function handleSubmit(): Promise<void> {
		if (selectedMeal.value !== null) {
			try {
				const accessToken = sessionStorage.getItem("accessToken");
				const id = selectedMeal.value.id;
				const { data: updatedMeal } = await axios.put<Meal>(`${requestsBaseUrl}/meals/${id}`, inputs.value, {
					headers: { Authorization: `Bearer ${accessToken}` }
				});
				modifyMeal(updatedMeal);
				formMessage.value = {
					level: "success",
					message: `Le repas "${selectedMeal.value.name}" a été mis a jour`
				};
				selectedMeal.value = null;
			} catch (error: unknown) {
				formMessage.value = { level: "error", message: getErrorMessage(error) };
			}
		}
	}

	function modifyMeal(meal: Meal): void {
		const id = mealsStore.meals.findIndex((m) => m.id === meal.id);
		if (id !== -1) mealsStore.meals[id] = meal;
	}
</script>

<template>
	<Form @submit.prevent="handleSubmit()" btn-text="Modifier" :form-message="formMessage">
		<div v-if="selectedMeal === null" class="flex-col">
			<label class="bold" for="meal">Sélectionnez le repas à modifier</label>
			<select id="meal" v-model="selectedMeal" class="select">
				<option v-for="meal in mealsStore.meals" :value="meal">{{ meal.name }}</option>
			</select>
		</div>
		<MealInputs
			v-else
			:base-inputs="{ ...selectedMeal, imageBase64: '' }"
			@inputs-change="(newInputs) => (inputs = newInputs)"
		/>
	</Form>
</template>
