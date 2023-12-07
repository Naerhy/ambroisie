<script lang="ts">
	import axios from "axios";
	import type { Recipe } from "../types";
	import Form from "./Form.svelte";
	import GroupCheckboxes from "./GroupCheckboxes.svelte";

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

	let selectedRecipe: Recipe | undefined = undefined;

	let secretCodes = ["", ""];

	let successMsgs = ["", ""];
	let errorMsgs = ["", ""];

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
						secretCode: Number(secretCodes[0])
					};
					const { data: recipe } = await axios.post("http://localhost:8080/api/recipes", _data);
					recipes = [recipe, ...recipes];
					errorMsgs[0] = "";
					successMsgs[0] = `Recipe "${recipe.name}" has been successfully added!`;
					name = "";
					difficulty = "easy";
					cookingTime = "short";
					mealTypes = [];
					servings = "0";
					image = undefined;
					homemade = false;
					vegetarian = false;
					ingredients = "";
					directions = "";
					secretCodes[0] = "";
				} else {
					throw new Error("type of image base64 is not valid");
				}
			} catch (error: unknown) {
				displayErrorMsg(error, 0);
			}
		}
	}

	async function handleSubmitRemove(): Promise<void> {
		try {
			if (!selectedRecipe) {
				throw new Error("No selected recipe");
			}
			await axios.delete(`http://localhost:8080/api/recipes/${selectedRecipe.id}`, {
				data: { secretCode: Number(secretCodes[1]) }
			});
			recipes = recipes.filter((recipe) => recipe.id !== selectedRecipe?.id);
			errorMsgs[1] = "";
			successMsgs[1] = `recipe "${selectedRecipe.name}" has been succesfully deleted`;
			selectedRecipe = undefined;
			secretCodes[1] = "";
		} catch (error: unknown) {
			displayErrorMsg(error, 1);
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

	function displayErrorMsg(error: unknown, index: number): void {
		successMsgs[index] = "";
		if (axios.isAxiosError(error)) {
			errorMsgs[index] = error.response?.data ? error.response.data.message : `axios: ${error.message}`;
		} else if (error instanceof Error) {
			errorMsgs[index] = error.message;
		} else {
			// TODO: check if error has generic string message first
			errorMsgs[index] = "unexpected error";
		}
	}
</script>

<main>
	<section>
		<div>
			<Form
				title="Add a recipe"
				btnText="Add"
				successMsg={successMsgs[0]}
				errorMsg={errorMsgs[0]}
				on:submit={handleSubmitAdd}
			>
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
					<input type="password" id="rf-secret-code-add" bind:value={secretCodes[0]} required />
				</div>
			</Form>
		</div>
		<div>
			<Form
				title="Remove a recipe"
				btnText="Remove"
				successMsg={successMsgs[1]}
				errorMsg={errorMsgs[1]}
				on:submit={handleSubmitRemove}
			>
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
					<input type="password" id="rf-secret-code-remove" bind:value={secretCodes[1]} required />
				</div>
			</Form>
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
</style>
