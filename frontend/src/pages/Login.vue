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
			const { data } = await axios.post<{ accessToken: string }>(
				`${requestsBaseUrl}/auth`,
				{ password: password.value }
			);
			sessionStorage.setItem("accessToken", data.accessToken);
			adminStore.isAdmin = true;
			router.push({ path: "/" });
		} catch (error: unknown) {
			formMessage.value = { level: "error", message: getErrorMessage(error) };
		}
	}
</script>

<template>
	<main>
		<section>
			<h2>Connexion à l'interface admin</h2>
			<Form @submit.prevent="handleSubmit" btn-text="Connexion" :form-message="formMessage">
				<div class="flex-col">
					<label for="password" class="bold">Mot de passe</label>
					<input type="password" id="password" class="input" v-model="password" autofocus />
				</div>
			</Form>
		</section>
	</main>
</template>
