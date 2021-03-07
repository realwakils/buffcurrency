// Typescript doesn't recognize Svelte imports/filess
// @ts-ignore
import Popup from "./Popup.svelte";

const app = new Popup({
  target: document.body,
});

export default app;