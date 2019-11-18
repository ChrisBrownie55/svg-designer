import { html, svg } from '/web_modules/lit-html.js';
import { virtual, component, useMemo } from '/web_modules/haunted.js';
import useComputedStyles from '../lib/use-computed-styles.js';

const Rectangle = virtual(props => {
  if (props.hidden) {
    return null;
  }

  return svg`
    <rect
      x=${props.x}
      y=${props.y}
      width=${props.width}
      height=${props.height}
    ></rect>
  `;
});
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
        return elementMapping[element.type](element);
      }),
    [elements]
  );

  const [newRectangle, newCircle, newText] = useMemo(() => {
    const newElement = type => () => {
      this.dispatchEvent(new CustomEvent('new-element', { detail: { type } }));
    };

    return [newElement('rectangle'), newElement('circle'), newElement('text')];
  }, []);

  const styles = useComputedStyles(this);
  const width = styles.width.slice(0, -2);
  const height = styles.height.slice(0, -2);

  return html`
    <style>
      :host {
        width: auto;
        position: relative;

        flex: 1;
      }

      .DesignEditor__actions {
        position: absolute;
        top 0;
        left: 50%;

        display: flex;
        transform: translateX(-50%);
      }

      .DesignEditor__svg {
        width: 100%;
        height: 100%;
      }
    </style>

    <section class="DesignEditor__actions">
      <button class="DesignEditor__action new-square" @click=${newRectangle}>
        Rectangle
      </button>
      <button class="DesignEditor__action new-circle" @click=${newCircle}>
        Circle
      </button>
      <button class="DesignEditor__action new-text" @click=${newText}>
        Text
      </button>
    </section>

    ${svg`
        <svg class="DesignEditor__svg" xmlns="http://www.w3.org/2000/svg" viewBox=${`0 0 ${width} ${height}`}>
          ${svgElements}
        </svg>
      `}
  `;
}

DesignEditor.observedAttributes = ['elements'];
customElements.define('design-editor', component(DesignEditor));
