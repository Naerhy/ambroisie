<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { Meal } from '../types';
	import { difficulties, cookingTimes, capitalize, typesFR } from "../constants";

	interface Infos {
		title: string;
		value: string;
	}

	const props = defineProps<{ meal: Meal }>();

	const emit = defineEmits<{ (e: "modalClose"): void }>();

	const infos = computed<Infos[]>(() => {
		return [
			{ title: "Types", value: props.meal.types.map((_type, i) => capitalize(typesFR[i])).join(" | ") },
			{ title: "Difficulté", value: capitalize(difficulties[props.meal.difficulty - 1]) },
			{ title: "Temps de préparation", value: capitalize(cookingTimes[props.meal.cookingTime - 1]) },
			{ title: "Végétarisme", value: props.meal.isVegetarian ? "🟢" : "🔴" },
			{ title: "Nombre de parts", value: props.meal.isRecipe ? props.meal.servings.toString() : "-" }
		];
	});

	const imgSrc = ref<string>(props.meal.imageBase64);

	function handleError(): void {
		imgSrc.value = new URL("../../assets/no-image.png", import.meta.url).href;
	}
</script>

<template>
	<div class="overlay">
		<div class="content">
			<button type="button" @click="emit('modalClose')">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
			</button>
			<article>
				<h2>{{ meal.name }}</h2>
				<ul class="infos">
					<li v-for="info in infos">
						<span>{{ info.title }}</span>
						{{ info.value }}
					</li>
				</ul>
				<div class="image">
					<img :src="imgSrc" alt="Repas" @error="handleError()" />
				</div>
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
		</div>
	</div>
</template>

<style scoped>
	.overlay {
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	.content {
		background-color: var(--background);
		border-radius: 0.25rem;
		max-height: 90%;
		overflow-y: auto;
		padding: 1.5rem;
		position: relative;
		width: 40%;
	}

	button {
		position: absolute;
		right: 4px;
		top: 4px;
	}

	article {
		display: grid;
		gap: 1.5rem;
		grid-template-areas:
			"name name"
			"infos infos"
			"photo ingredients"
			"directions directions";
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, auto);
	}

	h2 {
		grid-area: name;
		font-size: 2.25rem;
		line-height: 2.5rem;
		text-align: center;
	}

	h3 {
		font-size: 1.5rem;
		line-height: 2rem;
	}

	.infos {
		column-gap: 0.25rem;
		display: flex;
		grid-area: infos;
		justify-content: center;
	}

	.infos li {
		border: 1px solid var(--stroke);
		font-size: 0.875rem;
		line-height: 1.25rem;
		padding: 0.25rem 0.5rem;
		text-align: center;
	}

	span {
		display: block;
		font-weight: 700;
	}

	.image {
		grid-area: photo;
	}

	img {
		height: 100%;
		object-fit: cover;
	}

	.ingredients {
		grid-area: ingredients;
	}

	.ingredients ul {
		list-style: disc inside;
	}

	.directions {
		grid-area: directions;
	}

	ol {
		list-style: decimal inside;
	}
</style>
