<script lang="ts">
	import type { Recipe } from "./interfaces";
	import Footer from "./components/Footer.svelte";
	import RecipesList from "./components/RecipesList.svelte";
	import Button from "./components/Button.svelte";

	let recipes: Recipe[] = [];
	let recipesShown = false;

	async function loadFiles(): Promise<void> {
		// TODO: wrap into a try/catch?
		const files = import.meta.glob("./data/*.json");
		const _recipes: Recipe[] = [];
		for (const path in files) {
			const recipe: Recipe = {
				filename: path.replace("./data/", "").replace(".json", ""),
				...(await files[path]()).default
			};
			_recipes.push(recipe);
		}
		recipes = _recipes;
		recipesShown = true;
	}
</script>

<header>
	<h1>Ambroisie</h1>
	<p>
		Bienvenue sur cette <span>encyclopedie de recettes</span>, ou vous pourrez retrouver un tas d'idees pour vos
		prochains repas, en fonction de nombreux criteres que vous pourrez definir.
	</p>
</header>
<main>
	{#if recipesShown}
	<RecipesList {recipes} />
	{:else}
	<div class="btn-recipes">
		<Button type="button" on:click={loadFiles}>Load recipes</Button>
	</div>
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
		background-color: var(--surface);
	}

	:global(#app) {
		display: flex;
		flex-direction: column;
		margin: auto;
		min-height: 100vh;
		width: 80%;
	}

	header {
		padding: 3rem 0;
		text-align: center;
	}

	header h1 {
		color: var(--on-surface);
		font-size: 3.75rem;
		font-weight: 700;
		line-height: 1;
	}

	header p {
		color: var(--on-surface-alt);
	}

	span {
		color: var(--highlight);
	}

	main {
		align-items: flex-start;
		display: flex;
		flex: 1 1 auto;
	}

	.btn-recipes {
		display: flex;
		justify-content: center;
	}
</style>
