<script setup lang="ts">
	import Header from "./Header.vue";
	import MealsFilters from "./MealsFilters.vue";
	import MealsList from "./MealsList.vue";
	import Footer from "./Footer.vue";
	import { Filters, LoadedView } from "../types";
	import { ref } from "vue";
	import ManageMeals from "./ManageMeals.vue";

	const baseFilters: Filters = {
		name: "",
		types: ["breakfast", "lunch", "tea", "dinner"],
		difficulties: [1, 2, 3],
		cookingTimes: [1, 2, 3, 4],
		vegetarian: false
	};

	const view = ref<LoadedView>("list");
	const filters = ref<Filters>(baseFilters);

	function handleChangeView(newView: LoadedView): void {
		view.value = newView;
	}
</script>

<template>
	<Header @change-view="(newView) => handleChangeView(newView)" />
		<main :class="{ manage: view === 'manage'}">
			<template v-if="view === 'list'">
				<MealsFilters
					:base-filters="baseFilters"
					@filters-change="(newFilters) => filters = newFilters"
					v-if="view === 'list'"
				/>
				<MealsList :filters="filters" />
			</template>
			<ManageMeals v-else />
		</main>
	<Footer />
</template>

<style scoped>
	main {
		align-items: flex-start;
		column-gap: 2rem;
		display: flex;
		margin: auto;
		width: 80%;
	}

	.manage {
		justify-content: center;
	}
</style>
