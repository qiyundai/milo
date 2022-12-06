import { initOst } from '../../deps/ost-wrapper.js';

const loadOst = async (a) => {
  initOst(a);
};

export default function init(el) {
  if (document.location.pathname.includes('/tools/ost')) {
    console.log('it does');
    loadOst(el);
  }
}
