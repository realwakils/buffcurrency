import { URLS_SRC } from '../utils/consts';
import { isValidData, Rates } from '../utils/fetchData';
const ALARM_NAME = "updateRates";

async function update(src: string): Promise<void> {
	try {
		// Fetch data
		const res = await fetch(src);
		if (!res.ok) throw new Error("Fetch failed!");
		// TEMP: Normally this is just the full object
		const { record: json } = await res.json();

		// Verify data
		if (!isValidData(json)) {
			throw new Error("Fetched invalid data!");
		}

		// Here we convert to base CNY (TEMP)
		// We no longer have control over the base so we have to convert
		const tmpRates: Rates["rates"] = {};
		for (const key in json.rates) {
			tmpRates[key] = json.rates[key] / json.rates.CNY; 
		} 
		json.rates = tmpRates;
		json.base = "cny";

		// Save
		chrome.storage.local.set({ rates: json }, () => {
			console.log("Succesfully saved rates: %o", json);
		});
	} catch(err) {
		console.error("An error occured when fethcing currency data:");
		throw err;
	}
}

// TODO: It feels so wrong to use an async function
// in an evenListener and I'm sure it's causing a
// ton of problems that I'm unavare of.
chrome.runtime.onInstalled.addListener(async () => {
	// Initial update
	await update(URLS_SRC);

	// Add update alarms
	// NOTE: Are we sure that these alarms will fire reliably?
	chrome.alarms.create(ALARM_NAME, {
		periodInMinutes: 60 * 24,
	});

	chrome.alarms.onAlarm.addListener(async (alarm) => {
		if (alarm.name !== ALARM_NAME) return;

		await update(URLS_SRC);
	});

	chrome.runtime.onUpdateAvailable.addListener(async () => await update(URLS_SRC));
});

// Dummy export
export { };