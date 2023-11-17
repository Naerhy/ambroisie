<script lang="ts">
	import type { RecipeFN } from "../types";

	export let recipe: RecipeFN;

	let imgUrl = new URL(`../assets/images/${recipe.filename}.png`, import.meta.url).href;

	function handleError(): void {
		imgUrl = new URL("../assets/images/no-image.jpg", import.meta.url).href;
	}
</script>

<div class="overlay">
	<div class="content">
		<button type="button" on:click>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
		</button>
		<h2>{recipe.title}</h2>
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
				{recipe.vegetarian ? "yes" : "no"}
			</li>
			<li>
				<span>Servings:</span>
				{recipe.servings.toString()}
			</li>
		</ul>
		<div class="photo">
			<img src={imgUrl} alt="Recipe" on:error={handleError} />
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
</div>

<style>
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
		background-color: var(--surface-default);
		border-radius: 0.25rem;
		display: grid;
		gap: 1.5rem;
		grid-template-areas:
			"title title"
			"infos infos"
			"photo ingredients"
			"directions directions";
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, auto);
		max-height: 85%;
		overflow-y: auto;
		padding: 1.5rem;
		position: relative;
		width: 50%;
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
		background-color: var(--surface-raised);
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

	button {
		position: absolute;
		right: 4px;
		top: 4px;
	}
</style>