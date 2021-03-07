import { fetchData } from "../utils/fetchData";

(async () => {
	const [data, currentCurrency] = await fetchData();
	const rate = data.rates[currentCurrency];

	console.log("This is where we'd replace using: ", rate);
})();
