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
		<h5>Meal type</h5>
		<div>
			<input
				type="checkbox"
				id="meal-type-breakfast"
				name="meal-type"
				value="breakfast"
				bind:group={mealTypes}
			/>
			<label for="meal-type-breakfast">Breakfast</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="meal-type-lunch"
				name="meal-type"
				value="lunch"
				bind:group={mealTypes}
			/>
			<label for="meal-type-lunch">Lunch</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="meal-type-tea"
				name="meal-type"
				value="tea"
				bind:group={mealTypes}
			/>
			<label for="meal-type-tea">Tea</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="meal-type-dinner"
				name="meal-type"
				value="dinner"
				bind:group={mealTypes}
			/>
			<label for="meal-type-dinner">Dinner</label>
		</div>
	</div>
	<div>
		<h5>Difficulty</h5>
		<div>
			<input
				type="checkbox"
				id="difficulty-easy"
				name="difficulty"
				value="easy"
				bind:group={difficulties}
			/>
			<label for="difficulty-easy">Easy</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="difficulty-medium"
				name="difficulty"
				value="medium"
				bind:group={difficulties}
			/>
			<label for="difficulty-medium">Medium</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="difficulty-hard"
				name="difficulty"
				value="hard"
				bind:group={difficulties}
			/>
			<label for="difficulty-hard">Hard</label>
		</div>
	</div>
	<div>
		<h5>Cooking time</h5>
		<div>
			<input
				type="checkbox"
				id="cooking-time-short"
				name="cooking-time"
				value="short"
				bind:group={cookingTimes}
			/>
			<label for="cooking-time-short">Short</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="cooking-time-medium"
				name="cooking-time"
				value="medium"
				bind:group={cookingTimes}
			/>
			<label for="cooking-time-medium">Medium</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="cooking-time-long"
				name="cooking-time"
				value="long"
				bind:group={cookingTimes}
			/>
			<label for="cooking-time-long">Long</label>
		</div>
	</div>
	<div>
		<h5>Dietary practice</h5>
		<div>
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

	aside h5 {
		color: var(--on-surface);
		font-weight: 700;
	}

	aside label {
		color: var(--on-surface-alt);
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
