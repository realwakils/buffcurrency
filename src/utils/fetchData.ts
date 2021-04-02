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
				currency = res.userCurrency || "DKK";

				resolve([rates, currency]);
			});
		});
	});
}

export function isValidData(data: any): data is Rates {
	return (
		typeof data === "object" &&
		"rates" in data &&
		typeof data.rates === "object" &&
		"base" in data &&
		typeof data.base === "string" &&
		"date" in data
	);
}
