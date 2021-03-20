import { fetchData } from "../utils/fetchData";
import * as Observer from './MutationObserver';

(async () => {
	const [data, currentCurrency] = await fetchData();
	const rate = data.rates[currentCurrency];

	Observer.startObserver((thingyBobs: Array<any>) => {
		thingyBobs.forEach(thingyBob => {
			thingyBob.innerText = thingyBob.innerText.replace(/¥ (\d+(.\d+)?)/gm, (_, g) => { // make sure reassign (example: x = x+1 and not just x+1)
				const priceCNY = parseFloat(g); // we use group 2 (which is the price in cny) and parse it to a float
				const priceConverted = priceCNY * rate;
				return `${priceConverted.toFixed(2)} ${currentCurrency}`;
			});
		});
	});
})();