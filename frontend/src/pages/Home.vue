<template>
	<main>
		<section>
			<h2>En manque d'idées de repas ?</h2>
			<img src="/eating.svg" alt="2 people eating together" />
			<p>
				Ambroisie est né de l'envie de vouloir faciliter la planification des repas de la semaine.
				Ainsi, vous trouverez tous types de repas parmi le catalogue disponible, allant des repas simples voire déjà préparés à des repas plus complexes avec recettes.
				Plusieurs filtres sont disponibles afin d'affiner vos recherches selon vos préférences.
			</p>
			<router-link to="/repas" class="link">Accéder à la liste des repas</router-link>
		</section>
	</main>
</template>

<style scoped>
	section {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin: auto;
		max-width: 48rem;
		row-gap: 1rem;
	}

	h2 {
		font-size: 2.25rem;
		text-align: center;
	}
</style>
