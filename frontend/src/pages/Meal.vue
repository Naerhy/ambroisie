<script setup lang="ts">
	import { computed, ref } from "vue";
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

	const image = ref<HTMLImageElement | null>(null);

	const meal = computed(() => {
		if (isNaN(id)) return null;
		return mealsStore.meals.find((meal) => meal.id === id) ?? null;
	});

	const imgSrc = computed(() => {
		console.log(`meal = ${meal.value}`);
		const url = "../../public/no-image.png";
		return (meal.value !== null) ? meal.value.imageBase64 : new URL(url, import.meta.url).href;
	});

	const infos = computed<Infos[]>(() => {
		const m = meal.value;
		if (m === null) return [];
		return [
			{ title: "Types", value: m.types.map((type) => capitalize(types[type - 1])).join(", ") },
			{ title: "Difficulté", value: capitalize(difficulties[m.difficulty - 1]) },
			{ title: "Temps de préparation", value: capitalize(cookingTimes[m.cookingTime - 1]) },
			{ title: "Végétarisme", value: m.isVegetarian ? "🟢" : "🔴" },
			{ title: "Nombre de parts", value: m.isRecipe ? m.servings.toString() : "-" }
		];
	});

	function handleError(): void {
		if (image.value !== null) {
			image.value.src = new URL("../../public/no-image.png", import.meta.url).href;
		}
	}
</script>

<template>
	<div v-if="mealsStore.state === 'loading'">Chargement...</div>
	<div v-else-if="mealsStore.state === 'error'">Erreur...</div>
	<main v-else-if="meal !== null">
		<article>
			<div class="image">
				<img :src="imgSrc" alt="Repas" ref="image" @error="handleError()" />
			</div>
			<h2>{{ meal.name }}</h2>
			<div class="infos-ingredients">
				<div class="infos">
					<h3>Informations</h3>
					<table>
						<tr v-for="info in infos">
							<th>{{  info.title }}</th>
							<td>{{  info.value }}</td>
						</tr>
					</table>
				</div>
				<div class="ingredients">
					<h3>Ingrédients</h3>
					<p v-if="!meal.isRecipe">Ce repas n'est pas une recette, aucun ingrédient à afficher.</p>
					<p v-else-if="meal.ingredients.length === 0">Aucun ingrédient n'a été ajouté à la recette.</p>
					<ul v-else>
						<li v-for="ingredient in meal.ingredients.split('\n')">{{ ingredient }}</li>
					</ul>
				</div>
			</div>
			<div class="directions">
				<h3>Préparation</h3>
				<p v-if="!meal.isRecipe">Ce repas n'est pas une recette, aucune étape de preparation à afficher.</p>
				<p v-else-if="meal.directions.length === 0">
					Aucune étape de préparation n'a été ajoutée à la recette.
				</p>
				<ol v-else>
					<li v-for="direction in meal.directions.split('\n')">{{ direction }}</li>
				</ol>
			</div>
		</article>
	</main>
	<div v-else>Le repas n'existe pas...</div>
</template>

<style scoped>
	article {
		display: flex;
		flex-direction: column;
		margin: auto;
		max-width: 48rem;
		row-gap: 1rem;
	}

	h2,
	h3 {
		text-align: center;
	}

	h2 {
		font-size: 2.25rem;
	}

	h3 {
		font-size: 1.5rem;
	}

	.infos-ingredients {
		column-gap: 2rem;
		display: flex;
	}

	.infos,
	.ingredients {
		flex: 1 1 0%;
	}

	table,
	th,
	td {
		border: 1px solid var(--stroke);
	}

	table {
		width: 100%;
	}

	td {
		text-align: center;
	}

	.ingredients ul {
		list-style: disc inside;
	}

	ol {
		list-style: decimal inside;
	}
</style>
