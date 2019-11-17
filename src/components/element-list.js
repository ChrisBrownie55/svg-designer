import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';

function ElementList({ elements, activeElement, setActiveElement }) {
  return html``;
}

ElementList.observedAttributes = [
  'elements',
  'activeElement',
  'setActiveElement'
];

customElements.define('element-list', component(ElementList));
