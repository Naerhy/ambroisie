<script lang="ts">
	import type { Recipe } from "../interfaces";
	import RecipeCard from "./RecipeCard.svelte";
    import RecipeModal from "./RecipeModal.svelte";

	export let recipes: Recipe[];

	let filter = "";
	let mealTypes: string[] = ["breakfast", "lunch", "tea", "dinner"];
	let difficulties: string[] = ["easy", "medium", "hard"];
	let cookingTimes: string[] = ["short", "medium", "long"];
	let vegetarian = false;

	let focusedRecipeId = -1;
</script>

<aside>
	<input type="text" placeholder="Filter..." bind:value={filter} />
	<div>
		<h4>Meal type</h4>
		{#each ["breakfast", "lunch", "tea", "dinner"] as mealType}
		<div class="checkbox">
			<input
				type="checkbox"
				id={`meal-type-${mealType}`}
				name="meal-type"
				value={mealType}
				bind:group={mealTypes}
			/>
			<label for={`meal-type-${mealType}`}>
				{mealType.charAt(0).toUpperCase() + mealType.slice(1)}
			</label>
		</div>
		{/each}
	</div>
	<div>
		<h4>Difficulty</h4>
		{#each ["easy", "medium", "hard"] as difficulty}
		<div class="checkbox">
			<input
				type="checkbox"
				id={`difficulty-${difficulty}`}
				name="difficulty"
				value={difficulty}
				bind:group={difficulties}
			/>
			<label for={`difficulty-${difficulty}`}>
				{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
			</label>
		</div>
		{/each}
	</div>
	<div>
		<h4>Cooking time</h4>
		{#each ["short", "medium", "long"] as cookingTime}
		<div class="checkbox">
			<input
				type="checkbox"
				id={`cooking-time-${cookingTime}`}
				name="cooking-time"
				value={cookingTime}
				bind:group={cookingTimes}
			/>
			<label for={`cooking-time-${cookingTime}`}>
				{cookingTime.charAt(0).toUpperCase() + cookingTime.slice(1)}
			</label>
		</div>
		{/each}
	</div>
	<div>
		<h4>Dietary practice</h4>
		<div class="checkbox">
			<input type="checkbox" id="vegetarian" name="vegetarian" bind:checked={vegetarian} />
			<label for="vegetarian">Vegetarianism</label>
		</div>
	</div>
</aside>
<section>
	{#if focusedRecipeId !== -1}
	<RecipeModal recipe={recipes[focusedRecipeId]} on:click={() => focusedRecipeId = -1} />
	{/if}
	{#if recipes.length === 0}
	<p>No recipe to display...</p>
	{:else}
	<ul>
		{#each recipes as recipe, index}
		{@const isVisible = recipe.title.toLowerCase().includes(filter)
			&& recipe.mealTypes.some((mealType) => mealTypes.includes(mealType))
			&& difficulties.includes(recipe.difficulty)
			&& cookingTimes.includes(recipe.cookingTime)
			&& (!vegetarian || recipe.vegetarian)
		}
		<RecipeCard {recipe} {isVisible} on:click={() => focusedRecipeId = index} />
		{/each}
	</ul>
	{/if}
</section>

<style>
	aside {
		border: 1px solid var(--highlight);
		display: flex;
		flex-direction: column;
		padding: 1rem;
		row-gap: 1rem;
	}

	aside h4 {
		color: var(--on-surface);
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 1.75rem;
	}

	aside label {
		color: var(--on-surface-alt);
	}

	.checkbox {
		margin-left: 0.5rem;
	}

	input[type=text] {
		background-color: var(--surface-l15);
		border-radius: 0.375rem;
		color: var(--on-surface);
		outline: none;
		padding: 0.5rem;
	}

	input[type=text]::placeholder {
		color: var(--on-surface-alt);
	}

	input[type=text]:focus {
		outline: 2px solid var(--highlight);
	}

	section {
		flex: 1 1 auto;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
</style>
