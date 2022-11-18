import { html, useContext } from '../../../../deps/htm-preact.js';
import GridContainer from '../GridContainer.js';
import GridItem from '../GridItem.js';
import { FilterContext, ActionTypes } from '../../wrappers/FilterWrapper.js';
import { DataContext } from '../../wrappers/FetchDataWrapper.js';
import StatusCard from './StatusCard.js';
import TotalCard from './TotalCard.js';
import {
  extractTimeFromTestId,
  convertTimeToShortDate,
} from '../../utils/utils.js';
import { PASSED } from '../../utils/constants.js';

function SummaryRow() {
  const { data: unfilteredData, testId } = useContext(DataContext);
  const {
    state: { branch, env },
  } = useContext(FilterContext);
  const data = unfilteredData
    .filter((d) => !env || d.env === env)
    .filter((d) => !branch || d.branch === branch);

  const totalCnt = data.length;
  const totalPassedCnt = data.filter((d) => d.status === PASSED).length;
  const totalFailedCnt = totalCnt - totalPassedCnt;
  const passedPercent = Math.ceil(1000 * (totalPassedCnt / totalCnt || 0)) / 10;
  const failedPercent = 100 - passedPercent;

  const ms = extractTimeFromTestId(testId);
  const date = convertTimeToShortDate(ms);

  return html`<div class="section-divider">
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
