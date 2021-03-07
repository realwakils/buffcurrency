<script lang="ts">
	let currentCurrency: string;
	let rates: Rates;

	chrome.storage.local.get('rates', (res) => {
		rates = res.rates;
		console.log('The rates are %o', res.rates);
	});
	
	chrome.storage.sync.get("userCurrency", userCurrency => {
		if (!userCurrency.userCurrency) {
			currentCurrency = "USD";
			updateStorageAPI();
		} else {
			currentCurrency = userCurrency.userCurrency;
		}
	});

	import TitleStuffyDuffy from "./TitleStuffyDuffy.svelte";
	interface Rates {
		rates: Record<string, number>;
		base: string;
		date: string;
	}

	function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function updateStorageAPI(): Promise<void> {
		await delay(1); // TODO: Wow, wasn't fun debugging. For some awful reason
		// the currenctCurrency variable isn't updated with the latest currency input...
		// even when awaiting for 1 ms, it always works... Strange.
		chrome.storage.sync.set({ userCurrency: currentCurrency }, () => {
			console.log(`Selected currency: ${currentCurrency}`);
		});
	}
</script>

<main>
	<TitleStuffyDuffy />

	<form>
		<select
			bind:value={currentCurrency}
			on:input={updateStorageAPI}
			id="dropdown"
		>
			{#each Object.keys(rates["rates"]).sort() as currency}
				<option value={currency}>{currency}</option>
			{/each}
		</select>
	</form>
</main>

<style>
	main {
		min-width: 350px;
		padding: 1em;
	}

	select {
		min-width: 160px;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
		padding: 6px 8px;
		background-color: #0F9D58;
		color: white;
		font-size: 16px;
		border: none;
		cursor: pointer;
		border-radius: 3px;
	}
</style>
