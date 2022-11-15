import { html, useContext } from '../../../../deps/htm-preact.js';
import GridContainer from '../GridContainer.js';
import GridItem from '../GridItem.js';
import Clickable from '../Clickable.js';

export default function TotalCard({ status, branch, consumer, date, cnt }) {
  return html`<div class="summary-card">

  <${GridContainer} flexEnd>
    <${GridItem}>
      <div class="date">${date}</div>
    </${GridItem}>
  </${GridContainer}>

  <${GridContainer} spaceAround>
    <${GridItem}>
      <div class="branch">${consumer?.toUpperCase()} ${branch?.toUpperCase()}</div>
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
      <div class="details">
        <${Clickable}>
          View Details
        </${Clickable}> 
      </div>
    </${GridItem}>
  </${GridContainer}>
  
  </div> `;
}
