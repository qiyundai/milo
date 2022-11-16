import { html, useContext } from '../../../../deps/htm-preact.js';
import { FilterContext, ActionTypes } from '../../wrappers/FilterWrapper.js';
import GridContainer from '../GridContainer.js';
import GridItem from '../GridItem.js';
import Clickable from '../Clickable.js';

export default function TotalCard({ status, branch, env, date, cnt }) {
  const { dispatch, state: filterState } = useContext(FilterContext);
  const resetStatusFilter = () => {
    dispatch({
      type: ActionTypes.SET_STATE,
      payload: { status: null, showDetail: true },
    });
  };

  return html`<div class="summary-card">
  <${GridContainer} flexEnd>
    <${GridItem}>
      <div class="date">${date}</div>
    </${GridItem}>
  </${GridContainer}>

  <hr />

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="branch">${env?.toUpperCase()} ${branch?.toUpperCase()}</div>
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
