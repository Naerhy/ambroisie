<div class="overlay">
	<div class="content">
		<button type="button" on:click>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
		</button>
		<slot />
	</div>
</div>

<style>
	.overlay {
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	.content {
		background-color: var(--background);
		border-radius: 0.25rem;
		max-height: var(--max-height, 90%);
		overflow-y: auto;
		padding: 1.5rem;
		position: relative;
		width: var(--width, 50%);
	}

	button {
		position: absolute;
		right: 4px;
		top: 4px;
	}
</style>
