<script lang="ts">
	import axios from "axios";
	import '@fontsource-variable/inter';
	import type { Recipe } from "./types";
	import Footer from "./components/Footer.svelte";
	import RecipesList from "./components/RecipesList.svelte";
	import Button from "./components/Button.svelte";
	import FocusedRecipe from "./components/FocusedRecipe.svelte";
	import Header from "./components/Header.svelte";
	import RecipeForm from './components/RecipeForm.svelte';

	let currentPage: "home" | "form" = "home";
	let focusedRecipe: Recipe | null = null;
	let recipes: Recipe[] = [];

	async function loadRecipes(): Promise<void> {
		// no need to wrap into try/catch because Svelte already wraps it when
		// calling it from html
		const { data: _recipes } = await axios.get<Recipe[]>("http://localhost:3000/recipes");
		recipes = _recipes;
	}

	function handleClickRecipe(event: any): void {
		focusedRecipe = event.detail.recipe;
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.code === "Escape" && focusedRecipe !== null) {
			focusedRecipe = null;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if focusedRecipe !== null}
<FocusedRecipe recipe={focusedRecipe} on:click={() => focusedRecipe = null} />
{/if}
<Header bind:currentPage />
{#await loadRecipes() then}
{#if currentPage === "home"}
<RecipesList recipes={[...recipes]} on:clickrecipe={handleClickRecipe} />
{:else}
<RecipeForm bind:recipes />
{/if}
{:catch error}
{@const errMsg = (error instanceof Error && error.message) ? error.message : "unexpected error"}
<main>
	<div>
		<h2>Oops!</h2>
		<p>
			The website encountered an error while trying to load the recipes.<br>
			Reason: {errMsg}.
		</p>
		<Button type="button" on:click={() => location.reload()}>Reload</Button>
	</div>
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

	:global(main) {
		flex: 1 1 auto;
	}

	main {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	main div {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		row-gap: 1rem;
	}

	main h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		text-align: center;
	}
</style>
