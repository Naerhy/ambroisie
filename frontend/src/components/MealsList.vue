<script setup lang="ts">
	import { computed, inject, ref } from "vue";
	import type { Filters, Meal, MealsProvider } from "../types";
	import MealCard from "./MealCard.vue";
	import FocusedMeal from "./FocusedMeal.vue";
	import { mealsKey } from "../constants";

	const props = defineProps<{ filters: Filters }>();

	const { meals } = inject(mealsKey) as MealsProvider;

	const focusedMeal = ref<Meal | null>(null);

	const visibleMeals = computed<boolean[]>(() => {
		return meals.value.map((meal) => {
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
	<Teleport to="body">
		<FocusedMeal
			v-if="focusedMeal !== null"
			:meal="focusedMeal"
			@modal-close="focusedMeal = null"
		/>
	</Teleport>
	<section>
		<ul>
			<MealCard
				v-for="(meal, index) in meals"
				:key="meal.id"
				v-show="visibleMeals[index]"
				:meal="meal"
				@click="focusedMeal = meal"
			/>
		</ul>
	</section>
</template>

<style scoped>
	section {
		flex: 1 1 auto;
	}

	ul {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(4, minmax(150px, 1fr));
	}
</style>
