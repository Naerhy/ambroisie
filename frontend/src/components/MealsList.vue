<script setup lang="ts">
	import { computed } from "vue";
	import type { Filters } from "../types";
	import MealCard from "./MealCard.vue";
	import { useMealsStore } from "../stores";

	const props = defineProps<{ filters: Filters }>();

	const mealsStore = useMealsStore();

	const visibleMeals = computed<boolean[]>(() => {
		return mealsStore.meals.map((meal) => {
			return (
				meal.name.toLowerCase().includes(props.filters.name) &&
				meal.types.some((type) => props.filters.types.includes(type)) &&
				props.filters.difficulties.includes(meal.difficulty) &&
				props.filters.cookingTimes.includes(meal.cookingTime) &&
				(!props.filters.vegetarian || meal.isVegetarian)
			);
		});
	});
</script>

<template>
	<section>
		<div v-if="mealsStore.state === 'loading'">Chargement des repas...</div>
		<ul v-else-if="mealsStore.state === 'loaded'">
			<MealCard
				v-for="(meal, index) in mealsStore.meals"
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
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	}
</style>
