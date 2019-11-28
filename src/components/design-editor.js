import { html, svg } from '../../web_modules/lit-html.js';
import { component, useMemo, virtual } from '../../web_modules/haunted.js';
import { toClipboard } from '../../web_modules/copee.js';

import useComputedStyles from '../lib/use-computed-styles.js';
import useDrag from '../lib/use-drag.js';

import { RECTANGLE, CIRCLE, TEXT } from '../lib/default-elements.js';

function DesignElement({ element, index, dispatchEvent }) {
  const { positionDelta, handleMouseDown: handleMouseDownDrag } = useDrag(
    delta => {
      updatePosition(x + delta.x, y + delta.y);
    }
  );

  const updatePosition = (x, y) =>
    dispatchEvent(
      new CustomEvent('update-position', {
        detail: {
          index,
          x,
          y
        },
        bubbles: true
      })
    );

  const setActive = () =>
    dispatchEvent(
      new CustomEvent('update-active-element', { detail: { index } })
    );

  function handleMouseDown(event) {
    setActive();
    handleMouseDownDrag(event);
  }

  const { x, y, rx, fill, stroke, id, transform } = element;
  switch (element.type) {
    case RECTANGLE:
      const { width, height } = element;
      return svg`
        <style>
          .${id} {
            transform: ${transform};
            transform-origin: center;
            transform-box: fill-box;
          }
        </style>
        <rect
          @mousedown=${handleMouseDown}
          class=${id}
          x=${x + positionDelta.x}
          y=${y + positionDelta.y}
          rx=${rx}
          width=${width}
          height=${height}
          fill=${fill}
          stroke=${stroke}
        />
      `;
    case CIRCLE:
      const { ry } = element;
      return svg`
        <style>
          .${id} {
            transform: ${transform};
            transform-origin: center;
            transform-box: fill-box;
          }
        </style>
        <ellipse
          @mousedown=${handleMouseDown}
          class=${id}
          cx=${x + positionDelta.x}
          cy=${y + positionDelta.y}
          rx=${rx}
          ry=${ry}
          fill=${fill}
          stroke=${stroke}
        />
      `;
    case TEXT:
      const { text, fontFamily, fontWeight, fontSize } = element;
      return svg`
        <style>
          .${id} {
            font-family: ${fontFamily};
            font-weight: ${fontWeight};
            font-size: ${fontSize}px;

            transform: ${transform};
            transform-origin: center;
            transform-box: fill-box;
          }
        </style>
        <text
          @mousedown=${handleMouseDown}
          class=${id}
          x=${x + positionDelta.x}
          y=${y + positionDelta.y}
          fill=${fill}
          stroke=${stroke}
        >${text}</text>
      `;
  }
}
const designElement = virtual(DesignElement);

function DesignEditor({ elements }) {
  const svgElements = useMemo(
    () =>
      elements.map((element, index) => {
        if (element.hidden) {
          return null;
        }

        return designElement({
          element,
          index,
          dispatchEvent: this.dispatchEvent.bind(this)
        });
      }),
    [elements]
  );

  const [newRectangle, newCircle, newText] = useMemo(() => {
    const newElement = type => () => {
      this.dispatchEvent(new CustomEvent('new-element', { detail: { type } }));
    };

    return [newElement(RECTANGLE), newElement(CIRCLE), newElement(TEXT)];
  }, []);

  const styles = useComputedStyles(this);
  const width = styles.width.slice(0, -2);
  const height = styles.height.slice(0, -2);

  const exportSVG = () => {
    if (
      toClipboard(
        this.shadowRoot.querySelector('svg.DesignEditor__svg').outerHTML
      )
    ) {
      alert('The SVG has been copied to your clipboard');
    } else {
      alert('Unable to copy your SVG');
    }
  };

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
      <button class="DesignEditor__action export-svg" @click=${exportSVG}>
        Export SVG
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
