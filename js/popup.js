// This file is part of the popup page that displays when you click on the extension's icon. It is
// responsible for reading the users options and storing them using the storage API.

async function main() {
	const { rates } = await chrome.storage.local.get("rates");
	const { options } = await chrome.storage.sync.get("options");
	if (rates === undefined || options === undefined) {
		const errorElement = document.createElement("P");
		errorElement.textContent = "Missing currency data or options";
		errorElement.style.color = "red";
		document.body.appendChild(errorElement);
		return;
	}

	// At the top, we add a small group of the most commonly used currencies.
	const commonCurrenciesGroup = document.getElementById("commonCurrencies");
	const commonCurrencies = ["USD", "EUR", "DKK", "SEK", "CNY"];
	for (const currency of commonCurrencies) {
		if (!(currency in rates)) {
			console.error(`The currency ${currency} is missing from rates???`);
			continue;
		}

		const optionElement = document.createElement("OPTION");
		optionElement.value = currency;
		optionElement.textContent = currency;
		optionElement.selected = currency === options.preferredCurrency;
		commonCurrenciesGroup.appendChild(optionElement);
	}

	// Below comes the list of all currencies.
	const otherCurrenciesGroup = document.getElementById("otherCurrencies");
	const otherCurrencies = Object.keys(rates).filter(c => !commonCurrencies.includes(c));
	for (const currency of otherCurrencies) {
		const optionElement = document.createElement("OPTION");
		optionElement.value = currency;
		optionElement.textContent = currency;
		optionElement.selected = currency === options.preferredCurrency;
		otherCurrenciesGroup.appendChild(optionElement);
	}

	// Once all currencies have been added, we can enable the select element.
	const selectElement = document.getElementById("preferredCurrency");
	selectElement.disabled = false;

	const modifierLabelElement = document.getElementById("priceModifierLabel");
	const modifierElement = document.getElementById("priceModifier");
	const updateLabel = () => modifierLabelElement.textContent = `Price Modifier: ${modifierElement.value}%`;
	modifierElement.addEventListener("input", updateLabel);
	modifierElement.value = options.priceModifier * 100;
	updateLabel();
	modifierElement.disabled = false;

	const formElement = document.getElementById("optionsForm");
	formElement.addEventListener("change", async () => {
		options.preferredCurrency = selectElement.value;
		options.priceModifier = Number.parseInt(modifierElement.value) / 100;

		await chrome.storage.sync.set({ options });

		// Notify the content script
		const tabs = await chrome.tabs.query({ url: "*://buff.163.com/*" });
		await Promise.all(tabs.map(t => chrome.tabs.reload(t.id)));
	});
}

main();
