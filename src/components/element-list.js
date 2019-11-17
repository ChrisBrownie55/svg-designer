import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';

function ElementList({ elements, activeElement }) {
  const elementList = elements.map(({ type }, index) => {
    return html`
      <button></button>
    `;
  });

  return html`
    <section>
      ${elementList}
    </section>
  `;
}

ElementList.observedAttributes = ['elements', 'activeElement'];

customElements.define('element-list', component(ElementList));
