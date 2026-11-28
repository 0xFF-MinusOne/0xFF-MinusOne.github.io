/* メンバー一覧: 毎日 GitHub Actions が作る members.json を読んで描く(訪問者のブラウザは GitHub に問い合わせない) */
(function () {
  var list = document.getElementById('member-list');
  if (!list) return;
  var en = document.documentElement.lang === 'en';
  var T = en
    ? { none: 'No one has made their membership public yet.', all: 'See the organization’s members on GitHub', site: 'Portfolio', pick: 'Where to?' }
    : { none: 'メンバーを公開している人は、まだいません。', all: 'GitHub の組織のメンバー一覧を見る', site: 'ポートフォリオ', pick: 'どちらを開きますか' };
  var safe = function (u) { return /^https:\/\//.test(u || '') ? u : ''; };
  function go(href, label) {
    var a = text('a', '', label);
    a.href = href;
    a.rel = 'noopener';
    return a;
  }
  // 開いている選択肢を閉じる(ほかの場所を押したとき・Esc)
  function closeAll(except) {
    list.querySelectorAll('.member.open').forEach(function (c) {
      if (c === except) return;
      c.classList.remove('open');
      c.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', function (e) { if (!list.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
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
        var site = safe(m.site);
        var a;
        if (site) {
          // ポートフォリオがある人は、押すと GitHub かポートフォリオかを選べる
          a = document.createElement('div');
          a.className = 'card member pick';
          a.tabIndex = 0;
          a.setAttribute('role', 'button');
          a.setAttribute('aria-expanded', 'false');
          a.setAttribute('aria-label', m.name + ' — ' + T.pick);
          var toggle = function (e) {
            if (e.target.closest('.choose a')) return;
            var open = !a.classList.contains('open');
            closeAll(a);
            a.classList.toggle('open', open);
            a.setAttribute('aria-expanded', String(open));
          };
          a.addEventListener('click', toggle);
          a.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target === a) { e.preventDefault(); toggle(e); } });
        } else {
          a = document.createElement('a');
          a.className = 'card member';
          a.href = m.url;
          a.rel = 'noopener';
        }
        var img = document.createElement('img');
        img.src = m.avatar + (m.avatar.indexOf('?') < 0 ? '?s=96' : '&s=96');
        img.alt = '';
        img.width = 48; img.height = 48;
        img.loading = 'lazy';
        a.appendChild(img);
        a.appendChild(text('h3', '', m.name));
        a.appendChild(text('p', 'cat', '@' + m.login));
        if (m.bio) a.appendChild(text('p', 'desc', m.bio));
        if (site) {
          var choose = text('div', 'choose', '');
          choose.appendChild(go(m.url, 'GitHub'));
          choose.appendChild(go(site, T.site));
          a.appendChild(choose);
        }
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

/* 翻訳の一覧: 「もっと見る」で、残りを開く・閉じる */
(function () {
  var btn = document.querySelector('.more');
  var grid = document.getElementById('tr-grid');
  if (!btn || !grid) return;
  var hidden = grid.querySelectorAll('.extra').length;
  if (!hidden) { btn.hidden = true; return; }
  var label = function (open) { btn.textContent = open ? btn.dataset.less : btn.dataset.more + '  (+' + hidden + ')'; };
  label(false);
  btn.addEventListener('click', function () {
    var open = grid.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    label(open);
  });
})();
