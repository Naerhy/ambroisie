<script lang="ts">
	import type { RecipeFN } from "../types";
	import { createEventDispatcher } from "svelte";
	import RecipeCard from "./RecipeCard.svelte";
	import GroupCheckboxes from "./GroupCheckboxes.svelte";

	export let recipes: RecipeFN[];

	const dispatch = createEventDispatcher();

	let filter = "";
	let mealTypes = ["breakfast", "lunch", "tea", "dinner"];
	let difficulties = ["easy", "medium", "hard"];
	let cookingTimes = ["short", "medium", "long"];
	let vegetarian = false;

	function clickRecipe(recipe: RecipeFN): void {
		if (recipe.homemade) {
			dispatch("clickrecipe", { recipe });
		}
	}
</script>

<main>
	<aside>
		<input type="text" placeholder="Filter by name..." bind:value={filter} />
		<div>
			<GroupCheckboxes
				title="Meal type"
				name="meal-type"
				values={["breakfast", "lunch", "tea", "dinner"]}
				bind:groupValues={mealTypes}
			/>
		</div>
		<div>
			<GroupCheckboxes
				title="Difficulty"
				name="difficulty"
				values={["easy", "medium", "hard"]}
				bind:groupValues={difficulties}
			/>
		</div>
		<div>
			<GroupCheckboxes
				title="Cooking time"
				name="cooking-time"
				values={["short", "medium", "long"]}
				bind:groupValues={cookingTimes}
			/>
		</div>
		<div>
			<div class="title">Dietary practice</div>
			<div>
				<input type="checkbox" id="vegetarian" bind:checked={vegetarian} />
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
</main>

<style>
	main {
		align-items: flex-start;
		column-gap: 2rem;
		display: flex;
		margin: auto;
		width: 80%;
	}

	aside {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		row-gap: 1rem;
	}

	input[type=text] {
		background-color: var(--background-dark);
		border: 1px solid var(--stroke);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
	}

	input[type=text]::placeholder {
		color: var(--text-subtle);
	}

	input[type=text]:focus {
		outline: 2px solid var(--highlight);
	}

	.title {
		font-weight: 700;
	}

	section {
		flex: 1 1 auto;
	}

	ul {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(4, minmax(150px, 1fr));
	}
</style>
