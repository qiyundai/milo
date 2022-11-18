import { html } from '../../../../../deps/htm-preact.js';
import GridContainer from '../../GridContainer.js';
import GridItem from '../../GridItem.js';

export default function TitleRow({ env }) {
  return html`
  <div style="margin-bottom: 2em; font-weight: 800;">
    <${GridContainer}>
      <${GridItem}>${env?.toUpperCase() || 'ALL'} MAIN<//>
      <${GridItem}>Total<//>
      <${GridItem}>Passed<//>
      <${GridItem}>Failed<//>
      <${GridItem}><//>
    </${GridContainer}>
  </div>`;
}
