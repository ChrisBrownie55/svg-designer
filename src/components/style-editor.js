import { html } from '/web_modules/lit-html.js';
import { component, useMemo } from '/web_modules/haunted.js';
import { STYLES, TYPES } from '../lib/default-elements.js';

function StyleEditor({ element }) {
  const styleInputs = useMemo(() => {
    if (!element) {
      return null;
    }

    return Object.entries(STYLES[element.type]).map(([name, type]) => {
      const updateStyle = event => {
        this.dispatchEvent(
          new CustomEvent('update-style', {
            detail: { style: { [name]: event.target.value } }
          })
        );
      };

      switch (type) {
        case TYPES.NUMBER:
          console.log(element[name]);
          return html`
            <input
              type="number"
              .value=${element[name]}
              @input=${updateStyle}
            />
          `;
        default:
          return null;
      }
    });
  }, [element]);

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

          ${styleInputs}
        `
      : html`
          <h2 class="StyleEditor__title">No Element Selected</h2>
          <p>Click on an element to select it.</p>
        `}
  `;
}

StyleEditor.observedAttributes = ['element'];

customElements.define('style-editor', component(StyleEditor));
