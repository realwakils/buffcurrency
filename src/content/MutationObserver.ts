import { targetClasses, targetClassesSelector } from '../utils/consts';

const observer: MutationObserver = new MutationObserver(onMutation);
type callbackType = (nodes: Array<any>) => void;
let currentCallback: callbackType;

export function startObserver(callback: callbackType): void {
	currentCallback = callback;
	observer.observe(document, {
		childList: true,
		subtree: true
	});
}

function onMutation(mutations): void {
	let found: Array<any> = [];

	mutations.forEach(mutRec => {
		if (mutRec.target?.id?.match(/alipay_amount|cash_amount|frozen_amount/gm)) {
			if (mutRec.target.innerText.includes('¥')) found.push(mutRec.target);
		}
	}); // this check is for the 3 balance displayers - they act special

	for (const { addedNodes } of mutations) {
		for (const node of addedNodes) {
			if (!node.tagName) continue; // not an element
			if ([...node.classList].some(r => targetClasses.includes(r))) {
				found.push(node);
			} else if (node.firstElementChild) {
				found.push(...node.querySelectorAll(targetClassesSelector));
			}
		}
	}
	if (found.length > 0) currentCallback(found);
}