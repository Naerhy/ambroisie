<script setup lang="ts">
	import { ref } from "vue";
	import { FormMessage } from "../types";
	import { getErrorMessage, requestsBaseUrl } from "../constants";
	import { Meal } from "../types";
	import axios from "axios";
	import Form from "./Form.vue";
	import { useMealsStore } from "../stores";

	const selectedMeal = ref<Meal | null>(null);
	const formMessage = ref<FormMessage>(null);

	const mealsStore = useMealsStore();

	async function handleSubmit(): Promise<void> {
		if (selectedMeal.value !== null) {
			try {
				const accessToken = sessionStorage.getItem("accessToken");
				const id = selectedMeal.value.id;
				await axios.delete(`${requestsBaseUrl}/meals/${id}`, {
					headers: { Authorization: `Bearer ${accessToken}` }
				});
				mealsStore.meals = mealsStore.meals.filter((meal) => meal.id !== id);
				formMessage.value = {
					level: "success",
					message: `Le repas "${selectedMeal.value.name}" a été supprimé`
				};
				selectedMeal.value = null;
			} catch (error: unknown) {
				formMessage.value = { level: "error", message: getErrorMessage(error) };
			}
		}
	}
</script>

<template>
	<Form @submit.prevent="handleSubmit()" btn-text="Supprimer" :form-message="formMessage">
		<div class="flex-col">
			<label class="bold" for="meal">Sélectionnez le repas à supprimer</label>
			<select id="meal" v-model="selectedMeal" class="select">
				<option v-for="meal in mealsStore.meals" :value="meal">{{ meal.name }}</option>
			</select>
		</div>
	</Form>
</template>
