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
	main {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	section {
		padding: 2rem;
		text-align: center;
	}

	img {
		margin-bottom: 2rem;
		width: 500px;
	}

	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}
</style>
