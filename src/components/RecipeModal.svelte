<script lang="ts">
	import type { Recipe } from "../interfaces";

	export let recipe: Recipe;

	let imgUrl = new URL(`../assets/images/${recipe.filename}.png`, import.meta.url).href;
</script>

<div class="overlay">
	<div class="content">
		<button type="button" on:click>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
		</button>
		<div class="header">
			<div class="photo">
				<img src={imgUrl} alt="Recipe" />
			</div>
			<div class="info">
				<h3>{recipe.title}</h3>
				<div class="recap">
					<p>Meal types: {recipe.mealTypes.join(", ")}</p>
					<p>Difficulty: {recipe.difficulty}</p>
					<p>Cooking time: {recipe.cookingTime}</p>
					<p>Vegetarian: {recipe.vegetarian ? "yes" : "no"}</p>
					<p>Servings: {recipe.servings.toString()}</p>
				</div>
				<ul>
					{#each recipe.ingredients as ingredient}
					<li>{ingredient}</li>
					{/each}
				</ul>
			</div>
		</div>
		<ol>
			{#each recipe.directions as direction}
			<li>{direction}</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	.overlay {
		align-items: center;
		background-color: rgba(0, 0, 0, 0.75);
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
		background-color: var(--surface);
		border: 1px solid var(--highlight);
		max-height: 80%;
		overflow-y: auto;
		padding: 1.5rem;
		position: relative;
		width: 50%;
		color: var(--on-surface-alt);
	}

	svg {
		color: var(--on-surface);
	}

	.header {
		column-gap: 1rem;
		display: flex;
	}

	.header > div {
		flex: 1 1 0%;
	}

	.info {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	.recap {
		border: 1px solid var(--highlight);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		padding: 0.5rem;
	}

	.recap p:nth-child(1) {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
	}

	.recap p:nth-child(2) {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}

	.recap p:nth-child(3) {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
	}

	.recap p:nth-child(4) {
		grid-column: 1 / 2;
		grid-row: 3 / 4;
	}

	.recap p:nth-child(5) {
		grid-column: 2 / 3;
		grid-row: 3 / 4;
	}

	.photo {
		border: 1px solid var(--highlight);
	}

	h3 {
		color: var(--on-surface);
		font-weight: 700;
	}

	ul {
		list-style: disc inside;
	}

	ol {
		list-style: decimal inside;
		margin-top: 1rem;
	}

	button {
		position: absolute;
		right: 4px;
		top: 4px;
	}
</style>