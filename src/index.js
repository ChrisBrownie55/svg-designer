import { html } from '/web_modules/lit-html.js';
import {
  component,
  useState,
  useCallback,
  useEffect
} from '/web_modules/haunted.js';
import { replaceAtIndex, removeByIndex } from './lib/array-functions.js';

import './components/element-list.js';
import './components/design-editor.js';
import './components/style-editor.js';

function App() {
  const [elements, setElements] = useState([]);
  const [activeElement, setActiveElement] = useState(null);

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  const toggleHidden = useCallback(
    event => {
      const { index } = event.detail;

      const element = { ...elements[index] };
      element.hidden = !element.hidden;

      setElements(replaceAtIndex(elements, index, element));
    },
    [elements]
  );

  const deleteElement = useCallback(
    event => {
      const { index } = event.detail;
      setElements(removeByIndex(elements, index));
    },
    [elements]
  );

  const newElement = useCallback(
    event => {
      const { type } = event.detail;
      setElements(elements.concat(element));
    },
    [elements]
  );

  const updatePosition = useCallback(
    event => {
      const { index, x, y } = event.detail;
      const element = { ...elements[index], x, y };

      setElements(replaceAtIndex(elements, index, element));
    },
    [elements]
  );

  const updateStyle = useCallback(
    event => {
      const { style, index } = event.detail;
      const element = { ...elements[index], style };

      setElements(elements.replaceAtIndex(elements, index, element));
    },
    [elements]
  );

  return html`
    <element-list
      .elements=${elements}
      .activeElement=${activeElement}
      @toggle-hidden=${toggleHidden}
      @delete-element=${deleteElement}
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
