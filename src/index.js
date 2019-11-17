import { html } from '/web_modules/lit-html.js';
import { component, useState, useCallback } from '/web_modules/haunted.js';
import { replaceAtIndex, removeByIndex } from './lib/array-functions.js';

import './components/element-list.js';
import './components/design-editor.js';
import './components/style-editor.js';

function App() {
  const [elements, setElements] = useState([]);
  const [activeElement, setActiveElement] = useState(null);

  const toggleHidden = useCallback(event => {
    const { index } = event.detail;

    const element = { ...elements[index] };
    element.hidden = !element.hidden;

    setElements(replaceAtIndex(elements, index, element));
  });

  const deleteElement = useCallback(
    event => {
      const { index } = event.detail;
      setElements(removeByIndex(elements, index));
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
    <design-editor></design-editor>
    <style-editor
      .element=${activeElement && elements[activeElement]}
    ></style-editor>
  `;
}

customElements.define('my-app', component(App));
