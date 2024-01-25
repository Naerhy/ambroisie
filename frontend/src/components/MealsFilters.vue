<script setup lang="ts">
	import { reactive, watch } from "vue";
	import { Filters } from "../types";
	import { types, difficulties, cookingTimes, capitalize } from "../constants";

	const props = defineProps<{ baseFilters: Filters }>();

	const emit = defineEmits<{ (e: "filtersChange", filters: Filters): void }>();

	const filters: Filters = reactive(props.baseFilters);

	watch(filters, (filters) => {
		emit("filtersChange", filters);
	});
</script>

<template>
	<aside>
		<input type="text" class="input" v-model="filters.name" placeholder="Filtrer par nom" />
		<div>
			<div class="bold">Type</div>
			<div v-for="n in 4" :key="n">
				<input type="checkbox" :id="`type-${n}`" :value="n" v-model="filters.types" />
				<label :for="`type-${n}`">{{ capitalize(types[n - 1]) }}</label>
			</div>
		</div>
		<div>
			<div class="bold">Difficulté</div>
			<div v-for="n in 3" :key="n">
				<input type="checkbox" :id="`difficulty-${n}`" :value="n" v-model="filters.difficulties" />
				<label :for="`difficulty-${n}`">{{ capitalize(difficulties[n - 1]) }}</label>
			</div>
		</div>
		<div>
			<div class="bold">Temps de préparation</div>
			<div v-for="n in 4" :key="n">
				<input type="checkbox" :id="`cooking-time-${n}`" :value="n" v-model="filters.cookingTimes" />
				<label :for="`cooking-time-${n}`">{{ capitalize(cookingTimes[n - 1]) }}</label>
			</div>
		</div>
		<div>
			<div class="bold">Pratique alimentaire</div>
			<div>
				<input type="checkbox" id="vegetarian" v-model="filters.vegetarian" />
				<label for="vegetarian">Végétarisme</label>
			</div>
		</div>
	</aside>
</template>

<style scoped>
	aside {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		row-gap: 1rem;
	}

	label {
		margin-left: 0.3rem;
	}
</style>
