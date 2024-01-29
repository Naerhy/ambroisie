<script setup lang="ts">
	import { types, difficulties, cookingTimes, capitalize } from "../constants";
	import { useFiltersStore } from "../stores";

	const filtersStore = useFiltersStore();
</script>

<template>
	<aside class="bdr">
		<input type="text" class="input" v-model="filtersStore.filters.name" placeholder="Filtrer par nom" />
		<div>
			<div class="bold">Type</div>
			<div v-for="n in 4" :key="n">
				<input type="checkbox" :id="`type-${n}`" :value="n" v-model="filtersStore.filters.types" />
				<label :for="`type-${n}`">{{ capitalize(types[n - 1]) }}</label>
			</div>
		</div>
		<div>
			<div class="bold">Difficulté</div>
			<div v-for="n in 3" :key="n">
				<input type="checkbox" :id="`difficulty-${n}`" :value="n" v-model="filtersStore.filters.difficulties" />
				<label :for="`difficulty-${n}`">{{ capitalize(difficulties[n - 1]) }}</label>
			</div>
		</div>
		<div>
			<div class="bold">Temps de préparation</div>
			<div v-for="n in 4" :key="n">
				<input type="checkbox" :id="`cooking-time-${n}`" :value="n" v-model="filtersStore.filters.cookingTimes" />
				<label :for="`cooking-time-${n}`">{{ capitalize(cookingTimes[n - 1]) }}</label>
			</div>
		</div>
		<div>
			<div class="bold">Pratique alimentaire</div>
			<div>
				<input type="checkbox" id="vegetarian" v-model="filtersStore.filters.vegetarian" />
				<label for="vegetarian">Végétarisme</label>
			</div>
		</div>
	</aside>
</template>

<style scoped>
	aside {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		row-gap: 1rem;
	}

	label {
		margin-left: 0.3rem;
	}
</style>
