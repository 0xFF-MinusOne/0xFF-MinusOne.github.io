/* メンバー一覧: 毎日 GitHub Actions が作る members.json を読んで描く(訪問者のブラウザは GitHub に問い合わせない) */
(function () {
  var list = document.getElementById('member-list');
  if (!list) return;
  var en = document.documentElement.lang === 'en';
  var T = en
    ? { none: 'No one has made their membership public yet.', all: 'See the organization’s members on GitHub' }
    : { none: 'メンバーを公開している人は、まだいません。', all: 'GitHub の組織のメンバー一覧を見る' };
  function text(tag, cls, value) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = value;
    return el;
  }
  fetch(list.dataset.src || 'members.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      list.textContent = '';
      var members = data.members || [];
      if (!members.length) { list.appendChild(text('div', 'empty', T.none)); return; }
      members.forEach(function (m) {
        var a = document.createElement('a');
        a.className = 'card member';
        a.href = m.url;
        a.rel = 'noopener';
        var img = document.createElement('img');
        img.src = m.avatar + (m.avatar.indexOf('?') < 0 ? '?s=96' : '&s=96');
        img.alt = '';
        img.width = 48; img.height = 48;
        img.loading = 'lazy';
        a.appendChild(img);
        a.appendChild(text('h3', '', m.name));
        a.appendChild(text('p', 'cat', '@' + m.login));
        if (m.bio) a.appendChild(text('p', 'desc', m.bio));
        list.appendChild(a);
      });
    })
    .catch(function () {
      list.textContent = '';
      var a = document.createElement('a');
      a.href = 'https://github.com/orgs/0xFF-MinusOne/people';
      a.textContent = T.all;
      list.appendChild(a);
    });
})();
