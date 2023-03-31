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

	{
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

		const selectElement = document.getElementById("preferredCurrency");

		selectElement.addEventListener("change", handleChange);

		// Since currencies have been added, we can enable the select element.
		selectElement.disabled = false;
	}

	{
		const modifierElement = document.getElementById("priceModifier");
		const modifierLabelElement = document.getElementById("priceModifierLabel");

		modifierElement.value = options.priceModifier * 100;

		modifierElement.addEventListener("change", handleChange);

		// When the modifier element is changes value, update the label.
		const updateLabel = () => modifierLabelElement.textContent = `Price Modifier: ${modifierElement.value}%`
		modifierElement.addEventListener("input", updateLabel);
		updateLabel();

		modifierElement.disabled = false;
	}

	{
		const refreshButton = document.getElementById("refetchRates");

		refreshButton.disabled = false;

		refreshButton.addEventListener("click", async () => {
			const success = await chrome.runtime.sendMessage("fetch-rates");
			if (!success) {
				alert("Failed to update rates. See extension logs for more details.");
			} else {
				alert("Successfully updated rates!");
			}

			// Reload all tabs such that new rates are loaded from storage.
			await reloadAllTabs();
		});
	}
}

async function handleChange() {
	console.debug("Options changed");

	// Save options to shared storage.
	const options = {
		preferredCurrency: document.getElementById("preferredCurrency").value,
		priceModifier: Number.parseInt(document.getElementById("priceModifier").value) / 100,
	};
	await chrome.storage.sync.set({ options });

	// Reload all tabs such that new options are loaded from storage.
	await reloadAllTabs();
}

async function reloadAllTabs() {
	const tabs = await chrome.tabs.query({ url: "*://buff.163.com/*" });
	await Promise.all(tabs.map(t => chrome.tabs.reload(t.id)));
}

main();
