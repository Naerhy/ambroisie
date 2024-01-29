<template>
	<main>
		<section>
			<img src="/404.svg" alt="Erreur 404" />
			<h2>Page introuvable !</h2>
			<p>Assurez-vous d'avoir entré la bonne adresse web.</p>
			<router-link to="/" class="link">Retourner à l'accueil</router-link>
		</section>
	</main>
</template>

<style scoped>
	section {
		margin: auto;
		max-width: 48rem;
		text-align: center;
	}

	img {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 2.25rem;
	}
</style>
