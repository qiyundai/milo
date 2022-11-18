import { html } from '../../deps/htm-preact.js';
import ErrorBoundary from './wrappers/ErrorBoundary.js';
import MetaDataWrapper from './wrappers/MetaDataWrapper.js';
import FetchDataWrapper from './wrappers/FetchDataWrapper.js';
// import { PreprocessWrapper } from './wrappers/PreprocessWrapper.js';
import FilterWrapper from './wrappers/FilterWrapper.js';
import Layout from './components/Layout.js';

function DashboardApp() {
  const searchParams = new URLSearchParams(document.location.search);
  if (searchParams.has('testId')) {
    console.log(new URLSearchParams(document.location.search).get('testId'));
  }

  return html`
    <${ErrorBoundary}>
      <${MetaDataWrapper}>
        <${FetchDataWrapper}>
          <${FilterWrapper}>
            <${Layout} />
          </${FilterWrapper}>
        </${FetchDataWrapper}>
      </${MetaDataWrapper}>
    </${ErrorBoundary}>
  `;
}

export default DashboardApp;
