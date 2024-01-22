<script setup lang="ts">
	import { ref } from 'vue';
	import ModifyMeal from "./ModifyMeal.vue";
	import DeleteMeal from "./DeleteMeal.vue";
	import AddMeal from "./AddMeal.vue";
	import { capitalize } from '../constants';

	type View = "add" | "modify" | "delete";

	const view = ref<View>("add");

	const views: View[] = ["add", "modify", "delete"];
	const viewsFR = ["ajouter", "modifier", "supprimer"];
	const titles = {
		add: "Ajouter un repas",
		modify: "Modifier un repas",
		delete: "Supprimer un repas"
	};
</script>

<template>
	<div>
		<nav>
			<button
				v-for="(v, i) in views"
				type="button"
				class="btn-text"
				:class="{ selected: view === v }"
				@click="view = v"
			>{{ capitalize(viewsFR[i]) }}</button>
		</nav>
		<section>
			<h2>{{ titles[view] }}</h2>
			<AddMeal v-if="view === 'add'" />
			<ModifyMeal v-else-if="view === 'modify'" />
			<DeleteMeal v-else />
		</section>
	</div>
</template>

<style scoped>
	div {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	section {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		padding: 1.5rem;
		width: 500px;
	}

	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.selected {
		color: var(--highlight);
	}
</style>
