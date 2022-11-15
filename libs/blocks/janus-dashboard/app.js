import { html } from '../../deps/htm-preact.js';
// import { PreprocessWrapper } from './wrappers/PreprocessWrapper.js';
import FilterWrapper from './wrappers/FilterWrapper.js';
import Layout from './components/Layout.js';
import FetchDataWrapper from './wrappers/FetchDataWrapper.js';

function DashboardApp() {
  return html`
    <${FetchDataWrapper}>
      <${FilterWrapper}>
        <${Layout} />
      </${FilterWrapper}>
    </${FetchDataWrapper}>
  `;
}

export default DashboardApp;
