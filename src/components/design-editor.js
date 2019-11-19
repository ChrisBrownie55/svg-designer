import { html, svg } from '/web_modules/lit-html.js';
import {
  virtual,
  component,
  useMemo,
  useEffect
} from '/web_modules/haunted.js';

import useComputedStyles from '../lib/use-computed-styles.js';
import useDrag, { DRAGGING } from '../lib/use-drag.js';

const Rectangle = virtual(
  ({ x, y, width, height, fill, stroke, updatePosition }) => {
    const { positionDelta, handleMouseDown } = useDrag(delta => {
      updatePosition(x + delta.x, y + delta.y);
    });

    return svg`
    <rect
      @mousedown=${handleMouseDown}
      x=${x + positionDelta.x}
      y=${y + positionDelta.y}
      width=${width}
      height=${height}
      fill=${fill}
      stroke=${stroke}
    />
  `;
  }
);
const Circle = virtual(({ x, y, rx, ry, fill, stroke, updatePosition }) => {
  const { positionDelta, handleMouseDown } = useDrag(delta => {
    updatePosition(x + delta.x, y + delta.y);
  });

  return svg`
    <ellipse
      @mousedown=${handleMouseDown}
      cx=${x + positionDelta.x}
      cy=${y + positionDelta.y}
      rx=${rx}
      ry=${ry}
      fill=${fill}
      stroke=${stroke}
    />
  `;
});
const Text = virtual(
  ({
    x,
    y,
    fill,
    stroke,
    text,
    fontFamily,
    fontWeight,
    fontSize,
    id,
    updatePosition
  }) => {
    const { positionDelta, handleMouseDown } = useDrag(delta => {
      updatePosition(x + delta.x, y + delta.y);
    });

    return svg`
      <style>
        .${id} {
          font-family: ${fontFamily};
          font-weight: ${fontWeight};
          font-size: ${fontSize}px;
        }
      </style>
      <text @mousedown=${handleMouseDown} class=${id}
        x=${x + positionDelta.x}
        y=${y + positionDelta.y}
        fill=${fill}
        stroke=${stroke}
      >${text}</text>
    `;
  }
);

const elementMapping = {
  rectangle: Rectangle,
  circle: Circle,
  text: Text
};

function DesignEditor({ elements }) {
  const updatePosition = index => (x, y) => {
    this.dispatchEvent(
      new CustomEvent('update-position', {
        detail: {
          index,
          x,
          y
        }
      })
    );
  };

  const svgElements = useMemo(
    () =>
      elements.map((element, index) => {
        if (element.hidden) {
          return null;
        }

        return elementMapping[element.type]({
          ...element,
          updatePosition: updatePosition(index)
        });
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
