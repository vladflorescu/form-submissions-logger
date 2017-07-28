function render(json) {
  const websites = JSON.parse(json || "{}");

  const lists = Object.keys(websites).map(key => {
    const $div = $('<div>');
    $div.append(`<em>${key}</em>`);
    $div.append(websites[key].map(entry => `
      <dl>
        ${Object.keys(entry).map(entryKey => `
          <dd>${entryKey}: ${entry[entryKey]}</dd>
        `).join('')}
      </dl>
    `).join(''));

    return $div.html();
  });

  $('#content').html(lists.length > 0 ? lists.join(`<hr style="margin-left: -${$(document.body).css('marginLeft')}" />`) : 'No entries available');
}

$(document).ready(() => {
  $( "#datepicker").datepicker().datepicker('setDate', new Date()).on('change', event => {
    chrome.extension.sendRequest({
      action: 'query',
      params: { date: $(event.currentTarget).datepicker('getDate').toDateString() },
    }, render);
  });

  chrome.extension.sendRequest({
    action: 'query',
    params: { date: (new Date()).toDateString() },
  }, render);
});
