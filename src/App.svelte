<script lang="ts">
	import Footer from "./components/Footer.svelte";
	import RecipeCard from "./components/RecipeCard.svelte";
	import type { Recipe } from "./interfaces";

	let recipes: Recipe[] = [];
	let recipesShown = false;

	async function loadFiles(): Promise<void> {
		// TODO: wrap into a try/catch?
		const files = import.meta.glob("./data/*.json");
		const _recipes: Recipe[] = [];
		for (const path in files) {
			const recipe: Recipe = (await files[path]()).default;
			_recipes.push(recipe);
		}
		recipes = _recipes;
		recipesShown = true;
	}
</script>

<main>
	<h1>Ambroisie</h1>
	<p>
		Bienvenue sur cette encyclopedie de recettes, ou vous pourrez retrouver un tas d'idees pour vos
		prochains repas, en fonction de nombreux criteres que vous pourrez definir.
	</p>
	{#if recipesShown}
		<input type="text" />
		<button type="button">Filter</button>
		{#if recipes.length === 0}
			<p>No recipe to display...</p>
		{:else}
		<ul>
			{#each recipes as recipe}
				<RecipeCard {recipe} />
			{/each}
		</ul>
		{/if}
	{:else}
		<button type="button" on:click={loadFiles}>Load recipes</button>
	{/if}
</main>
<Footer />

<style>
	:global(:root) {
		--surface: #212121;
		--surface-l15: #303030;
		--on-surface: #f5f5f5;
		--on-surface-alt: #bdbdbd;
		--highlight: #ef6c00;
		--highlight-d15: #e05d00;
		--on-highlight: #212121;
	}

	:global(#app) {
		background-color: var(--surface);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1 1 auto;
	}

	ul {
		display: flex;
	}
</style>
