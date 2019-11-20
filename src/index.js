import { html } from '/web_modules/lit-html.js';
import {
  component,
  useState,
  useCallback,
  useEffect
} from '/web_modules/haunted.js';
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

  console.log(elements);

  function toggleHidden(event) {
    const { index } = event.detail;

    const element = { ...elements[index] };
    element.hidden = !element.hidden;

    setElements(replaceAtIndex(elements, index, element));
  }

  function deleteElement(event) {
    const { index } = event.detail;
    setElements(removeByIndex(elements, index));
  }

  function newElement(event) {
    const { type } = event.detail;
    setElements(
      elements.concat({
        ...defaultElements[type],
        id: nanoid()
      })
    );
  }

  function updatePosition(event) {
    const { index, x, y } = event.detail;
    const element = { ...elements[index], x, y };

    setElements(replaceAtIndex(elements, index, element));
  }

  function updateStyle(event) {
    const { style, index } = event.detail;
    const element = { ...elements[index], style };

    setElements(replaceAtIndex(elements, index, element));
  }

  function sortElement(event) {
    const { index, delta } = event.detail;
    setElements(moveToIndex(elements, index, index + delta));
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
    ></element-list>
    <design-editor
      .elements=${elements}
      @new-element=${newElement}
      @update-position=${updatePosition}
    ></design-editor>
    <style-editor
      .element=${activeElement && elements[activeElement]}
      @update-style=${updateStyle}
    ></style-editor>
  `;
}

customElements.define('my-app', component(App));
