console.log("background script working");

const ALARM_NAME = "updateRates";
// Base will always be CNY
const URLS_SRC = "https://api.exchangeratesapi.io/latest?base=CNY";

async function update(src: string): Promise<void> {
	// Fetch data
	await fetch(src)
		.then((res) => {
			if (!res.ok) throw new Error("Fetch failed!");
			return res.json(); // should we await this?
		})
		.then((json) => {
			// Save rates
			chrome.storage.local.set({ rates: json }, () => {
				console.log("Succesfully saved rates: %o", json);
			});

			// Then we retrive them with:
			//chrome.storage.local.get('rates', (res) => {
			//	console.log('The rates are %o', res.rates);
			//});
		})
		.catch((err) => {
			console.error("An error occured when fetching URLs:");
			throw err;
		});
}

// TODO: It feels so wrong to use an async function
// in an evenListener and I'm sure it's causing a
// ton of problems that I'm unavare of.
chrome.runtime.onInstalled.addListener(async () => {
	// Initial update
	update(URLS_SRC);

	// Add update alarms
	// NOTE: Are we sure that these alarms will fire reliably?
	chrome.alarms.create(ALARM_NAME, {
		periodInMinutes: 60 * 24 * 4,
	});

	chrome.alarms.onAlarm.addListener(async (alarm) => {
		if (alarm.name !== ALARM_NAME) return;

		update(URLS_SRC);
	});
});

// Dummy export
export {};
