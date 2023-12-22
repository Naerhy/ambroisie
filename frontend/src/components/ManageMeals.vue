<script setup lang="ts">
	import { ref } from 'vue';
	import ModifyMeal from "./ModifyMeal.vue";
	import DeleteMeal from "./DeleteMeal.vue";
	import AddMeal from "./AddMeal.vue";
	import { capitalize } from '../constants';

	type View = "add" | "modify" | "delete";

	const view = ref<View>("add");

	const views: View[] = ["add", "modify", "delete"];
	const titles = {
		add: "Add new meal",
		modify: "Modify meal",
		delete: "Delete meal"
	};
</script>

<template>
	<section>
		<nav>
			<button
				v-for="v in views"
				type="button"
				class="btn-text"
				:class="{ selected: view === v }"
				@click="view = v"
			>{{ capitalize(v) }}</button>
		</nav>
		<div>
			<h2>{{ titles[view] }}</h2>
			<AddMeal v-if="view === 'add'" />
			<ModifyMeal v-else-if="view === 'modify'" />
			<DeleteMeal v-else />
		</div>
	</section>
</template>

<style scoped>
	section {
		width: 500px;
	}

	nav {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	div {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		padding: 1.5rem;
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
