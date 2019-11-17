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
            <h3>${type}</h3>
            <button @click=${toggleHidden}>${hidden ? 'Show' : 'Hide'}</button>
            <button @click=${deleteElement}>Delete</button>
          </article>
        `;
      }),
    [elements]
  );

  return html`
    <section class="ElementList">
      <h2>Elements</h2>
      ${elementList}
    </section>
  `;
}

ElementList.observedAttributes = ['elements', 'activeElement'];

customElements.define('element-list', component(ElementList));
