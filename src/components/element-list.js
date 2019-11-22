import { html, svg } from '/web_modules/lit-html.js';
import { component, useMemo } from '/web_modules/haunted.js';

function ElementList({ elements, activeElement }) {
  const elementList = useMemo(
    () =>
      elements.map(({ type, hidden, id }, index) => {
        const toggleHidden = () =>
          this.dispatchEvent(
            new CustomEvent('toggle-hidden', { detail: { index } })
          );

        const deleteElement = () =>
          this.dispatchEvent(
            new CustomEvent('delete-element', { detail: { index } })
          );

        const sortElement = delta => () =>
          this.dispatchEvent(
            new CustomEvent('sort-element', { detail: { index, delta } })
          );
        const sortUp = sortElement(-1);
        const sortDown = sortElement(1);

        const setActive = () =>
          this.dispatchEvent(
            new CustomEvent('update-active-element', { detail: { index } })
          );

        return html`
          <article
            class="ElementList__item ${id}-list-item"
            ?active=${index === activeElement}
            @click=${setActive}
          >
            <div class="item-movement-actions">
              <button
                ?disabled=${index === 0}
                title="Move item up"
                class="item-up item-movement-action"
                @click=${sortUp}
              >
                ${svg`
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 320 320">
                    <path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64a23.9 23.9 0 0133.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"/>
                  </svg>
                `}
              </button>
              <button
                ?disabled=${index === elements.length - 1}
                title="Move item down"
                class="item-down item-movement-action"
                @click=${sortDown}
              >
                ${svg`
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 192 320 320">
                    <path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448a23.9 23.9 0 01-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/>
                  </svg>
                `}
              </button>
            </div>
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
    [elements, activeElement]
  );

  return html`
    <style>
      .item-movement-actions {
        display: flex;
        flex-direction: column;
        margin-right: 0.25rem;
      }

      .item-movement-action {
        border: none;
        background: transparent;
        padding: 0;
      }

      .item-movement-action > svg {
        width: 0.75rem;
        height: 0.75rem;
      }

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

      .ElementList__item[active] {
        background-color: hsl(120, 100%, 90%);
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
