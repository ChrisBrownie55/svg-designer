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
    <style>
      .DesignEditor {
        position: relative;
      }

      .DesignEditor__actions {
        position: absolute;
        top 0;
        left: 50%;

        display: flex;
        transform: translateX(-50%);
      }
    </style>

    <main class="DesignEditor">
      <section class="DesignEditor__actions">
        <button class="DesignEditor__action new-square">Square</button>
        <button class="DesignEditor__action new-circle">Circle</button>
        <button class="DesignEditor__action new-text">Text</button>
      </section>

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
