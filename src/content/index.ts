import { fetchData } from "../utils/fetchData";

let currentNode;

(async () => {
	const [data, currentCurrency] = await fetchData();
	const rate = data.rates[currentCurrency];

	setTimeout(() => {
		const tags = [...document.querySelectorAll('strong.f_Strong')];
		for (let i = 0; i < tags.length; i++) {
			currentNode = tags[i];
			try {
				const priceCNY = parseFloat(currentNode.innerText.replace('¥ ', ''));
				const priceConverted = priceCNY * rate;
				currentNode.innerText = `${priceConverted.toFixed(2)} ${currentCurrency}`;
			} catch (e) {}
		}
	}, 1500)
	

})();
