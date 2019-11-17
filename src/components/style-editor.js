import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';

function StyleEditor() {
  return html``;
}

StyleEditor.observedAttributes = ['element'];

customElements.define('style-editor', component(StyleEditor));
