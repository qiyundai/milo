import { html, useContext } from '../../../../deps/htm-preact.js';
import { FilterContext, ActionTypes } from '../../wrappers/FilterWrapper.js';
import GridContainer from '../GridContainer.js';
import GridItem from '../GridItem.js';
import Clickable from '../Clickable.js';

export default function TotalCard({ status, date, cnt }) {
  const { dispatch, state: filterState } = useContext(FilterContext);
  const { branch, env } = filterState;
  const resetStatusFilter = () => {
    dispatch({
      type: ActionTypes.SET_STATE,
      payload: { status: null, showDetail: true },
    });
  };

  const displayEnv = env?.toUpperCase() || 'All Envs';
  const displayBranch = branch?.toUpperCase() || 'All Branches';
  return html`<div class="summary-card">
  <${GridContainer} flexEnd>
    <${GridItem}>
      <div class="date">${date}</div>
    </${GridItem}>
  </${GridContainer}>

  <hr />

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="branch">${displayEnv} ${displayBranch}</div>
    </${GridItem}>
  </${GridContainer}>

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="status">${status?.toUpperCase()} TESTS</div>
    </${GridItem}>
  </${GridContainer}>

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="cnt-percent">
        <span class="cnt">
          ${cnt}
        </span>
      </div>
    </${GridItem}>
  </${GridContainer}>

  <${GridContainer} spaceAround>
      <${GridItem}>
      <div class="details" onClick=${resetStatusFilter}>
        <${Clickable}>
          View Details
        </${Clickable}> 
      </div>
    </${GridItem}>
  </${GridContainer}>
  
  </div> `;
}
