import { html, useContext } from '../../../../../deps/htm-preact.js';
// import { FilterContext } from '../../../wrappers/FilterWrapper.js';
import GridContainer from '../../GridContainer.js';
import GridItem from '../../GridItem.js';
import Clickable from '../../Clickable.js';
import { PASSED } from '../../../utils/constants.js';

export default function CountRow({
  feature,
  data,
  closeDetail,
  showDetail,
  showingDetail,
}) {
  const total = data.length;
  const passed = data.filter((d) => d.status === PASSED).length;
  const failed = total - passed;
  return html`
    <${GridContainer}>
      <${GridItem}>
        <span class="feature-row-head">${feature}</span>
      </${GridItem}>
      <${GridItem}>
        ${total}
      </${GridItem}>
      <${GridItem}>
        ${passed}
      </${GridItem}>
      <${GridItem}>
        ${failed}
      </${GridItem}>

      <${GridItem}>
        <${Clickable} >
          <div onClick=${showingDetail ? closeDetail : showDetail}>
            ${showingDetail ? 'Collapse' : 'Expand'}
          </div>
        </${Clickable}>
      </${GridItem}>
    <//>`;
}
