import { html } from '../../../../../deps/htm-preact.js';

export default function DetailRow({ data, rowNum }) {
  const { branch, status, browser, name: env, tag, errorMessage = '' } = data;

  return html`<tr class="detail-rows-row">
    <td class="detail-rows-cell">${rowNum}</td>
    <td class="detail-rows-cell">${branch}</td>
    <td class="detail-rows-cell">${status}</td>
    <td class="detail-rows-cell">${browser}</td>
    <td class="detail-rows-cell">${env}</td>
    <td class="detail-rows-cell">${tag}</td>
    <td class="detail-rows-cell">${errorMessage}</td>
  </tr>`;
}
