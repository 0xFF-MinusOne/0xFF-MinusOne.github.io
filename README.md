# 0xFF-MinusOne.github.io

0xFF-MinusOne の公開サイトです。https://0xff-minusone.github.io/

- 静的な HTML と CSS だけで作っています（ビルド不要）。見た目は、元の Hub のホーム（黒の背景、明朝体、斜めの面）を引き継ぎ、ロゴだけ 0xFF-MinusOne のデザインシステムの Eclipse マークにしています。
- 「メンバー」は、GitHub の組織で**メンバーシップを公開にしている人**が自動で載ります。`scripts/members.sh` が組織の公開メンバーを取得して `members.json` を作ります。GitHub Actions が毎日と、`main` への push のたびに実行します。
- 既定は英語（`index.html`）で、日本語は `ja/index.html` です。`en/index.html` は、古い URL を `/` へ転送するだけです。内容を直すときは、両方を同じように直してください。翻訳の一覧も、どちらにも直接書いています。サイトを増やしたら、カードを足してください。

ペンテストの案件管理など、メンバー用のツールは、このサイトとは別のところで動いています。
