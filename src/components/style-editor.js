import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';

function StyleEditor({ element }) {
  return html`
    <style>
      :host {
        width: 12rem;
        height: 100%;
        padding: 1rem 1.15rem;

        border-left: solid 1px lightgrey;
      }
    </style>

    ${element
      ? html`
          <h2 class="StyleEditor__title">${element.type}</h2>
          <p>${element.id}</p>
        `
      : html`
          <h2 class="StyleEditor__title">No Element Selected</h2>
          <p>Click on an element to select it.</p>
        `}
  `;
}

StyleEditor.observedAttributes = ['element'];

customElements.define('style-editor', component(StyleEditor));
