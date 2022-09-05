// The content script is injected into the page. It fetches the current rates from storage and does
// the actual replacements on the webpage.

let rates;
let options;

async function main() {
	({ rates, lastUpdate } = await chrome.storage.local.get(["rates", "lastUpdate"]));
	({ options } = await chrome.storage.sync.get("options"));

	// If there are no rates in the cache, it's because the content script failed to fetch the
	// rates for whatever reason. Show a notification and don't attempt any further conversion.
	if (!rates) {
		showError("missing rates");
		return;
	}

	// Show a warning if the rates are cache.
	const week = 60 * 60 * 24 * 7;
	const delta = (new Date() - new Date(lastUpdate * 1e3)) / 1000;
	if (delta > week) {
		console.log(`Last update was ${new Date(lastUpdate * 1e3)}. Too long ago.`);
		showWarning("outdated rates");

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
			const convertedPrice = priceInCNY * rates[options.preferredCurrency] * options.priceModifier;
			const formatCurrency = new Intl.NumberFormat(undefined, {
				style: "currency",
				currency: options.preferredCurrency,
			});
			return formatCurrency.format(convertedPrice);
		});
	}
}

function showError(message) {
	const div = document.createElement("DIV");
	div.style.backgroundColor = "#ff3a3a";
	div.style.color = "white";
	div.style.textAlign = "center";
	div.style.padding = ".2em";
	div.textContent = `Error: ${message} (check logs)`;
	document.body.prepend(div);
}

function showWarning(message) {
	const div = document.createElement("DIV");
	div.style.backgroundColor = "#ffb225";
	div.style.color = "white";
	div.style.textAlign = "center";
	div.style.padding = ".2em";
	div.textContent = `Warning: ${message} (check logs)`;
	document.body.prepend(div);
}

main();
