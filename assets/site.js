/* メンバー一覧: 毎日 GitHub Actions が作る members.json を読んで描く(訪問者のブラウザは GitHub に問い合わせない) */
(function () {
  var list = document.getElementById('member-list');
  if (!list) return;
  function text(tag, cls, value) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = value;
    return el;
  }
  fetch('members.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      list.textContent = '';
      var members = data.members || [];
      if (!members.length) { list.appendChild(text('div', 'empty', 'メンバーを公開している人は、まだいません。')); return; }
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
        a.appendChild(text('span', 'meta', '@' + m.login));
        if (m.bio) a.appendChild(text('p', 'small muted', m.bio));
        list.appendChild(a);
      });
    })
    .catch(function () {
      list.textContent = '';
      var a = document.createElement('a');
      a.href = 'https://github.com/orgs/0xFF-MinusOne/people';
      a.textContent = 'GitHub の組織のメンバー一覧を見る';
      list.appendChild(a);
    });
})();
