const observer: MutationObserver = new MutationObserver(onMutation);
let currentCallback: (thingyBobs: Array<any>) => void;
export function startObserver(callback: (thingyBobs: Array<any>) => void): void {
	currentCallback = callback;
	observer.observe(document, {
		childList: true,
		subtree: true
	});
}

const targetClass: string = "f_Strong";
function onMutation(mutations): void {
	let found: Array<any> = [];
	for (const { addedNodes } of mutations) {
		for (const node of addedNodes) {
			if (!node.tagName) continue; // not an element
			if (node.classList.contains(targetClass)) {
				found.push(node);
			} else if (node.firstElementChild) {
				found.push(...node.getElementsByClassName(targetClass));
			}
		}
	}
	if (found.length !== 0) currentCallback(found);
}

export { }; // maybe not nescescarry?