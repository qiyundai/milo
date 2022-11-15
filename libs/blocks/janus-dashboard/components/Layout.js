import { html, useContext } from '../../../deps/htm-preact.js';
import SummarySection from './SummarySection/index.js';
import DetailSection from './DetailSection/index.js';
import { FilterContext } from '../wrappers/FilterWrapper.js';

function Layout() {
  const {
    state: { showDetail },
  } = useContext(FilterContext);
  const detailSection = html`<${DetailSection} />`;
  return html`
    <div>
      <${SummarySection} />
      ${detailSection}
    </div>
  `;
}

export default Layout;
