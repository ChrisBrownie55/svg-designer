import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';

function DesignEditor() {
  return html``;
}

DesignEditor.observedAttributes = ['elements'];

customElements.define('design-editor', component(DesignEditor));
