<script lang="ts">
	import Button from "./Button.svelte";
    import GroupCheckboxes from "./GroupCheckboxes.svelte";

	let title = "";
	let difficulty = "easy";
	let cookingTime = "short";
	let mealTypes: string[] = [];
	let servings = "0";
	let photo: FileList | undefined = undefined;
	let homemade = false;
	let vegetarian = false;
	let ingredients = "";
	let directions = "";
	let secretCode = "";

	let successMsg = "";
	let errorMsg = "";

	function handleSubmit(): void {
		/*for (const p of photo!) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				console.log(reader.result);
			});
			reader.addEventListener("error", () => {
				console.log(reader.error);
			});
			reader.readAsDataURL(p);
			// remove events once done
		}*/
		if (Math.random() < 0.5) {
			successMsg = "";
			errorMsg = "An error message is displayed!";
		} else {
			errorMsg = "";
			successMsg = "Recipe has been succesfully added!"
		}
	}
</script>

<main>
	<section>
		<h2>Add a recipe</h2>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="title flex">
				<label for="rf-title" class="bold">Title</label>
				<input type="text" id="rf-title" bind:value={title} required />
			</div>
			<div class="difficulty flex">
				<label for="rf-difficulty" class="bold">Difficulty</label>
				<select id="rf-difficulty" bind:value={difficulty}>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>
			<div class="cooking-time flex">
				<label for="rf-cooking-time" class="bold">Cooking time</label>
				<select id="rf-cooking-time" bind:value={cookingTime}>
					<option value="short">Short</option>
					<option value="medium">Medium</option>
					<option value="long">Long</option>
				</select>
			</div>
			<div class="meal-type">
				<GroupCheckboxes
					title="Meal type"
					name="meal-type"
					values={["breakfast", "lunch", "tea", "dinner"]}
					bind:groupValues={mealTypes}
				/>
			</div>
			<div class="servings flex">
				<label for="rf-servings" class="bold">Servings</label>
				<select id="rf-servings" bind:value={servings}>
					{#each ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as nb}
					<option value={nb}>{nb}</option>
					{/each}
				</select>
			</div>
			<div class="photo flex">
				<label for="rf-photo" class="bold">Photo</label>
				<input type="file" id="rf-photo" accept="image/png,image/jpeg" bind:files={photo} required />
			</div>
			<div class="homemade">
				<input type="checkbox" id="rf-homemade" bind:checked={homemade} />
				<label for="rf-homemade">Homemade</label>
			</div>
			<div class="vegetarian">
				<input type="checkbox" id="rf-vegetarian" bind:checked={vegetarian} />
				<label for="rf-vegetarian">Suitable for vegetarians</label>
			</div>
			<div class="ingredients flex">
				<label for="rf-ingredients" class="bold">Ingredients</label>
				<textarea id="rf-ingredients" bind:value={ingredients} rows="6" />
			</div>
			<div class="directions flex">
				<label for="rf-directions" class="bold">Directions</label>
				<textarea id="rf-directions" bind:value={directions} rows="6" />
			</div>
			<div class="secret-code flex">
				<label for="rf-secret-code" class="bold">Secret code</label>
				<input type="text" id="rf-secret-code" bind:value={secretCode} required />
			</div>
			{#if successMsg}
			<p class="success-msg">{successMsg}</p>
			{/if}
			{#if errorMsg}
			<p class="error-msg">{errorMsg}</p>
			{/if}
			<Button>Add</Button>
		</form>
	</section>
</main>

<style>
	main {
		margin: auto;
		width: 30%;
	}

	section {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		row-gap: 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		text-align: center;
	}

	.bold {
		font-weight: 700;
	}

	.flex {
		display: flex;
		flex-direction: column;
	}

	input[type=text], textarea, select {
		border: 1px solid var(--stroke);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
	}

	input[type=text], textarea {
		background-color: var(--background-dark);
	}

	textarea {
		resize: none;
	}

	input[type=text]:focus, textarea:focus {
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
