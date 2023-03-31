// The background script runs in the background and is responsible for fetching the rates from an
// external API.

async function fetchRates() {
	console.log("Fetching rates...");

	const response = await fetch("https://open.er-api.com/v6/latest/CNY");
	if (!response.ok)
		throw new Error(`API request failed with code ${response.status}: ${response.StatusText}`);
	const data = await response.json();

	chrome.storage.local.set({ rates: data.rates, lastUpdate: data.time_last_update_unix }, () => {
		if (chrome.runtime.lastError) {
			throw new Error(chrome.runtime.lastError);
		}

		console.log("Set rates to %o (last updated %d)", data.rates, data.time_last_update_unix);
	});
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
 	if (request !== "fetch-rates") {
		return;
	}

	fetchRates()
		.then(_ => sendResponse({ success: true }))
		.catch((error) => {
			console.error(error);
			sendResponse({ success: false, error });
		});

	// Return true to indicate we want to send a response asynchronously.
	// The actual response will be sent from the promise.
	return true;
});

chrome.runtime.onInstalled.addListener(async () => {
	chrome.alarms.create("fetch-rates", {
		periodInMinutes: 60 * 24,
	});

	chrome.alarms.onAlarm.addListener(async (alarm) => {
		if (alarm.name === "fetch-rates") {
			await fetchRates();
		}
	});

	// Default options
	const defaultOptions = {
		preferredCurrency: "USD",
		priceModifier: 1,
	};
	await chrome.storage.sync.set({ options: defaultOptions });

	// Initial fetching of data. This may throw, hence it's the last thing we do.
	await fetchRates();
});
