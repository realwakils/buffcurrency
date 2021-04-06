import { fetchData } from "../utils/fetchData";
import * as Observer from './MutationObserver';
import { targetClassesSelector } from '../utils/consts';

(async () => {
	const [data, currentCurrency, modifier] = await fetchData();
	const rate: number = data.rates[currentCurrency];

	function replaceNodes(nodes: Array<any>) {
		nodes.forEach(node => {
			node.innerText = node.innerText.replace(/¥ (\d+(.\d+)?)/gm, (_: any, g: string) => { // make sure to reassign (example: x = x+1 and not just x+1)
				const priceCNY: number = parseFloat(g); // we use group 2 (which is the price in cny) and parse it to a float
				const priceConverted: number = (priceCNY * rate) * modifier/100;
				return `${priceConverted.toFixed(2)} ${currentCurrency}`;
			});
		});
	}
	
	if (data && currentCurrency) {
		replaceNodes([...document.querySelectorAll(targetClassesSelector)]);
		Observer.startObserver(replaceNodes);
	}
})();

chrome.runtime.onMessage.addListener((msgObj: Record<string, any>) => {
	switch (msgObj.type) {
		case "reload":
			window.location.reload();
	}
})