import { html } from '/web_modules/lit-html.js';
import { component, useMemo } from '/web_modules/haunted.js';

function ElementList({ elements, activeElement }) {
  const elementList = useMemo(
    () =>
      elements.map(({ type, hidden }, index) => {
        const toggleHidden = () =>
          this.dispatchEvent(
            new CustomEvent('toggle-hidden', { detail: { index } })
          );

        const deleteElement = () =>
          this.dispatchEvent(
            new CustomEvent('delete-element', { detail: { index } })
          );

        return html`
          <article class="ElementList__item" ?active=${index === activeElement}>
            <p class="item-title">${type}</p>
            <div class="item-actions">
              <button
                class="item-hide-toggle item-action"
                @click=${toggleHidden}
              >
                ${hidden ? 'Show' : 'Hide'}
              </button>
              <button class="item-delete item-action" @click=${deleteElement}>
                Delete
              </button>
            </div>
          </article>
        `;
      }),
    [elements]
  );

  return html`
    <style>
      :host {
        width: 12rem;
        height: 100%;
        padding: 1rem 1.15rem;

        border-right: solid 1px lightgrey;
      }

      .ElementList__title {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      .ElementList__item {
        display: flex;
        align-items: center;

        margin-bottom: 0.45rem;
      }

      .ElementList__item > .item-title {
        margin: 0;
        text-transform: capitalize;
      }

      .ElementList__item > .item-actions {
        margin-left: auto;
      }

      .ElementList__item .item-action {
        width: 3rem;
      }
    </style>

    <h2 class="ElementList__title">Elements</h2>
    ${elementList}
  `;
}

ElementList.observedAttributes = ['elements', 'activeElement'];

customElements.define('element-list', component(ElementList));
