<script lang="ts">
	import '@fontsource-variable/inter';
	import { parseJsonRecipe } from "./validate";
	import type { RecipeFN } from "./types";
	import Footer from "./components/Footer.svelte";
	import RecipesList from "./components/RecipesList.svelte";
	import Button from "./components/Button.svelte";
	import FocusedRecipe from "./components/FocusedRecipe.svelte";
	import Header from "./components/Header.svelte";

	let focusedRecipeId: RecipeFN | null = null;

	async function loadFiles(): Promise<RecipeFN[]> {
		// no need to wrap into try/catch because Svelte already wraps it when
		// calling it from html
		const files = import.meta.glob("./data/*.json");
		const recipes: RecipeFN[] = [];
		for (const path in files) {
			const filename = path.replace("./data/", "").replace(".json", "");
			const recipe = parseJsonRecipe((await files[path]()).default);
			if (recipe !== null) {
				recipes.push({ filename, ...recipe });
			} else {
				console.warn(`Unable to parse recipe: ${filename}`);
			}
		}
		return recipes;
	}

	function handleClickRecipe(event: any): void {
		focusedRecipeId = event.detail.recipe;
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.code === "Escape" && focusedRecipeId !== null) {
			focusedRecipeId = null;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if focusedRecipeId !== null}
<FocusedRecipe recipe={focusedRecipeId} on:click={() => focusedRecipeId = null} />
{/if}
<Header />
{#await loadFiles() then recipes}
<main class="loaded">
	<RecipesList {recipes} on:clickrecipe={handleClickRecipe} />
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
		--background: #eeeeee;
		--background-dark: #e0e0e0;
		--stroke: #bdbdbd;
		--highlight: #3f51b5;
		--highlight-dark: #3949ab;
		--text-default: #212121;
		--text-subtle: #757575;
		--text-highlight: #f5f5f5;
		background-color: var(--background);
		color: var(--text-default);
		font-family: "Inter Variable", Arial;
	}

	:global(#app) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		row-gap: 2rem;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-weight: 700;
	}

	main {
		flex: 1 1 auto;
	}

	.loaded {
		align-items: flex-start;
		column-gap: 2rem;
		display: flex;
		margin: auto;
		width: 80%;
	}

	.error {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.error section {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		row-gap: 1rem;
	}

	.error h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		text-align: center;
	}
</style>
