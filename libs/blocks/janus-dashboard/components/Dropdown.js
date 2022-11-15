import { html, useContext, useState } from '../../../deps/htm-preact.js';

export default function Dropdown({ options, onSelect, value }) {
  const optionSelections = options.map(
    (o, i) => html`<option
      key=${o}
      selected=${o.value === value}
      value=${o.value}
    >
      ${o.text}
    </option>`
  );

  return html`<div>
    <select
      onChange=${(e) => {
        onSelect(e.target.value);
      }}
    >
      ${optionSelections}
    </select>
  </div>`;
}
