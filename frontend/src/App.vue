<script setup lang="ts">
	import "@fontsource-variable/inter";
	import { onMounted, provide, ref } from "vue";
	import axios from "axios";
	import { isAdminKey, mealsKey, requestsBaseUrl } from "./constants";
	import type { Meal, Meals } from "./types";
	import Header from "./components/Header.vue";
	import Footer from "./components/Footer.vue";

	const meals = ref<Meals>({ data: [], state: "loading" });
	const isAdmin = ref<boolean>(sessionStorage.getItem("accessToken") !== null);

	provide(mealsKey, {
		meals,
		addMeal: (meal: Meal): void => {
			meals.value.data = [meal, ...meals.value.data]
		},
		modifyMeal: (updatedMeal: Meal): void => {
			const id = meals.value.data.findIndex((meal) => meal.id === updatedMeal.id);
			if (id !== -1) {
				meals.value.data[id] = updatedMeal;
			}
		},
		deleteMeal: (id: number): void => {
			meals.value.data = meals.value.data.filter((meal) => meal.id !== id);
		}
	});

	provide(isAdminKey, {
		isAdmin,
		updateIsAdmin: (bool: boolean): void => {
			isAdmin.value = bool;
		}
	});

	onMounted(async () => {
		try {
			const { data: loadedMeals } = await axios.get<Meal[]>(`${requestsBaseUrl}/meals`);
			shuffleMeals(loadedMeals);
			meals.value.data = loadedMeals;
			meals.value.state = "loaded";
		} catch {
			meals.value.state = "error";
		}
	});

	function shuffleMeals(meals: Meal[]): void {
		for (let i = meals.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[meals[i], meals[j]] = [meals[j], meals[i]];
		}
	}
</script>

<template>
	<Header />
	<router-view />
	<Footer />
</template>

<style>
	html {
		--background: #eeeeee;
		--background-dark: #e0e0e0;
		--stroke: #bdbdbd;
		--highlight: #3f51b5;
		--highlight-dark: #3949ab;
		--text-default: #212121;
		--text-subtle: #757575;
		--text-highlight: #f5f5f5;
		background-color: var(--background);
		color: var(--text-default);
		font-family: "Inter Variable", Arial;
	}

	#app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		row-gap: 2rem;
	}

	main {
		flex: 1 1 auto;
	}

	h1, h2, h3, h4, h5, h6, .bold {
		font-weight: 700;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.input, .select {
		border: 1px solid var(--stroke);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
	}

	.input {
		background-color: var(--background-dark);
	}

	.input::placeholder {
		color: var(--text-subtle);
	}

	.input:focus {
		outline: 2px solid var(--highlight);
	}

	.btn-contained, .btn-text {
		border-radius: 0.25rem;
		padding: 0.5rem 0.8rem;
	}

	.btn-contained {
		background-color: var(--highlight);
		color: var(--text-highlight);
	}

	.btn-contained:hover {
		background-color: var(--highlight-dark);
	}

	.btn-text:hover {
		background-color: var(--background-dark);
	}
</style>
