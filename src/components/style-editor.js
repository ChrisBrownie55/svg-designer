import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';
import { STYLES, TYPES } from '../lib/default-elements.js';

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

          ${Object.entries(STYLES[element.type]).map(([name, type], index) => {
            const updateStyle = event => {
              debugger;
              this.dispatchEvent(
                new CustomEvent('update-style', {
                  detail: { index, style: { [name]: event.target.value } }
                })
              );
            };

            switch (type) {
              case TYPES.NUMBER:
                return html`
                  <input
                    type="number"
                    value=${element[name]}
                    @input=${updateStyle}
                  />
                `;
              default:
                return null;
            }
          })}
        `
      : html`
          <h2 class="StyleEditor__title">No Element Selected</h2>
          <p>Click on an element to select it.</p>
        `}
  `;
}

StyleEditor.observedAttributes = ['element'];

customElements.define('style-editor', component(StyleEditor));
