<script lang="ts">
	import type { Recipe } from "./interfaces";
	import Footer from "./components/Footer.svelte";
	import RecipesList from "./components/RecipesList.svelte";
	import Button from "./components/Button.svelte";

	async function loadFiles(): Promise<Recipe[]> {
		// no need to wrap into try/catch because Svelte already wraps it when
		// calling it from html
		const files = import.meta.glob("./data/*.json");
		const recipes: Recipe[] = [];
		for (const path in files) {
			const recipe: Recipe = {
				filename: path.replace("./data/", "").replace(".json", ""),
				...(await files[path]()).default
			};
			recipes.push(recipe);
		}
		return recipes;
	}
</script>

<header>
	<h1>Ambroisie</h1>
</header>
{#await loadFiles() then recipes}
<main class="loaded">
	<RecipesList {recipes} />
</main>
{:catch error}
{@const errMsg = (error instanceof Error && error.message) ? error.message : "unexpected error"}
<main class="error">
	<section>
		<h2>Oops!</h2>
		<p>
			The website encountered an error while trying to load the recipes.<br>
			Reason: {errMsg}.
		</p>
		<Button type="button" on:click={() => location.reload()}>Reload</Button>
	</section>
</main>
{/await}
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
		row-gap: 2rem;
		width: 80%;
	}
	header {
		border-bottom: 1px solid var(--highlight);
	}

	header h1 {
		color: var(--on-surface);
		font-size: 3.75rem;
		font-weight: 700;
		line-height: 1;
	}

	main {
		flex: 1 1 auto;
	}

	.loaded {
		align-items: flex-start;
		display: flex;
	}

	.error {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.error section {
		border: 1px solid var(--highlight);
		border-radius: 0.375rem;
		color: var(--on-surface);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		row-gap: 1rem;
	}

	.error h2 {
		font-size: 2.25rem;
		font-weight: 700;
		line-height: 2.5rem;
		text-align: center;
	}
</style>
