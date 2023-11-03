<script lang="ts">
	import type { Recipe } from "../interfaces";
	import RecipeCard from "./RecipeCard.svelte";

	export let recipes: Recipe[];
</script>

<input type="text" />
<button type="button">Filter</button>
{#if recipes.length === 0}
<p>No recipe to display...</p>
{:else}
<ul>
	{#each recipes as recipe}
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	<RecipeCard {recipe} />
	{/each}
</ul>
{/if}

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		padding: 4rem;
	}
</style>
