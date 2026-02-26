import './App.css';

function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top">
            BANSOU
          </a>
          <nav className="header-nav" aria-label="Main navigation">
            <a href="#overview">概要</a>
            <a href="#system">システム</a>
            <a href="#adoption">導入</a>
            <a href="#about">BANSOUについて</a>
          </nav>
        </div>
      </header>

      <main id="top" className="content">
        <section className="hero">
          <p className="eyebrow">UNDERSTANDING BEFORE MERGE</p>
          <h1>理解していないコードを、本番に入れない。</h1>
          <p>
            BANSOUは、差分理解クイズとPRゲートを接続して、
            チームの開発品質を守るための仕組みです。
          </p>
        </section>

        <section id="overview" className="section">
          <h2>1. 概要</h2>
          <p>
            生成AI時代では、実装スピードの向上と引き換えに「未理解のままの実装」が増えます。
            BANSOUは、レビュー前に理解を確認し、理解の証明をCIに組み込むことで、
            品質低下とレビュー負荷の偏りを減らします。
          </p>
          <div className="cards three">
            <article className="card">
              <h3>問題</h3>
              <ul>
                <li>未理解コードの本番流入</li>
                <li>セキュリティリスクの見落とし</li>
                <li>保守運用の属人化</li>
              </ul>
            </article>
            <article className="card">
              <h3>解決</h3>
              <ul>
                <li>差分単位の理解クイズ</li>
                <li>合格証明のサーバー管理</li>
                <li>PR時の自動ゲート判定</li>
              </ul>
            </article>
            <article className="card">
              <h3>価値</h3>
              <ul>
                <li>レビューの質を上げる</li>
                <li>チーム全体の理解を可視化</li>
                <li>説明可能な開発プロセス</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="system" className="section">
          <h2>2. システム</h2>
          <p>BANSOUは3つのコンポーネントで構成されます。</p>
          <div className="cards three">
            <article className="card">
              <h3>VSCode Extension</h3>
              <p>差分抽出、クイズ表示、回答送信を担当。</p>
            </article>
            <article className="card">
              <h3>BANSOU Server</h3>
              <p>クイズ生成、採点、証明発行、ledger保存、gate判定を担当。</p>
            </article>
            <article className="card">
              <h3>GitHub Action</h3>
              <p>PR差分とledgerの整合を確認し、マージ可否を判定。</p>
            </article>
          </div>
          <article className="flow">
            <h3>処理フロー</h3>
            <ol>
              <li>差分検知</li>
              <li>クイズ生成</li>
              <li>回答と採点</li>
              <li>証明保存</li>
              <li>PRゲート判定</li>
            </ol>
          </article>
        </section>

        <section id="adoption" className="section">
          <h2>3. 導入</h2>
          <p>最小の導入手順です。小さく始めて、徐々に必須化できます。</p>
          <article className="card">
            <h3>導入ステップ</h3>
            <ol>
              <li>Server をデプロイし、ISSUER/JWKS/GATE TOKEN を設定</li>
              <li>Action をワークフローへ追加</li>
              <li>拡張機能で Server URL と user(sub) を設定</li>
              <li>Required Check に `Verify BANSOU Token` を設定</li>
            </ol>
          </article>
          <article className="card">
            <h3>公開URL</h3>
            <ul>
              <li>
                VSCode Marketplace:{' '}
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=utsugi0101.bansou"
                  target="_blank"
                  rel="noreferrer"
                >
                  utsugi0101.bansou
                </a>
              </li>
            </ul>
          </article>
        </section>

        <section id="about" className="section">
          <h2>4. BANSOUについて</h2>
          <div className="cards two">
            <article className="card">
              <h3>SecHack365</h3>
              <p>
                ここにSecHack365でのテーマ背景、取り組んだ課題、開発の狙いを書けます。
              </p>
            </article>
            <article className="card">
              <h3>開発者プロフィール</h3>
              <p>
                ここにあなた自身の紹介、問題意識、今後の展望を記載できます。
              </p>
            </article>
          </div>
          <blockquote className="concept">
            BANSOUはコードを書くためのツールではない。理解をCIに組み込む仕組みである。
          </blockquote>
        </section>
      </main>
    </div>
  );
}

export default App;
