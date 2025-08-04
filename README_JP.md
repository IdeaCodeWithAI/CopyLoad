# CopyLoad - Chrome 拡張機能

<div align="center">
  <img src="icons/icon128.png" alt="CopyLoad ロゴ" width="128" height="128">
  <h3>スマートなクリップボード管理ツール</h3>
  <p>コピーしたテキストを保存・管理・検索できる強力な Chrome/Edge 拡張機能</p>

  [![Chrome ウェブストア](https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue?logo=google-chrome)](https://chrome.google.com/webstore)
  [![Edge アドオン](https://img.shields.io/badge/Edge%20Add--ons-Install-blue?logo=microsoft-edge)](https://microsoftedge.microsoft.com/addons)
  [![ライセンス](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![言語](https://img.shields.io/badge/Language-Vietnamese-red.svg)](README.md)
  [![言語](https://img.shields.io/badge/Language-English-blue.svg)](README_EN.md)
</div>
<p align="center">
日本語 | <a href="https://github.com/anhhackta/CopyLoad-Extension/blob/main/README_EN.md">English</a> | <a href="https://github.com/anhhackta/CopyLoad-Extension/blob/main/README.md">Tiếng Việt</a>
</p>

---

## 🌟 主な機能

### ✨ **スマート保存**
- **自動保存**：Ctrl+Cでコピー時に自動保存
- **手動保存**：右クリックメニューから保存
- **2種類の保存タイプ**：一時保存と永続保存に分類
- **「temp」タグ**：一時保存されたクリップボードにタグ付け

### 🎨 **モダンなUI**
- **ダーク／ライトモード**：3種類のテーマをサポート（ライト／ダーク／システムに従う）
- **多言語対応**：ベトナム語と英語に対応
- **レスポンシブ**：あらゆる画面サイズに対応
- **プロフェッショナルな配色**：美しくモダンな色使い

### 🔍 **検索・管理**
- **リアルタイム検索**：即座に検索結果を表示
- **カウンター**：保存済みの件数を表示
- **ワンクリックコピー**：クリックで簡単にコピー
- **削除機能**：1件ずつ削除または一括削除が可能

### 💾 **柔軟な保存オプション**
- **「ローカル保存」トグル**：
  - **オン**：永続的に保存（ブラウザを閉じても残る）
  - **オフ**：一時的に保存（ブラウザを閉じると消える）
- **ダウンロード機能**：すべてのテキストを .txt ファイルで保存可能
- **保存件数の制限なし**

---

## 📦 インストール方法

### 方法1：ZIPファイルからインストール（推奨）

1. [releases](../../releases) から ZIP をダウンロード
2. ZIP を解凍
3. Chrome/Edge で `chrome://extensions/` を開く
4. 「デベロッパーモード」を有効にする
5. 「パッケージ化されていない拡張機能を読み込む」をクリック
6. 解凍したフォルダを選択
7. 完了！

### 方法2：Chrome Web Store（❌）

1. [Chrome Web Store](https://chrome.google.com/webstore) にアクセス
2. 「CopyLoad」で検索
3. 「Chrome に追加」をクリック
4. インストールを確認

### 方法3：Edge Add-ons（❌）

1. [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons) にアクセス
2. 「CopyLoad」で検索
3. 「取得」をクリック
4. インストールを確認

---

## 🚀 使い方ガイド

### 📋 **クリップボードの保存**

#### 自動保存（Ctrl+C）
1. ウェブ上のテキストを選択
2. Ctrl+C（Macは Cmd+C）を押す
3. 自動的に保存される
4. 「temp」タグがある場合＝一時保存、ない場合＝永続保存

#### 手動保存（右クリック）
1. テキストを選択
2. 右クリック
3. 「クリップボードに保存」を選択
4. 永続的に保存される（タグなし）

### ⚙️ **保存設定**

#### 「Ctrl+Cで保存」トグル
- **オン**：コピーで自動保存
- **オフ**：コピーしても保存されない

#### 「ローカル保存」トグル（重要！）
- **オン**：保存は永続（ブラウザを閉じても残る）
- **オフ**：保存は一時（タグあり、閉じると消える）

### 🎨 **UIカスタマイズ**

#### 言語変更
1. 言語ドロップダウンをクリック（VN/EN）
2. 希望の言語を選択
3. 即時に変更反映

#### テーマ変更
1. テーマドロップダウンをクリック（🌙）
2. 好きなモードを選択（☀️/🌙/🖥️）
3. 即時に適用される

### 🔍 **管理と検索**

#### 検索
1. キーワードを入力
2. 即座に検索結果が表示
3. 件数カウンターも表示

#### コピー
1. 「Copy」ボタンをクリック
2. システムのクリップボードにコピー
3. 成功通知が表示される

#### 削除
1. 「Del」ボタンをクリック
2. 選択した項目が削除される
3. 成功通知が表示される

#### 全削除
1. 「すべて削除」ボタンをクリック
2. モーダルで確認
3. 全項目が削除される

#### ダウンロード
1. 「Download」ボタンをクリック
2. .txt ファイルがダウンロードされる
3. 保存済みのすべての内容が含まれる

---

## 🔧 ファイル構成
```
CopyLoad/
├── manifest.json # 拡張機能の設定
├── background.js # バックグラウンド処理
├── content.js # イベントリスナー
├── popup.html # ポップアップUI
├── popup.css # UI用スタイル
├── popup.js # UI用スクリプト
├── icons/ # アイコンフォルダ
│ ├── icon16.png
│ ├── icon48.png
│ ├── icon128.png
│ └── icon.svg
├── README.md # ベトナム語の説明書
├── README_EN.md # 英語の説明書
├── README_JP.md # 日本語の説明書
└── LICENSE # MITライセンス
```

---

## 🎯 詳細機能

### 📊 **スマートな統計**
- **リアルタイムカウンター**
- **分類**：「temp」タグによる区別
- **検索**：すぐに見つかる

### 🔄 **保存・同期**
- **永続保存**：`chrome.storage.local` に保存
- **一時保存**：`chrome.storage.session` に保存
- **タブ間同期**：自動で最新状態を共有

### 🛡️ **セキュリティとプライバシー**
- **ローカル保存のみ**：データは外部に送信されない
- **最小限の権限のみ要求**

---

## 🐛 よくある問題と対処法

### 拡張機能が動かない
1. 権限を確認（拡張機能がサイトにアクセスできるか）
2. `chrome://extensions/` で「再読み込み」
3. DevToolsでエラー確認

### Ctrl+C で保存されない
1. トグル「Ctrl+Cで保存」がオンになっているか確認
2. 一部サイトではコピーイベントがブロックされている場合あり
3. 手動保存を試す

### クリップボードが消えた
1. 「ローカル保存」トグルがオフなら一時保存になる
2. DevTools > Application > Storage で保存内容を確認

### 「temp」タグが表示されない
1. 「ローカル保存」トグルがオフであることを確認
2. 拡張機能を再読み込み
3. 一時保存のみタグが付与される

---

## 🤝 コントリビュート歓迎！

1. このリポジトリを Fork
2. 新しいブランチを作成（例: `feature/AmazingFeature`）
3. コミットして変更を記録
4. プッシュ
5. Pull Request を作成！

### 🐛 バグ報告
- 詳細な Issue を作成
- スクリーンショットがあれば添付
- 再現手順を記載

### 💡 機能提案
- Issue を作成し、ラベル "enhancement" を付ける
- 詳細な説明と利点を記載

---

## 📄 ライセンス

このプロジェクトは MIT ライセンスのもとで提供されています。詳細は [LICENSE](LICENSE) をご確認ください。

---

## 👨‍💻 作者

**Nguyễn Bá Hoàng**

- 🌐 **ウェブサイト**：[anhhackta.com](https://anhhackta.com)
- 📧 **メール**：[contact@anhhackta.com](mailto:contact@anhhackta.com)
- 💬 **Facebook**：[facebook.com/anhhackta.official](https://facebook.com/anhhackta.official)
- 💰 **支援**：[PayPal](https://paypal.me/bahoang2k2)
- 📂 **GitHub**：[github.com/anhhackta](https://github.com/anhhackta)

---

## ⭐ 評価・サポート

この拡張機能が気に入ったら：

- ⭐ リポジトリにスターを付ける
- 📝 Chrome Web Store でレビューを書く
- 💰 作者を支援（PayPal）
- 📢 友達にシェア

---

<div align="center">
  <p>❤️ 制作：<a href="https://github.com/anhhackta">Nguyễn Bá Hoàng</a></p>
  <p>サポートはこちら：<a href="https://paypal.me/bahoang2k2">PayPal</a> | <a href="https://facebook.com/anhhackta.official">Facebook</a></p>
</div>
