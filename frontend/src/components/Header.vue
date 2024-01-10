<script setup lang="ts">
	import "@fontsource-variable/dancing-script";
	import { inject, ref } from 'vue';
	import axios from "axios";
	import { FormMessage, IsAdminProvider, LoadedView } from "../types";
	import { getErrorMessage, isAdminKey, requestsBaseUrl } from '../constants';
	import Form from "./Form.vue";

	const isDropdownVisible = ref<boolean>(false);
	const password = ref<string>("");
	const formMessage = ref<FormMessage>(null);

	const { isAdmin, updateIsAdmin } = inject(isAdminKey) as IsAdminProvider;

	const emit = defineEmits<{ (e: "changeView", view: LoadedView): void }>();

	async function handleSubmit(): Promise<void> {
		try {
			const { data } = await axios.post<{ accessToken: string }>(
				requestsBaseUrl + "/auth",
				{ password: password.value }
			);
			sessionStorage.setItem("accessToken", data.accessToken);
			isDropdownVisible.value = false;
			updateIsAdmin(true);
			resetData();
		} catch (error: unknown) {
			formMessage.value = { level: "error", message: getErrorMessage(error) };
		}
	}

	function handleDisconnect(): void {
		sessionStorage.removeItem("accessToken");
		updateIsAdmin(false);
		emit("changeView", "list");
	}

	function handleDropdown(): void {
		isDropdownVisible.value = !isDropdownVisible.value;
		if (!isDropdownVisible.value) {
			resetData();
		}
	}

	function resetData(): void {
		password.value = "";
		formMessage.value = null;
	}
</script>

<template>
	<header>
		<button type="button" @click="emit('changeView', 'list')"><h1>Ambroisie</h1></button>
		<div v-if="isAdmin">
			<button type="button" class="btn-text" @click="emit('changeView', 'manage')">Gérer les repas</button>
			<button type="button" class="btn-text" @click="handleDisconnect()">Déconnexion</button>
		</div>
		<div class="dropdown" v-else>
			<button type="button" class="btn-text" @click="handleDropdown()">Admin</button>
			<div class="dropdown-content" v-if="isDropdownVisible">
				<Form @submit.prevent="handleSubmit()" btn-text="Connexion" :form-message="formMessage">
					<input type="password" class="input" v-model="password" placeholder="Mot de passe" />
				</Form>
			</div>
		</div>
	</header>
</template>

<style scoped>
	header {
		align-items: center;
		border-bottom: 1px solid var(--stroke);
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 2rem 0.5rem 8rem;
	}

	h1 {
		color: var(--highlight);
		font-family: "Dancing Script Variable", Arial;
		font-size: 3.75rem;
		line-height: 1;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-content {
		background-color: var(--background);
		border: 1px solid var(--stroke);
		padding: 1rem;
		position: absolute;
		right: 0;
		z-index: 1;
	}
</style>
