import { fetchData } from "../utils/fetchData";

console.log("content script working");

(async () => {
	const [data, currentCurrency] = await fetchData();
	const rate = data.rates[currentCurrency];

	console.log("This is where we'd replace using: ", rate);
})();
