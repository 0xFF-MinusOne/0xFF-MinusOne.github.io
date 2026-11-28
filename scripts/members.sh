#!/bin/sh
# 組織の公開メンバーを取得して members.json を作る。
# 載るのは、GitHub でメンバーシップを「公開」にしている人だけ（本人の同意なしには載らない）。
# 使い方: ORG=0xFF-MinusOne sh scripts/members.sh > members.json   （GH_TOKEN があれば回数制限が緩くなる）
set -eu
ORG="${ORG:-0xFF-MinusOne}"
auth=""; [ -n "${GH_TOKEN:-}" ] && auth="Authorization: Bearer $GH_TOKEN"
get() { curl -fsSL -H "Accept: application/vnd.github+json" ${auth:+-H "$auth"} "$1"; }
logins=$(get "https://api.github.com/orgs/$ORG/public_members?per_page=100" | jq -r '.[].login')
for l in $logins; do get "https://api.github.com/users/$l"; done \
  | jq -s '{generated: (now | todate), members: map({login, name: (.name // .login), avatar: .avatar_url, url: .html_url, bio: (.bio // ""), site: ((.blog // "") | if . == "" then "" elif test("^https?://") then . else "https://" + . end)})}'
