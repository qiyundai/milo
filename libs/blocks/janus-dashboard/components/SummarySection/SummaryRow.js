import { html, useContext } from '../../../../deps/htm-preact.js';
import GridContainer from '../GridContainer.js';
import GridItem from '../GridItem.js';
import { FilterContext, ActionTypes } from '../../wrappers/FilterWrapper.js';
import { DataContext } from '../../wrappers/FetchDataWrapper.js';
import StatusCard from './StatusCard.js';
import TotalCard from './TotalCard.js';
import Dropdown from '../Dropdown.js';
import {
  extractTimeFromTestId,
  convertTimeToShortDate,
} from '../../utils/utils.js';
import { PASSED } from '../../utils/constants.js';

function SummaryRow() {
  const { data, testId, branches, envs } = useContext(DataContext);
  const {
    dispatch,
    state: { branch, env },
  } = useContext(FilterContext);

  const totalCnt = data.length;
  const totalPassedCnt = data.filter((d) => d.status === PASSED).length;
  const totalFailedCnt = totalCnt - totalPassedCnt;
  const passedPercent = Math.ceil(1000 * (totalPassedCnt / totalCnt || 0)) / 10;
  const failedPercent = 100 - passedPercent;

  const ms = extractTimeFromTestId(testId);
  const date = convertTimeToShortDate(ms);

  const branchOptions = [
    { value: null, text: 'All' },
    ...branches.map((b) => ({ value: b, text: b })),
  ];
  const envOptions = [
    { value: null, text: 'All' },
    ...envs.map((c) => ({ value: c, text: c })),
  ];

  return html`<div class="section-divider">
  <${Dropdown} options=${branchOptions} onSelect=${(value) =>
    dispatch({
      type: ActionTypes.SET_STATE,
      payload: { branch: value, showDetail: true },
    })} value=${branch} labelText="Branch" />

  <${Dropdown} options=${envOptions} onSelect=${(value) =>
    dispatch({
      type: ActionTypes.SET_STATE,
      payload: { env: value, showDetail: true },
    })} value=${env} labelText="Env" />

    <${GridContainer} spaceAround>
      <${GridItem}>
        <${TotalCard} status='total' date=${date} cnt=${totalCnt} />
      </${GridItem}>
      <${GridItem}>
        <${StatusCard} status='failed' date=${date} cnt=${totalFailedCnt} percent=${`${failedPercent.toFixed(
    1
  )}`} />
      </${GridItem}>
      <${GridItem}>
        <${StatusCard} status='passed' date=${date} cnt=${totalPassedCnt} percent=${`${passedPercent.toFixed(
    1
  )}`} />
      </${GridItem}>
    <//>
  </div>`;
}

export default SummaryRow;
