<script setup lang="ts">
	import { computed } from "vue";
	import { capitalize, cookingTimes, difficulties, types } from "../constants";
	import { useRoute } from "vue-router";
	import { useMealsStore } from "../stores";

	interface Infos {
		title: string;
		value: string;
	}

	const mealsStore = useMealsStore();

	const route = useRoute();
	const id = parseInt(route.params.id as string);

	const meal = computed(() => {
		if (isNaN(id)) { return null; }
		return mealsStore.meals.find((meal) => meal.id === id) ?? null;
	});

	const infos = computed<Infos[]>(() => {
		const m = meal.value;
		if (m === null) { return []; }
		return [
			{ title: "Types", value: m.types.map((type) => capitalize(types[type - 1])).join(" | ") },
			{ title: "Difficulté", value: capitalize(difficulties[m.difficulty - 1]) },
			{ title: "Temps de préparation", value: capitalize(cookingTimes[m.cookingTime - 1]) },
			{ title: "Végétarisme", value: m.isVegetarian ? "🟢" : "🔴" },
			{ title: "Nombre de parts", value: m.isRecipe ? m.servings.toString() : "-" }
		];
	});
</script>

<template>
	<div v-if="mealsStore.state === 'loading'">Chargement...</div>
	<div v-else-if="mealsStore.state === 'error'">Erreur...</div>
	<main v-else-if="meal !== null">
		<article>
			<h2>{{ meal.name }}</h2>
			<ul class="infos">
				<li v-for="info in infos">
					<span>{{ info.title }}</span>
					{{ info.value }}
				</li>
			</ul>
			<div class="ingredients">
				<h3>Ingrédients</h3>
				<p v-if="!meal.isRecipe">Ce repas n'est pas une recette, aucun ingrédient à afficher.</p>
				<p v-else-if="meal.ingredients.length === 0">Aucun ingrédient n'a été ajouté à la recette.</p>
				<ul v-else>
					<li v-for="ingredient in meal.ingredients.split('\n')">{{ ingredient }}</li>
				</ul>
			</div>
			<div class="directions">
				<h3>Préparation</h3>
				<p v-if="!meal.isRecipe">Ce repas n'est pas une recette, aucune étape de preparation à afficher.</p>
				<p v-else-if="meal.directions.length === 0">Aucune étape de préparation n'a été ajoutée à la recette.</p>
				<ol v-else>
					<li v-for="direction in meal.directions.split('\n')">{{ direction }}</li>
				</ol>
			</div>
		</article>
	</main>
	<div v-else>Le repas n'existe pas...</div>
</template>

<style scoped>
	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}

	h3 {
		font-size: 1.5rem;
		line-height: 2rem;
	}
</style>
