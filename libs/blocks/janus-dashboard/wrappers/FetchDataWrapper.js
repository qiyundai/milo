import { html, createContext, useState } from '../../../deps/htm-preact.js';
import Loader from '../components/Loader.js';
import useGetData from '../hooks/useGetData.js';
import Clickable from '../components/Clickable.js';

function extractInfo(data) {
  const branchSet = new Set();
  const consumerSet = new Set();
  data.forEach((d) => {
    branchSet.add(d.branch);
    consumerSet.add(d.env);
  });
  return { branchSet, consumerSet };
}

export const DataContext = createContext();

export default function FetchDataWrapper({ children }) {
  const [small, setSmall] = useState(false);
  const toggleSmall = () => {
    setSmall((s) => !s);
  };
  const { isLoading, data, isError } = useGetData(
    `http://localhost:3002/testresult/${small ? 'small' : ''}`
  );
  if (isError) {
    return 'Error loading data!';
  }
  if (isLoading) {
    return html`<${Loader} />`;
  }

  const { branchSet, consumerSet } = extractInfo(data);

  const dataValue = {
    data,
    branches: Array.from(branchSet),
    consumers: Array.from(consumerSet),
    // FIXME: remove hardcoded value
    testId: '6365935b0fbc1154362fef8f',
  };

  return html`
  <${DataContext.Provider} value=${dataValue}>
    ${children}
    <${Clickable} onClick=${toggleSmall}>
      switch to ${small ? 'big' : 'small'}
    </${Clickable}>
  <//>`;
}
