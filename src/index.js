import { html } from '/web_modules/lit-html.js';
import { component, useState, useCallback } from '/web_modules/haunted.js';

import './components/element-list.js';
import { replaceAtIndex, removeByIndex } from './lib/array-functions.js';

function App() {
  const [elements, setElements] = useState([]);

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
      @toggle-hidden=${toggleHidden}
      @delete-element=${deleteElement}
    ></element-list>
  `;
}

customElements.define('my-app', component(App));
