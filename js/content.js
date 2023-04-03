// The content script is injected into the page. It fetches the current rates from storage and does
// the actual replacements on the webpage.

let rates;
let options;

async function main() {
	({ rates, lastUpdate } = await chrome.storage.local.get(["rates", "lastUpdate"]));
	({ options } = await chrome.storage.sync.get("options"));

	// If there are no rates in the cache and new ones can't be fetched, it's because the
	// background script failed to fetch the rates for whatever reason.
	// Show a notification and don't attempt any further conversion.
	if (!rates) {
		showMessage("missing exchange rates", true);
		return;
	}

	// Show a warning if the rates  are outdated. This is highly unlikely
	// since it would require the API request and DB request to fail in
	// just the right way. Just in case, we "handle" this case here.
	// NOTE: The value of `maxDelta` should be significantly longer than
	//       the interval specified for the alarm in the background script.
	const maxDelta = 0 // 60 * 60 * 24 * 7;
	const delta = (new Date() - new Date(lastUpdate)) / 1000;
	if (delta > maxDelta) {
		const lastUpdateFormatted = new Intl.DateTimeFormat(undefined, {
			dateStyle: "short",
			timeStyle: "short",
		}) .format(new Date(lastUpdate));
		showMessage(`outdated exchange rates from ${lastUpdateFormatted}`);
	}

	// Do initial scan of tree, converting elements
	convertCurrencyInsubtree(document.documentElement);

	// Use a MutationObserver to catch any further modifications to the DOM.
	const observer = new MutationObserver((mutationList) => {
		for (const mutation of mutationList) {
			for (const node of mutation.addedNodes) {
				convertCurrencyInsubtree(node);
			}
		}
	});
	observer.observe(document, { childList: true, subtree: true });
}

function convertCurrencyInsubtree(element) {
	// We do a depth-first traversal of the tree to avoid annihilating the entire subtree because
	// the root element matches the regular expression.
	if (element.children) {
		for (const child of element.children) {
			convertCurrencyInsubtree(child);
		}
	}

	const reg = /¥ (\d+(.\d+)?)/gm;
	if (reg.test(element.textContent)) {
		element.textContent = element.textContent.replace(reg, (_match, matchGroup) => {
			const priceInCNY = Number.parseFloat(matchGroup);
			const convertedPrice = priceInCNY * rates[options.preferredCurrency] * options.priceModifier;
			const formatCurrency = new Intl.NumberFormat(undefined, {
				style: "currency",
				currency: options.preferredCurrency,
			});
			return formatCurrency.format(convertedPrice);
		});
	}
}

function showMessage(message, isError = false) {
	const div = document.createElement("DIV");
	div.style.backgroundColor = isError ? "red" : "orange";
	div.style.color = "white";
	div.style.textAlign = "center";
	div.style.padding = ".2em";
	div.textContent = `BuffCurrency: ${message} (contract devs)`;
	document.body.prepend(div);
}

main();
