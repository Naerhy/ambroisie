<script lang="ts">
	import type { Recipe } from "../types";
	import Modal from "./Modal.svelte";

	export let recipe: Recipe;

	let imgSrc = recipe.imageBase64;

	function handleError(): void {
		imgSrc = new URL("../../assets/no-image.png", import.meta.url).href;
	}
</script>

<Modal on:click>
	<div class="recipe">
		<h2>{recipe.name}</h2>
		<ul class="infos">
			<li>
				<span>Meal types</span>
				{recipe.mealTypes.join(", ")}
			</li>
			<li>
				<span>Difficulty</span>
				{recipe.difficulty}
			</li>
			<li>
				<span>Cooking time</span>
				{recipe.cookingTime}
			</li>
			<li>
				<span>Vegetarian</span>
				{recipe.isVegetarian ? "yes" : "no"}
			</li>
			<li>
				<span>Servings</span>
				{recipe.servings.toString()}
			</li>
		</ul>
		<div class="image">
			<!-- TODO: add on:error to load placeholder on error -->
			<img src={imgSrc} alt="Recipe" on:error={handleError} />
		</div>
		<div class="ingredients">
			<h3>Ingredients</h3>
			{#if recipe.ingredients.length === 0}
			<p>No ingredients have been added to the recipe.</p>
			{:else}
			<ul>
				{#each recipe.ingredients as ingredient}
				<li>{ingredient}</li>
				{/each}
			</ul>
			{/if}
		</div>
		<div class="directions">
			<h3>Directions</h3>
			{#if recipe.directions.length === 0}
			<p>No directions have been added to the recipe.</p>
			{:else}
			<ol>
				{#each recipe.directions as direction}
				<li>{direction}</li>
				{/each}
			</ol>
			{/if}
		</div>
	</div>
</Modal>

<style>
	.recipe {
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