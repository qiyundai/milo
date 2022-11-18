import { html, createContext } from '../../../deps/htm-preact.js';
import { getMetadata } from '../../../utils/utils.js';

export const MetaDataContext = createContext();

function MetaDataWrapper({ children }) {
  const branches = getMetadata('branches');
  const dataapi = getMetadata('dataapi');
  const blockbyvpn = getMetadata('blockbyvpn');
  return html`
    <${MetaDataContext.Provider} value=${{ branches, dataapi, blockbyvpn }}>
      ${children}
    <//>
  `;
}

export default MetaDataWrapper;
