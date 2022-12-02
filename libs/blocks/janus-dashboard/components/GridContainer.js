import { html } from '../../../deps/htm-preact.js';

function GridContainer({ children, spaceAround, spaceBetween, flexEnd }) {
  return html`<ul
    class=${`grid-container${spaceAround ? ' space-around' : ''}${
      spaceAround ? ' space-around' : ''
    }${flexEnd ? ' flex-end' : ''}`}
  >
    ${children}
  </ul>`;
}

export default GridContainer;
