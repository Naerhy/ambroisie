<script lang="ts">
	import axios from "axios";
	import Button from "./Button.svelte";
	import GroupCheckboxes from "./GroupCheckboxes.svelte";
	import type { Recipe } from "../types";

	export let recipes: Recipe[];

	let name = "";
	let difficulty = "easy";
	let cookingTime = "short";
	let mealTypes: string[] = [];
	let servings = "0";
	let image: FileList | undefined = undefined;
	let homemade = false;
	let vegetarian = false;
	let ingredients = "";
	let directions = "";
	let secretCodeAdd = "";

	let successMsgAdd = "";
	let errorMsgAdd = "";

	let selectedRecipe: Recipe | undefined = undefined;
	let secretCodeRemove = "";

	let successMsgRemove = "";
	let errorMsgRemove = "";

	async function handleSubmitAdd(): Promise<void> {
		if (image !== undefined && image.length > 0) {
			try {
				const imageBase64 = await imageToBase64(image.item(0)!);
				if (typeof imageBase64 === "string") {
					const _data = {
						name,
						imageBase64,
						isHomemade: homemade,
						mealTypes,
						difficulty,
						cookingTime,
						isVegetarian: vegetarian,
						servings: Number(servings),
						ingredients: ingredients === "" ? [] : ingredients.split("\n"),
						directions: directions === "" ? [] : directions.split("\n"),
						secretCode: Number(secretCodeAdd)
					};
					const { data: recipe } = await axios.post("http://localhost:3000/recipes", _data);
					recipes = [recipe, ...recipes];
					successMsgAdd = `Recipe ${recipe.name} (#${recipe.id}) has been successfully added!`;
				} else {
					throw new Error("type of image base64 is not valid");
				}
			} catch (error: unknown) {
				// pass error message to errorMsg variable
				if (axios.isAxiosError(error)) {
					if (error.response?.data) {
						errorMsgAdd = error.response.data.message;
					} else {
						errorMsgAdd = `axios: ${error.message}`;
					}
				} else {
					// TODO: check if error has generic string message first
					console.log("unexpected error");
				}
			}
		}
	}

	async function handleSubmitRemove(): Promise<void> {
		if (selectedRecipe) {
			try {
				const res = await axios.delete(`http://localhost:3000/recipes/${selectedRecipe.id}`, {
					data: {
						secretCode: Number(secretCodeRemove)
					}
				});
				recipes = recipes.filter((recipe) => recipe.id !== selectedRecipe?.id);
				successMsgRemove = "recipe has been succesfully deleted";
			} catch (error: unknown) {
				// pass error message to errorMsg variable
				if (axios.isAxiosError(error)) {
					if (error.response?.data) {
						errorMsgRemove = error.response.data.message;
					} else {
						errorMsgRemove = `axios: ${error.message}`;
					}
				} else {
					// TODO: check if error has generic string message first
					console.log("unexpected error");
				}
			}
		}
	}

	function imageToBase64(file: File): Promise<string | ArrayBuffer | null> {
		return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	}
</script>

<main>
	<section>
		<div>
			<h2>Add a recipe</h2>
			<form on:submit|preventDefault={handleSubmitAdd}>
				<div class="flex">
					<label for="rf-name" class="bold">Name</label>
					<input type="text" id="rf-name" bind:value={name} required />
				</div>
				<div class="flex">
					<label for="rf-difficulty" class="bold">Difficulty</label>
					<select id="rf-difficulty" bind:value={difficulty}>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
				</div>
				<div class="flex">
					<label for="rf-cooking-time" class="bold">Cooking time</label>
					<select id="rf-cooking-time" bind:value={cookingTime}>
						<option value="short">Short</option>
						<option value="medium">Medium</option>
						<option value="long">Long</option>
					</select>
				</div>
				<div>
					<GroupCheckboxes
						title="Meal type"
						name="meal-type"
						values={["breakfast", "lunch", "tea", "dinner"]}
						bind:groupValues={mealTypes}
					/>
				</div>
				<div class="flex">
					<label for="rf-servings" class="bold">Servings</label>
					<select id="rf-servings" bind:value={servings}>
						{#each ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as nb}
						<option value={nb}>{nb}</option>
						{/each}
					</select>
				</div>
				<div class="flex">
					<label for="rf-image" class="bold">Image</label>
					<input type="file" id="rf-image" accept="image/png,image/jpeg" bind:files={image} required />
				</div>
				<div>
					<input type="checkbox" id="rf-homemade" bind:checked={homemade} />
					<label for="rf-homemade">Homemade</label>
				</div>
				<div>
					<input type="checkbox" id="rf-vegetarian" bind:checked={vegetarian} />
					<label for="rf-vegetarian">Suitable for vegetarians</label>
				</div>
				<div class="flex">
					<label for="rf-ingredients" class="bold">Ingredients</label>
					<textarea id="rf-ingredients" bind:value={ingredients} rows="6" />
				</div>
				<div class="flex">
					<label for="rf-directions" class="bold">Directions</label>
					<textarea id="rf-directions" bind:value={directions} rows="6" />
				</div>
				<div class="flex">
					<label for="rf-secret-code-add" class="bold">Secret code</label>
					<input type="password" id="rf-secret-code-add" bind:value={secretCodeAdd} required />
				</div>
				{#if successMsgAdd}
				<p class="success-msg">{successMsgAdd}</p>
				{/if}
				{#if errorMsgAdd}
				<p class="error-msg">{errorMsgAdd}</p>
				{/if}
				<Button>Add</Button>
			</form>
		</div>
		<div>
			<h2>Remove a recipe</h2>
			<form on:submit|preventDefault={handleSubmitRemove}>
				<div class="flex">
					<label for="rf-recipe" class="bold">Select recipe</label>
					<select id="rf-recipe" bind:value={selectedRecipe}>
						{#each recipes as recipe}
						<option value={recipe}>{recipe.name}</option>
						{/each}
					</select>
				</div>
				<div class="flex">
					<label for="rf-secret-code-remove" class="bold">Secret code</label>
					<input type="password" id="rf-secret-code-remove" bind:value={secretCodeRemove} required />
				</div>
				{#if successMsgRemove}
				<p class="success-msg">{successMsgRemove}</p>
				{/if}
				{#if errorMsgRemove}
				<p class="error-msg">{errorMsgRemove}</p>
				{/if}
				<Button>Remove</Button>
			</form>
		</div>
	</section>
</main>

<style>
	section {
		align-items: flex-start;
		display: flex;
		column-gap: 2rem;
		justify-content: center;
	}

	section > div {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		flex: 0 0 500px;
		padding: 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.bold {
		font-weight: 700;
	}

	.flex {
		display: flex;
		flex-direction: column;
	}

	input[type=text], input[type=password], textarea, select {
		border: 1px solid var(--stroke);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
	}

	input[type=text], input[type=password], textarea {
		background-color: var(--background-dark);
	}

	textarea {
		resize: none;
	}

	input[type=text]:focus, input[type=password]:focus, textarea:focus {
		outline: 2px solid var(--highlight);
	}

	.success-msg {
		background-color: #dcfff1;
		border: 1px solid #22a06b;
		padding: 0.75rem;
	}

	.error-msg {
		background-color: #ffeceb;
		border: 1px solid #e2483d;
		padding: 0.75rem;
	}
</style>
