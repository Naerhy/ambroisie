<script setup lang="ts">
	import { computed } from "vue";
	import MealCard from "./MealCard.vue";
	import { useFiltersStore, useMealsStore } from "../stores";

	const mealsStore = useMealsStore();
	const filtersStore = useFiltersStore();

	const visibleMeals = computed<boolean[]>(() => {
		return mealsStore.meals.map((meal) => {
			return (
				meal.name.toLowerCase().includes(filtersStore.filters.name) &&
				meal.types.some((type) => filtersStore.filters.types.includes(type)) &&
				filtersStore.filters.difficulties.includes(meal.difficulty) &&
				filtersStore.filters.cookingTimes.includes(meal.cookingTime) &&
				(!filtersStore.filters.vegetarian || meal.isVegetarian)
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
