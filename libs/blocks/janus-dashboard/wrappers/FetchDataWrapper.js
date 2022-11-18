import {
  html,
  createContext,
  useState,
  useContext,
} from '../../../deps/htm-preact.js';
import { MetaDataContext } from './MetaDataWrapper.js';
import Loader from '../components/Loader.js';
import useGetData from '../hooks/useGetData.js';
import Clickable from '../components/Clickable.js';

function extractInfo(data) {
  const branchSet = new Set();
  const envSet = new Set();
  data.forEach((d) => {
    branchSet.add(d.branch);
    envSet.add(d.env);
  });
  return { branchSet, envSet };
}

export const DataContext = createContext();

export default function FetchDataWrapper({ children }) {
  const { dataapi } = useContext(MetaDataContext);
  const [small, setSmall] = useState(false);
  const toggleSmall = () => {
    setSmall((s) => !s);
  };
  const { isLoading, data, isError } = useGetData(dataapi);
  if (isError) {
    return 'Error loading data!';
  }
  if (isLoading) {
    return html`<${Loader} />`;
  }

  const { branchSet, envSet } = extractInfo(data);

  const dataValue = {
    data,
    branches: Array.from(branchSet),
    envs: Array.from(envSet),
  };

  return html`
  <${DataContext.Provider} value=${dataValue}>
    ${children}
    <${Clickable} onClick=${toggleSmall}>
      switch to ${small ? 'big' : 'small'}
    </${Clickable}>
  <//>`;
}
