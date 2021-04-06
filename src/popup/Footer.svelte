<script lang="ts">
	// IDE's do not understand nor work with Rollup injected variables. (@rollup/plugin-replace)
	// @ts-ignore
	const showDevMessage: string = !isProduction;
</script>

<footer>
	<hr />
	{#if showDevMessage}
		<strong style="color: orange;">DEVELOPMENT BUILD</strong>
	{/if}
	<p>
		Created with 💖 by <a target="_blank" href="http://wakils.com">wakils</a> &
		<a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">linnus</a>
	</p>
	<p>
		<a target="_blank" href="https://github.com/realwakils/buffcurrency/">Contribute</a> •
		<a target="_blank" href="https://www.paypal.com/paypalme/wakils">Support</a> •
		<!-- svelte-ignore missing-declaration -->
		{chrome.runtime.getManifest().version}
	</p>
</footer>

<style>
	footer {
		font-size: larger;
		text-align: center;
	}

	p {
		margin-block-start: 0.5em;
		margin-block-end: 0.5em;
		font-size: smaller;
		color: gray;
	}

	a {
		color: #0f9d58;
		text-decoration: none;
	}
</style>
