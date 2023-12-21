<script setup lang="ts">
	import { reactive, watch } from 'vue';
	import { Inputs } from '../types';
	import { capitalize, cookingTimes, difficulties, types } from '../constants';

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
	<div class="flex-col">
		<label for="name" class="bold">Name</label>
		<input type="text" id="name" class="input" v-model="inputs.name" required />
	</div>
	<div>
		<input type="checkbox" id="is-recipe" v-model="inputs.isRecipe" />
		<label for="is-recipe">Tick if the meal is a recipe</label>
	</div>
	<div>
		<div class="bold">Type</div>
		<div v-for="type in types" :key="type">
			<input type="checkbox" :id="`type-${type}`" :value="type" v-model="inputs.types" />
			<label :for="`type-${type}`">{{ capitalize(type) }}</label>
		</div>
	</div>
	<div class="flex-col">
		<label for="difficulty" class="bold">Difficulty</label>
		<select id="difficulty" class="select" v-model="inputs.difficulty">
			<option v-for="i in 3" :value="i">{{ capitalize(difficulties[i - 1]) }}</option>
		</select>
	</div>
	<div class="flex-col">
		<label for="cooking-time" class="bold">Cooking time</label>
		<select id="cooking-time" class="select" v-model="inputs.cookingTime">
			<option v-for="i in 4" :value="i">{{ capitalize(cookingTimes[i - 1]) }}</option>
		</select>
	</div>
	<div>
		<input type="checkbox" id="is-vegetarian" v-model="inputs.isVegetarian" />
		<label for="is-vegetarian">Tick if the meal is suitable for vegetarians</label>
	</div>
	<div v-if="inputs.isRecipe" class="flex-col">
		<label for="servings" class="bold">Servings</label>
		<select id="servings" class="select" v-model="inputs.servings">
			<option v-for="i in 13" :value="i - 1">{{ i - 1 }}</option>
		</select>
	</div>
	<div v-if="inputs.isRecipe" class="flex-col">
		<label for="ingredients" class="bold">Ingredients</label>
		<textarea id="ingredients" class="input" v-model="inputs.ingredients" :disabled="!inputs.isRecipe" rows="6"></textarea>
	</div>
	<div v-if="inputs.isRecipe" class="flex-col">
		<label for="directions" class="bold">Directions</label>
		<textarea id="directions" class="input" v-model="inputs.directions" :disabled="!inputs.isRecipe" rows="6"></textarea>
	</div>
	<div class="flex-col">
		<label for="image" class="bold">Image</label>
		<input type="file" id="image" accept="image/png,image/jpeg" @change="handleFileChange" required />
	</div>
</template>

<style scoped>
	input[type=checkbox] + label {
		margin-left: 0.3rem;
	}

	textarea {
		resize: none;
	}
</style>
