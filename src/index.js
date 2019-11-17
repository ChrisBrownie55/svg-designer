import { html } from '/web_modules/lit-html.js';
import { component } from '/web_modules/haunted.js';

function App() {
  return html`
    <div>Test</div>
  `;
}

customElements.define('my-app', component(App));
