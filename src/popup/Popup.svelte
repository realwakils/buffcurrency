<script lang="ts">
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import type { Rates } from "../utils/fetchData";
	import { fetchData } from "../utils/fetchData";

	let currentCurrency: string;
	let rates: Rates;

	async function fetchDataSetPiss() {
		[rates, currentCurrency] = await fetchData();
	}

	function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function updateStorageAPI(): Promise<void> {
		await delay(1); // TODO: Wow, wasn't fun debugging. For some awful reason
		// the currenctCurrency variable isn't updated with the latest currency input...
		// when awaiting for 1 ms, it always works... Strange.
		chrome.storage.sync.set({ userCurrency: currentCurrency }, () => {
			console.log(`Updated currency: ${currentCurrency}`);
		});
	}
</script>

<main>
	<Header />

	{#await fetchDataSetPiss()}
		<p>Awaiting data...</p>
	{:then _}
		<form>
			<select
				bind:value={currentCurrency}
				on:input={updateStorageAPI}
			>
				{#each Object.keys(rates["rates"]).sort() as currency}
					<option value={currency}>{currency}</option>
				{/each}
			</select>
		</form>
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
		margin-top: 1em;
		margin-bottom: .5em;
	}
</style>
