<script setup lang="ts">
	import "@fontsource-variable/inter";
	import { onMounted } from "vue";
	import axios from "axios";
	import { requestsBaseUrl } from "./constants";
	import type { Meal } from "./types";
	import Header from "./components/Header.vue";
	import Footer from "./components/Footer.vue";
	import { useMealsStore } from "./stores";

	const mealsStore = useMealsStore();

	onMounted(async () => {
		try {
			const { data: loadedMeals } = await axios.get<Meal[]>(`${requestsBaseUrl}/meals`);
			shuffleMeals(loadedMeals);
			mealsStore.meals = loadedMeals;
			mealsStore.state = "loaded";
		} catch {
			mealsStore.state = "error";
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
		font-family: sans-serif, Arial;
	}

	#app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: auto;
		max-width: 80rem;
	}

	main {
		flex: 1 1 auto;
		padding: 2rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	.bold {
		font-weight: 700;
	}

	.bdr {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
	}

	.link {
		color: var(--highlight);
		text-decoration: underline;
	}

	.link:hover {
		color: var(--highlight-dark);
	}

	.form-field {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}

	.input,
	.select {
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

	.btn-contained,
	.btn-text {
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

	@supports (font-variation-settings: normal) {
		html {
			font-family: "Inter Variable", sans-serif, Arial;
			font-variation-settings: "wght" 400;
			font-weight: 400;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		.bold {
			font-variation-settings: "wght" 700;
			font-weight: 700;
		}
	}
</style>
