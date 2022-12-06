import { initOst } from '../../deps/ost-wrapper.js';


const loadOst = async (a) => {
  console.log("hello");
  initOst(a);
};

export default function init(el) {
  if (document.location.pathname.includes('/tools/ost')) {
    console.log("it does");
    loadOst(el);
  } else {
    console.log(document.location.pathname);
  }
}
