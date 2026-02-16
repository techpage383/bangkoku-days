# Site Bang - 在タイ日本人向けバンコクポータル

バンコク在住の日本人向けに、ライフスタイル情報・店舗発見・コミュニティ交流に特化した、Next.js 製の完全カスタムポータルサイトです。

## 🎯 プロジェクト状況

### ✅ 完了済み（バックエンド）
- Prisma によるデータベーススキーマ一式
- RESTful API エンドポイント（v1）
- 認証・認可（NextAuth.js）
- ロールベースアクセス制御
- 多言語対応（日本語 / 英語 / タイ語）
- 入力バリデーション（Zod）
- エラーハンドリング
- コンテンツ管理用管理系 API

### ❌ 未実装
- Stripe 決済連携
- 画像アップロード（R2/S3）
- メール通知
- Meilisearch 連携
- フロントエンド UI（管理画面・公開サイト）
- キャッシュ（Redis）
- レート制限

## 🚀 クイックスタート

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# .env を編集して認証情報などを設定

# データベースのセットアップ
npx prisma migrate dev --name init
npx prisma generate

# 管理者ユーザーの作成
npx tsx scripts/create-admin.ts

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 にアクセスしてください。

## 📚 ドキュメント

各種ガイドは `/guides` フォルダにあります。

- **[guides/QUICKSTART.md](./guides/QUICKSTART.md)** - 5分で始める
- **[guides/BACKEND_SETUP.md](./guides/BACKEND_SETUP.md)** - バックエンド詳細ガイド
- **[guides/API_DOCS.md](./guides/API_DOCS.md)** - API リファレンス
- **[guides/SUCCESS.md](./guides/SUCCESS.md)** - 完了済み項目一覧
- **[guides/FILE_STRUCTURE.md](./guides/FILE_STRUCTURE.md)** - プロジェクト構成

## 🏗️ 技術スタック

- **フレームワーク**: Next.js 16（App Router）
- **データベース**: PostgreSQL（Prisma ORM）
- **認証**: NextAuth.js
- **バリデーション**: Zod
- **スタイリング**: Tailwind CSS v4
- **UI コンポーネント**: Radix UI、shadcn
- **フォーム**: React Hook Form
- **リッチテキスト**: Tiptap

## 📁 プロジェクト構成

```
app/api/v1/          # API ルート
lib/                 # ユーティリティ・バリデーション
prisma/              # データベーススキーマ
scripts/             # セットアップ用スクリプト
guides/              # ドキュメント
```

## 🔐 認証

ロールベースのアクセス制御です。

- **SUPER_ADMIN**: システム全体の管理
- **ADMIN**: コンテンツ管理・モデレーション
- **EDITOR**: コンテンツ作成のみ

## 🌐 多言語対応

コンテンツは日本語（ja）・英語（en）・タイ語（th）に対応しています。

## 🎉 バックエンド完了

✅ データベーステーブル 17 個  
✅ API エンドポイント 17 個  
✅ 認証機能一式  
✅ ドキュメント完備  

フロントエンド開発に進める状態です。

## 📄 ライセンス

フリーランスクライアント向けの非公開プロジェクトです。
