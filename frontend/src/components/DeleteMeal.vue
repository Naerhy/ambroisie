<script setup lang="ts">
	import { inject, ref } from "vue";
	import { FormMessage, MealsProvider } from "../types";
	import { getErrorMessage, mealsKey, requestsBaseUrl } from "../constants";
	import { Meal } from "../types";
	import axios from "axios";
	import Form from "./Form.vue";

	const selectedMeal = ref<Meal | null>(null);
	const formMessage = ref<FormMessage>(null);

	const { meals, deleteMeal } = inject(mealsKey) as MealsProvider;

	async function handleSubmit(): Promise<void> {
		if (selectedMeal.value !== null) {
			try {
				const accessToken = sessionStorage.getItem("accessToken");
				const id = selectedMeal.value.id;
				await axios.delete(
					requestsBaseUrl + `/meals/${id}`,
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
	<Form @submit.prevent="handleSubmit()" btn-text="Delete" :form-message="formMessage">
		<div class="flex-col">
			<label class="bold" for="meal">Select meal to delete</label>
			<select id="meal" v-model="selectedMeal" class="select">
				<option v-for="meal in meals" :value="meal">{{ meal.name }}</option>
			</select>
		</div>
	</Form>
</template>
