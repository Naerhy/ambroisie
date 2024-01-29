<script setup lang="ts">
	import MealsFilters from "../components/MealsFilters.vue";
	import MealsList from "../components/MealsList.vue";
</script>

<template>
	<main>
		<MealsFilters />
		<MealsList />
	</main>
</template>

<style scoped>
	main {
		align-items: flex-start;
		column-gap: 1rem;
		display: flex;
	}
</style>
