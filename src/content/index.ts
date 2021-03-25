import { fetchData } from "../utils/fetchData";
import * as Observer from './MutationObserver';
import { targetClassesSelector } from '../utils/consts';

(async () => {
	const [data, currentCurrency] = await fetchData();
	const rate: number = data.rates[currentCurrency];

	function replaceNodes(nodes: Array<any>) {
		nodes.forEach(node => {
			node.innerText = node.innerText.replace(/¥ (\d+(.\d+)?)/gm, (_: any, g: string) => { // make sure to reassign (example: x = x+1 and not just x+1)
				const priceCNY = parseFloat(g); // we use group 2 (which is the price in cny) and parse it to a float
				const priceConverted = priceCNY * rate;
				return `${priceConverted.toFixed(2)} ${currentCurrency}`;
			});
		});
	}

	// Replacing nodes with: All target classes, spans w/84 width (buttons on deposit and gift card page)
	replaceNodes([...document.querySelectorAll(targetClassesSelector),
		...[...document.querySelectorAll('span')].filter(spanNode => spanNode.getAttribute('width') === '84')]);

	Observer.startObserver(replaceNodes);
})();