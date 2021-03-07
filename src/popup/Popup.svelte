<script lang="ts">
	const rates: Rates = {
		rates: {
			CAD: 0.1956406716,
			HKD: 1.1962343042,
			ISK: 19.7318329053,
			PHP: 7.491127773,
			DKK: 0.9596587903,
			HUF: 47.2699350876,
			CZK: 3.3944172721,
			GBP: 0.1113706462,
			RON: 0.6299345714,
			SEK: 1.3145478713,
			IDR: 2217.6166939824,
			INR: 11.2571461756,
			BRL: 0.8772729033,
			RUB: 11.4701054343,
			HRK: 0.9774935797,
			JPY: 16.6862393372,
			THB: 4.7002800397,
			CHF: 0.1428073662,
			EUR: 0.1290505749,
			MYR: 0.6276374711,
			BGN: 0.2523971144,
			TRY: 1.1550284557,
			CNY: 1,
			NOK: 1.3177354205,
			NZD: 0.2159919472,
			ZAR: 2.3567086941,
			USD: 0.1540605763,
			MXN: 3.2676121772,
			SGD: 0.2065841603,
			AUD: 0.2008672199,
			ILS: 0.511117707,
			KRW: 173.8453199809,
			PLN: 0.5903805701
		},
		base: "CNY",
		date: "2021-03-05"
	}; // retrieved from storage.local
	let currentCurrency: string;
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
	@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
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
