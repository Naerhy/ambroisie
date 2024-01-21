<script setup lang="ts">
	import { ref } from "vue";
	import { Filters } from "../types";
	import MealsFilters from "../components/MealsFilters.vue";
	import MealsList from "../components/MealsList.vue";

	const baseFilters: Filters = {
		name: "",
		types: [1, 2, 3, 4],
		difficulties: [1, 2, 3],
		cookingTimes: [1, 2, 3, 4],
		vegetarian: false
	};

	const filters = ref<Filters>(baseFilters);
</script>

<template>
	<main>
		<MealsFilters
			:base-filters="baseFilters"
			@filters-change="(newFilters) => filters = newFilters"
		/>
		<MealsList :filters="filters" />
	</main>
</template>

<style scoped>
	main {
		align-items: flex-start;
		column-gap: 2rem;
		display: flex;
		margin: 0rem 2rem;
	}
</style>
