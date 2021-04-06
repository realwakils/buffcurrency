<script lang="ts">
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Slider from "./Slider.svelte";
	import type { Rates } from "../utils/fetchData";
	import { fetchData } from "../utils/fetchData";
	import { tick } from 'svelte';
	
	let currentCurrency: string, data: Rates, modifier: number;

	async function fetchDataSetPiss() {
		[data, currentCurrency, modifier] = await fetchData();
	}

	async function updateStorageAPI(): Promise<void> {
		// wait for binding to reload 
		await tick();

		chrome.storage.sync.set({ userCurrency: currentCurrency }, () => {
			console.log(`Updated currency: ${currentCurrency}`);
		});

		// Reload Buff on changes
		chrome.tabs.query({active: true, currentWindow: true}, (tabs: Array<chrome.tabs.Tab>) => {
			chrome.tabs.sendMessage(tabs[0].id, {type:"reload"});
		});
	}

</script>

<main>
	<Header />

	{#await fetchDataSetPiss()}
		<p>Awaiting data...</p>
	{:then _}
		<form>
			<select bind:value={currentCurrency} on:input={updateStorageAPI}>
				{#each Object.keys(data.rates).sort() as currency}
					<option value={currency}>{currency}</option>
				{/each}
			</select>
		</form>

		<Slider val={modifier} />
	{:catch error}
		<p style="color: red">{error}</p>
	{/await}

	<Footer />
</main>

<style>
	main {
		min-width: 200px;
		padding: 1em;
	}

	select {
		min-width: 160px;
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
		padding: 6px 8px;
		background-color: #0f9d58;
		color: white;
		font-size: 16px;
		border: none;
		cursor: pointer;
		border-radius: 3px;
		margin: 0.5em auto;
	}

	/* SCROLL BAR */
	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-track {
		border-radius: 10px;
		background: #f1f1f1;
	}
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #888;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
