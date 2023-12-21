<script setup lang="ts">
	import { FormMessage, Inputs, Meal, MealsProvider } from "../types";
	import MealInputs from "./MealInputs.vue";
	import Form from "./Form.vue";
	import { getErrorMessage, mealsKey } from "../constants";
	import { inject, ref } from "vue";
	import axios from "axios";

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

	const { meals, deleteMeal } = inject(mealsKey) as MealsProvider;

	const selectedMeal = ref<Meal | null>(null);
	const inputs = ref<Inputs>(baseInputs);
	const formMessage = ref<FormMessage>(null);

	async function handleSubmit(): Promise<void> {
		if (selectedMeal.value !== null) {
			try {
				const accessToken = sessionStorage.getItem("accessToken");
				const id = selectedMeal.value.id;
				await axios.delete(
					`http://localhost:3000/meals/${id}`,
					{ headers: { "Authorization": `Bearer ${accessToken}` }}
				);
				deleteMeal(id);
				formMessage.value = {
					level: "success",
					message: `recipe ${selectedMeal.value.name} has been succesfully deleted`
				};
				selectedMeal.value = null;
			} catch (error: unknown) {
				formMessage.value = { level: "error", message: getErrorMessage(error) };
			}
		}
	}
</script>

<template>
	<div v-if="selectedMeal === null" class="flex-col">
		<label class="bold" for="meal">Select meal to modify</label>
		<select id="meal" v-model="selectedMeal" class="select">
			<option v-for="meal in meals" :value="meal">{{ meal.name }}</option>
		</select>
	</div>
	<Form v-else @submit.prevent="handleSubmit()" btn-text="Modify" :form-message="formMessage">
		<MealInputs :base-inputs="{ ...selectedMeal, imageBase64: '' }" @inputs-change="(newInputs) => inputs = newInputs" />
	</Form>
</template>
