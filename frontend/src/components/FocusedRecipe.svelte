<script lang="ts">
	import type { Recipe } from "../types";
	import Modal from "./Modal.svelte";

	export let recipe: Recipe;
</script>

<Modal on:click>
	<div class="recipe">
		<h2>{recipe.name}</h2>
		<ul class="infos">
			<li>
				<span>Meal types:</span>
				{recipe.mealTypes.join(", ")}
			</li>
			<li>
				<span>Difficulty:</span>
				{recipe.difficulty}
			</li>
			<li>
				<span>Cooking time:</span>
				{recipe.cookingTime}
			</li>
			<li>
				<span>Vegetarian:</span>
				{recipe.isVegetarian ? "yes" : "no"}
			</li>
			<li>
				<span>Servings:</span>
				{recipe.servings.toString()}
			</li>
		</ul>
		<div class="photo">
			<!-- TODO: add on:error to load placeholder on error -->
			<img src={recipe.imageBase64} alt="Recipe" />
		</div>
		<div class="ingredients">
			<h3>Ingredients</h3>
			<ul>
				{#each recipe.ingredients as ingredient}
				<li>{ingredient}</li>
				{/each}
			</ul>
		</div>
		<div class="directions">
			<h3>Directions</h3>
			<ol>
				{#each recipe.directions as direction}
				<li>{direction}</li>
				{/each}
			</ol>
		</div>
	</div>
</Modal>

<style>
	.recipe {
		display: grid;
		gap: 1.5rem;
		grid-template-areas:
			"title title"
			"infos infos"
			"photo ingredients"
			"directions directions";
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, auto);
	}

	h2 {
		grid-area: title;
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

	.photo {
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