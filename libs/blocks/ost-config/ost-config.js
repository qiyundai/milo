import { createTag } from '../../utils/utils.js';

function createOstContainer() {
  const container = createTag('div', {class: 'ost-container'});
  const header = createTag('div', {class: 'ost-header'});
  const title = createTag('h1', {class: 'ost-title'});
  title.innerText = 'Offer Selector Tool';
  header.appendChild(title);
  container.appendChild(header);
  return container;
}
