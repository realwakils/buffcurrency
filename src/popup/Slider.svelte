<script lang="ts">
	import SvelteTooltip from "svelte-tooltip";
	import { tick } from "svelte";
	export let val: number;

	async function updateStorageAPI(): Promise<void> {
		// wait for binding to reload 
		await tick();

		chrome.storage.sync.set({ modifier: val }, () => {
			console.log(`Updated modifier: ${val}`);
		});

		// Reload Buff on changes
		chrome.tabs.query({active: true, currentWindow: true}, (tabs: Array<chrome.tabs.Tab>) => {
			chrome.tabs.sendMessage(tabs[0].id, {type:"reload"});
		});
	}
</script>


<div id="wrapper">
	<strong id="title">Price modifier</strong>
	<SvelteTooltip tip="Full price: $50. Price now: ${50*val/100}" top color="#008cba">
		<button id="info">?</button>
	</SvelteTooltip>
	<p style="color:gray;">Apply a price modifier. Useful for Buff Balance.</p>
	<form id="fullSlider" on:submit|preventDefault={updateStorageAPI}>
		<span id="displayVal" on:click={() => val = 100}>{val}%</span>
		<input type="range" min="50" max="200" bind:value={val} id="slider" />
		<button type="submit" id="apply">🕊️ Apply</button>
	</form>
</div>

<style>
	#wrapper {
		padding: 10px 0 15px 0;
	}
	#title {
		padding-bottom: 5px;
		font-size: 16px;
	}
	#fullSlider {
		margin-top: 5px;
		display: flex;
		justify-content: space-around;
	}
	#info {
		background-color: #008cba;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 14px;
		border-radius: 50%;
		margin-left: 4px;
	}
	#info:focus {
		outline: 0;
	}
	p {
		margin-block-start: 0.1em;
		margin-block-end: 0;
	}
	input {
		width: 50%;
	}
	#apply {
		color: gray;
		display: inline-block;
		background-color: transparent;
		border: none;
		text-align: center;
		text-decoration: none;
	}
	#apply,#displayVal:hover { cursor: pointer; }
</style>
