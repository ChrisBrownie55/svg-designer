import { html, svg } from '/web_modules/lit-html.js';
import { virtual, component, useMemo } from '/web_modules/haunted.js';

const Rectangle = virtual(props => {});
const Circle = virtual(props => {});
const Text = virtual(props => {});

const elementMapping = {
  rectangle: Rectangle,
  circle: Circle,
  text: Text
};

function DesignEditor({ elements }) {
  const svgElements = useMemo(
    () =>
      elements.map(element => {
        return elementMapping[element.type]({
          hidden: element.hidden,
          styles: element.styles
        });
      }),
    [elements]
  );

  return html`
    <main>
      ${svg`
        <svg xmlns="http://www.w3.org/2000/svg">
          ${svgElements}
        </svg>
      `}
    </main>
  `;
}

DesignEditor.observedAttributes = ['elements'];
customElements.define('design-editor', component(DesignEditor));
