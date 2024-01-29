<script setup lang="ts">
	import axios from "axios";
	import { getErrorMessage, requestsBaseUrl } from "../constants";
	import { ref } from "vue";
	import { FormMessage } from "../types";
	import Form from "../components/Form.vue";
	import { useAdminStore } from "../stores";
	import { useRouter } from "vue-router";

	const adminStore = useAdminStore();
	const router = useRouter();

	const password = ref<string>("");
	const formMessage = ref<FormMessage>(null);

	async function handleSubmit(): Promise<void> {
		try {
			const { data } = await axios.post<{ accessToken: string }>(`${requestsBaseUrl}/auth`, {
				password: password.value
			});
			sessionStorage.setItem("accessToken", data.accessToken);
			adminStore.isAdmin = true;
			router.push({ path: "/admin" });
		} catch (error: unknown) {
			formMessage.value = { level: "error", message: getErrorMessage(error) };
		}
	}
</script>

<template>
	<main>
		<section>
			<h2>Se connecter</h2>
			<p>Connectez-vous en tant qu'administrateur afin de pouvoir ajouter, modifier et supprimer les repas affichés sur le site.</p>
			<Form @submit.prevent="handleSubmit" btn-text="Connexion" :form-message="formMessage">
				<div class="form-field">
					<label for="password" class="bold">Mot de passe</label>
					<input type="password" id="password" class="input" v-model="password" />
				</div>
			</Form>
		</section>
	</main>
</template>

<style scoped>
	section {
		display: flex;
		flex-direction: column;
		margin: auto;
		max-width: 24rem;
		row-gap: 1rem;
	}

	h2 {
		font-size: 2.25rem;
		text-align: center;
	}
</style>
