# L'orto della Nonna

フロントエンドにNext.js + TypeScript、バックエンドにLaravel + PostgreSQLを使用して作成した、商品管理、販売が出来るサンプルアプリケーション。
Vercel / Railwayにデプロイしていて、ユーザー登録・ログイン、商品閲覧、カート管理、画像アップロードなどが可能です。

## 技術スタック

### フロントエンド

- Next.js (App Router)
- TypeScript
- Axios
- react-dropzone
- Tailwind / CSS Modules
- Jest + @testing-library/react

### バックエンド

- PHP 8.2
- Laravel 12
- Breeze 2.3
- AWS S3（画像アップロード）
- PostgreSQL

## デプロイ
- Frontend: Vercel
- Backend: Railway


## 機能概要

- Userテーブルと別にAdminテーブルを作成して、一般ユーザーと管理者分けをし、管理者にもBossとEditorに分けました。
- 管理者ページは一般ユーザーは見れない。Bossは全権限を持ち、Editorは商品管理全てとオーダーの状態管理だけ出来る。
### 管理者
- 商品登録（画像付き）、編集、削除が出来て、検索機能も作成しました。
- カテゴリーを作成でき、トップページで「特売」「旬」「限定商品」を表示出来る
- 注文管理（支払い済み、発送済み、発送完了、キャンセル）を選択出来る。
- ユーザー管理で権限を変更出来る。

### 一般ユーザー
- 商品一覧ページで商品を検索できカート機能がある。
- カート内容ページから注文ができ、購入履歴を見れる。
