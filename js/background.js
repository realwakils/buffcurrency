// The background script runs in the background and is responsible for fetching the rates from an
// external API.

import { validate } from "https://esm.sh/jsonschema@1.4.1";

async function fetchRates() {
	const response = await fetch("https://open.er-api.com/v6/latest/CNY");
	const data = await response.json();

	// Sanity check
	const schema = {
		type: "object",
		properties: {
			result: { const: "success" },
			base_code: { const: "CNY" },
			rates: {
				type: "object",
				patternProperties: {
					"\\W{3}": { type: "number" },
				},
			},
		},
		required: ["result", "base_code", "rates"],
		additionalProperties: true,
	};
	const { valid, errors } = validate(data, schema);
	if (!valid)
		throw new Error(`Recieved invalid JSON: ${errors[0].property} ${errors[0].message}`);

	chrome.storage.local.set({ rates: data.rates }, () => {
		if (chrome.runtime.lastError) {
			throw new Error(chrome.runtime.lastError);
		}

		console.log("Set rates to %o", data.rates);
	});
}

chrome.runtime.onInstalled.addListener(async () => {
	chrome.alarms.create("fetch-rates", {
		periodInMinutes: 60 * 24,
	});

	chrome.alarms.onAlarm.addListener(async (alarm) => {
		if (alarm.name !== "fetch-rates") {
			return;
		}

		await fetchRates();
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
