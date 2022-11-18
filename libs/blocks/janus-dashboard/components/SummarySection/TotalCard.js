import { html, useContext } from '../../../../deps/htm-preact.js';
import { FilterContext, ActionTypes } from '../../wrappers/FilterWrapper.js';
import { DataContext } from '../../wrappers/FetchDataWrapper.js';
import GridContainer from '../GridContainer.js';
import GridItem from '../GridItem.js';
import Clickable from '../Clickable.js';
import Dropdown from '../Dropdown.js';

export default function TotalCard({ status, date, cnt }) {
  const { dispatch, state: filterState } = useContext(FilterContext);
  const { envs } = useContext(DataContext);
  const { branch, env } = filterState;
  const envOptions = [
    { value: null, text: 'All' },
    ...envs.map((c) => ({ value: c, text: c })),
  ];
  const resetStatusFilter = () => {
    dispatch({
      type: ActionTypes.SET_STATE,
      payload: { status: null, showDetail: true },
    });
  };

  const displayEnv = env?.toUpperCase() || 'All Envs';
  const displayBranch = branch?.toUpperCase() || 'MAIN';
  return html`<div class="summary-card">
  <${GridContainer} flexEnd>
    <${GridItem}>
      <div class="date">${date}</div>
    </${GridItem}>
  </${GridContainer}>

  <${GridContainer} flexStart>
    <${GridItem}>
      <${Dropdown} options=${envOptions} onSelect=${(value) =>
        dispatch({
          type: ActionTypes.SET_STATE,
          payload: { env: value, showDetail: true },
        })} value=${env} labelText="Env" />
    </${GridItem}>
  </${GridContainer}>

  <hr />

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="status">${status?.toUpperCase()} TESTS</div>
    </${GridItem}>
  </${GridContainer}>

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="cnt-percent">
        <span class="cnt-total">
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
