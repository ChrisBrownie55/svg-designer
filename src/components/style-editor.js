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
          return html`
            <label>
              ${name}
              <input
                type="number"
                .value=${element[name]}
                @input=${updateStyle}
              />
            </label>
          `;
        case TYPES.STRING:
          return html`
            <label>
              ${name}
              <input
                type="text"
                .value=${element[name]}
                @input=${updateStyle}
              />
            </label>
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

      .StyleEditor__title {
        text-transform: capitalize;
      }

      .StyleEditor__inputs {
        display: flex;
        flex-direction: column;
      }

      .StyleEditor__inputs > label {
        display: flex;
        justify-content: space-between;

        margin-bottom: 0.2rem;
      }
    </style>

    ${element
      ? html`
          <h2 class="StyleEditor__title">${element.type}</h2>
          <p>${element.id}</p>

          <section class="StyleEditor__inputs">${styleInputs}</section>
        `
      : html`
          <h2 class="StyleEditor__title">No Element Selected</h2>
          <p>Click on an element to select it.</p>
        `}
  `;
}

StyleEditor.observedAttributes = ['element'];

customElements.define('style-editor', component(StyleEditor));
