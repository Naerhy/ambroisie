<script setup lang="ts">
	import { computed, inject } from "vue";
	import type { Filters, MealsProvider } from "../types";
	import MealCard from "./MealCard.vue";
	import { mealsKey } from "../constants";

	const props = defineProps<{ filters: Filters }>();

	const { meals } = inject(mealsKey) as MealsProvider;

	const visibleMeals = computed<boolean[]>(() => {
		return meals.value.data.map((meal) => {
			return (
				meal.name.toLowerCase().includes(props.filters.name)
				&& meal.types.some((type) => props.filters.types.includes(type))
				&& props.filters.difficulties.includes(meal.difficulty)
				&& props.filters.cookingTimes.includes(meal.cookingTime)
				&& (!props.filters.vegetarian || meal.isVegetarian)
			);
		});
	});
</script>

<template>
	<section>
		<div v-if="meals.state === 'loading'">Chargement des repas...</div>
		<ul v-else-if="meals.state === 'loaded'">
			<MealCard
				v-for="(meal, index) in meals.data"
				:key="meal.id"
				v-show="visibleMeals[index]"
				:meal="meal"
			/>
		</ul>
		<p v-else>Error!</p>
	</section>
</template>

<style scoped>
	section {
		flex: 1 1 auto;
	}

	ul {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(5, minmax(150px, 1fr));
	}
</style>
