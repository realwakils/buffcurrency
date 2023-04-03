// The background script runs in the background and is responsible for fetching the rates from an
// external API.

async function fetchRates() {
	console.log("Fetching rates...");

	const response = await fetch("https://open.er-api.com/v6/latest/CNY");
	if (!response.ok)
		throw new Error(`API request failed with code ${response.status}: ${response.StatusText}`);
	const data = await response.json();
	if (data.result === "error")
		throw new Error(`API request returned error: ${data["error-type"]}`);

	return data;
}

async function updateRates() {
	try {
		const data = await fetchRates();
		console.log("Fetched rates: %d", data);
		await chrome.storage.local.set({ rates: data.rates, lastUpdate: data.time_last_update_unix });
		console.log("Set rates to %o (last updated %d)", data.rates, data.time_last_update_unix);
	} catch (err) {
		console.error("An error occured during fetching/saving of rates: %o", err);
		await chrome.storage.local.remove(["rates", "lastUpdate"]);
		console.log("Cleared keys to avoid confusion about outdated rates.");
	}
}

chrome.runtime.onInstalled.addListener(async () => {
	// Create an alarm which will periodically update the rates.
	chrome.alarms.create("fetch-rates", {
		periodInMinutes: 60 * 24,
	});
	chrome.alarms.onAlarm.addListener(async (alarm) => {
		if (alarm.name === "fetch-rates") {
			await updateRates();
		}
	});

	// Default options
	const defaultOptions = {
		preferredCurrency: "USD",
		priceModifier: 1,
	};
	await chrome.storage.sync.set({ options: defaultOptions });

	// Initial fetching of data. This may throw, hence it's the last thing we do.
	await updateRates();
});
