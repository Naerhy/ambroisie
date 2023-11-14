<script lang="ts">
	import type { RecipeFN } from "../types";
	import { createEventDispatcher } from "svelte";
	import RecipeCard from "./RecipeCard.svelte";

	export let recipes: RecipeFN[];

	const dispatch = createEventDispatcher();

	let filter = "";
	let mealTypes: string[] = ["breakfast", "lunch", "tea", "dinner"];
	let difficulties: string[] = ["easy", "medium", "hard"];
	let cookingTimes: string[] = ["short", "medium", "long"];
	let vegetarian = false;

	function clickRecipe(recipe: RecipeFN): void {
		if (recipe.homemade) {
			dispatch("clickrecipe", { recipe });
		}
	}
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
	<ul>
		{#each recipes as recipe}
		{@const isVisible = recipe.title.toLowerCase().includes(filter)
			&& recipe.mealTypes.some((mealType) => mealTypes.includes(mealType))
			&& difficulties.includes(recipe.difficulty)
			&& cookingTimes.includes(recipe.cookingTime)
			&& (!vegetarian || recipe.vegetarian)
		}
		<RecipeCard {recipe} {isVisible} on:click={() => clickRecipe(recipe)} />
		{/each}
	</ul>
</section>

<style>
	aside {
		background-color: var(--surface-raised);
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		row-gap: 1rem;
	}

	aside h4 {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	.checkbox {
		margin-left: 0.5rem;
	}

	input[type=text] {
		background-color: var(--surface-default);
		border: 1px solid var(--stroke);
		border-radius: 0.375rem;
		padding: 0.5rem;
	}

	input[type=text]::placeholder {
		color: var(--text-subtle);
	}

	input[type=text]:focus {
		outline: 2px solid var(--highlight);
	}

	section {
		flex: 1 1 auto;
	}

	ul {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(4, minmax(100px, 1fr));
	}
</style>
