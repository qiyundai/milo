(async function preflight() {
  const h1s = document.querySelectorAll('h1');

  const data = {
    url: window.location.href,
  };
  if (h1s.length > 1) {
    data.multiH1 = true;
  }

  const anchors = document.body.querySelectorAll('main a');

  anchors.forEach(async (a) => {
    const resp = fetch(a.href, { method: 'HEADER' });
    console.log(resp.status);
  });

  const resp = await fetch('http://localhost:3000/seo/preflight', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ data }), // body data type must match "Content-Type" header
  });

  const json = await resp.json();
  console.log(json);


}());
