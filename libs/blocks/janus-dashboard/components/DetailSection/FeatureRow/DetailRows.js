import { html } from '../../../../../deps/htm-preact.js';
import DetailRow from './DetailRow.js';

export default function DetailRows({ data }) {
  if (data.length === 0) {
    return 'No data for this status';
  }
  const rows = data.map((d) => html`<${DetailRow} data=${d} />`);
  return html`<table class="detail-rows-table">
    <tr class="detail-rows-row">
      <th>Branch</th>
      <th>Status</th>
      <th>Browser</th>
      <th>Env</th>
      <th>Tag</th>
      <th>Error Msg</th>
    </tr>
    ${rows}
  </table>`;
}
