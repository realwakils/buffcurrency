export interface Rates {
	rates: Record<string, number>;
	base: string;
	date: string;
}

export function fetchData(): Promise<[Rates, string]> {
	return new Promise((resolve, reject) => {
		let rates: Rates, currency: string;

		// Fetch rates from local
		chrome.storage.local.get("rates", (res) => {
			rates = res.rates;
			if (!rates) return reject("Failed to fetch currency rates.");

			// Fetch rates from sync
			chrome.storage.sync.get("userCurrency", (res) => {
				currency = res.userCurrency || "USD";

				resolve([rates, currency]);
			});
		});
	});
}
