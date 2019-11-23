import { html } from '/web_modules/lit-html.js';
import { component, useState } from '/web_modules/haunted.js';
import './components/element-list.js';
import './components/design-editor.js';
import './components/style-editor.js';

import {
  replaceAtIndex,
  removeByIndex,
  moveToIndex
} from './lib/array-functions.js';
import defaultElements from './lib/default-elements.js';
import nanoid from '/web_modules/nanoid-esm.js';

function App() {
  const [elements, setElements] = useState([]);
  const [activeElement, setActiveElement] = useState(null);

  function toggleHidden(event) {
    const { index } = event.detail;

    const element = { ...elements[index] };
    element.hidden = !element.hidden;

    setElements(replaceAtIndex(elements, index, element));
  }

  function deleteElement(event) {
    const { index } = event.detail;
    setElements(removeByIndex(elements, index));
    setActiveElement(null);
  }

  function newElement(event) {
    const { type } = event.detail;
    setElements(
      elements.concat({
        ...defaultElements[type],
        id: nanoid()
      })
    );
    setActiveElement(elements.length);
  }

  function updatePosition(event) {
    const { index, x, y } = event.detail;
    const element = { ...elements[index], x, y };

    setElements(replaceAtIndex(elements, index, element));
  }

  function updateStyle(event) {
    debugger;
    const { style } = event.detail;
    const element = { ...elements[activeElement], ...style };

    setElements(replaceAtIndex(elements, activeElement, element));
  }

  function sortElement(event) {
    const { index, delta } = event.detail;
    setActiveElement(index);
    setElements(moveToIndex(elements, index, index + delta));
  }

  function updateActiveElement(event) {
    const { index } = event.detail;
    setActiveElement(index);
  }

  return html`
    <style>
      :host {
        display: flex;
        height: 100%;
        width: 100%;
      }
    </style>

    <element-list
      .elements=${elements}
      .activeElement=${activeElement}
      @toggle-hidden=${toggleHidden}
      @delete-element=${deleteElement}
      @sort-element=${sortElement}
      @update-active-element=${updateActiveElement}
    ></element-list>
    <design-editor
      .elements=${elements}
      @new-element=${newElement}
      @update-position=${updatePosition}
      @update-active-element=${updateActiveElement}
    ></design-editor>
    <style-editor
      .element=${activeElement !== null ? elements[activeElement] : null}
      @update-style=${updateStyle}
    ></style-editor>
  `;
}

customElements.define('my-app', component(App));
