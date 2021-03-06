import { URLS_SRC } from '../utils/consts';
import { isValidData, Rates } from '../utils/fetchData';
const ALARM_NAME = "updateRates";

async function update(src: string): Promise<void> {
	try {
		// Fetch data
		const res = await fetch(src);
		if (!res.ok) throw new Error("Fetch failed!");

		const json = await res.json();

		// Verify data
		if (!isValidData(json)) {
			throw new Error("Fetched invalid data!");
		}

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