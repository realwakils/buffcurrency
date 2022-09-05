// The content script is injected into the page. It fetches the current rates from storage and does
// the actual replacements on the webpage.

let ratesCache;
let optionsCache;

async function main() {
	ratesCache = (await chrome.storage.local.get("rates")).rates;
	optionsCache = (await chrome.storage.sync.get("options")).options;

	// If there are no rates in the cache, it's because the content script failed to fetch the
	// rates for whatever reason. Show a notification and don't attempt any further conversion.
	if (!ratesCache) {
		showError("missing rates (check logs)");
		return;
	}

	// Do initial scan of tree, converting elements
	convertCurrencyInsubtree(document.documentElement);

	// Use a MutationObserver to catch any further modifications to the DOM
	const observer = new MutationObserver((mutationList) => {
		for (const mutation of mutationList) {
			for (const node of mutation.addedNodes) {
				convertCurrencyInsubtree(node);
			}
		}
	});
	observer.observe(document, { childList: true, subtree: true });

	// Listen to messages from the popup or background scripts
	chrome.runtime.onMessage.addListener((message) => {
		switch (message.type) {
			case "settings-changed":
				window.location.reload();
				break;
			default:
				console.error(`Recieved unknown message type '${message.type}'`);
				break;
		}
	});
}

function convertCurrencyInsubtree(element) {
	if (element.children) {
		// We do a depth-first traversal of the tree to avoid annihilating the entire subtree because
		// the root element matches the regular expression.
		for (const child of element.children) {
			convertCurrencyInsubtree(child);
		}
	}

	const reg = /¥ (\d+(.\d+)?)/gm;
	if (reg.test(element.textContent)) {
		element.textContent = element.textContent.replace(reg, (_match, matchGroup) => {
			const priceInCNY = Number.parseFloat(matchGroup);
			const convertedPrice = priceInCNY * ratesCache[optionsCache.preferredCurrency] * optionsCache.priceModifier;
			const formatCurrency = new Intl.NumberFormat(undefined, {
				style: "currency",
				currency: optionsCache.preferredCurrency,
			});
			return formatCurrency.format(convertedPrice);
		});
	}
}

function showError(message) {
	const div = document.createElement("DIV");
	div.style.backgroundColor = "red";
	div.style.color = "white";
	div.style.textAlign = "center";
	div.style.padding = ".2em";
	div.textContent = `Error: ${message}`;
	document.body.prepend(div);
}

main();
