<script setup lang="ts">
	import { reactive, watch } from "vue";
	import { Inputs } from "../types";
	import { capitalize, cookingTimes, difficulties, types } from "../constants";

	const props = defineProps<{ baseInputs: Inputs }>();

	const inputs: Inputs = reactive(props.baseInputs);

	const emit = defineEmits<{ (e: "inputsChange", newInputs: Inputs): void }>();

	watch(inputs, (inputs) => {
		emit("inputsChange", inputs);
	});

	async function handleFileChange(event: Event): Promise<void> {
		const files = (event.target as HTMLInputElement).files;
		const file = files?.item(0) ?? null;
		if (file !== null) {
			inputs.imageBase64 = await imageToBase64(file);
		}
	}

	function imageToBase64(file: File): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	}
</script>

<template>
	<div class="form-field">
		<label for="name" class="bold">Nom</label>
		<input type="text" id="name" class="input" v-model="inputs.name" required />
	</div>
	<div>
		<input type="checkbox" id="is-recipe" v-model="inputs.isRecipe" />
		<label for="is-recipe">Cochez si le repas est une recette</label>
	</div>
	<div>
		<div class="bold">Type</div>
		<div v-for="i in 4" :key="i">
			<input type="checkbox" :id="`type-${i}`" :value="i" v-model="inputs.types" />
			<label :for="`type-${i}`">{{ capitalize(types[i - 1]) }}</label>
		</div>
	</div>
	<div class="form-field">
		<label for="difficulty" class="bold">Difficulté</label>
		<select id="difficulty" class="select" v-model="inputs.difficulty">
			<option v-for="i in 3" :value="i">{{ capitalize(difficulties[i - 1]) }}</option>
		</select>
	</div>
	<div class="form-field">
		<label for="cooking-time" class="bold">Temps de préparation</label>
		<select id="cooking-time" class="select" v-model="inputs.cookingTime">
			<option v-for="i in 4" :value="i">{{ capitalize(cookingTimes[i - 1]) }}</option>
		</select>
	</div>
	<div>
		<input type="checkbox" id="is-vegetarian" v-model="inputs.isVegetarian" />
		<label for="is-vegetarian">Cochez si le repas convient aux végétariens</label>
	</div>
	<div v-if="inputs.isRecipe" class="form-field">
		<label for="servings" class="bold">Nombre de parts</label>
		<select id="servings" class="select" v-model="inputs.servings">
			<option v-for="i in 13" :value="i - 1">{{ i - 1 }}</option>
		</select>
	</div>
	<div v-if="inputs.isRecipe" class="form-field">
		<label for="ingredients" class="bold">Ingrédients</label>
		<textarea
			id="ingredients"
			class="input"
			v-model="inputs.ingredients"
			:disabled="!inputs.isRecipe"
			rows="6"
		></textarea>
	</div>
	<div v-if="inputs.isRecipe" class="form-field">
		<label for="directions" class="bold">Préparation</label>
		<textarea
			id="directions"
			class="input"
			v-model="inputs.directions"
			:disabled="!inputs.isRecipe"
			rows="6"
		></textarea>
	</div>
	<div class="form-field">
		<label for="image" class="bold">Image</label>
		<input type="file" id="image" accept="image/png,image/jpeg" @change="handleFileChange" required />
	</div>
</template>

<style scoped>
	input[type="checkbox"] + label {
		margin-left: 0.3rem;
	}

	textarea {
		resize: none;
	}
</style>
