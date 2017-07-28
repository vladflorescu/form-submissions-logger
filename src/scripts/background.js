chrome.extension.onRequest.addListener(function(request, tab, respond) {
  switch (request.action) {
    case 'store': store(request.data);
      break;
    case 'query': query(request.params || {}, respond);
      break;
  }
});

function store([href, data]) {
  const currentDateStr = (new Date()).toDateString();

  const res = JSON.parse(localStorage['fsl']) || {};
  if (!res[currentDateStr]) res[currentDateStr] = {};
  if (!res[currentDateStr][href]) res[currentDateStr][href] = [];
  res[currentDateStr][href].push(data);

  localStorage['fsl'] = JSON.stringify(res);
}

function query(params, cb) {
  const date = params.date;
  cb(date ? JSON.stringify(JSON.parse(localStorage['fsl'])[date]) : localStorage['fsl']);
}
