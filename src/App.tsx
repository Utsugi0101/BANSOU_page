import { useEffect, useState } from 'react';
import './App.css';

type Route = 'overview' | 'system' | 'adoption' | 'about';

const routeItems: Array<{ id: Route; label: string }> = [
  { id: 'overview', label: '概要' },
  { id: 'system', label: 'システム' },
  { id: 'adoption', label: '導入' },
  { id: 'about', label: 'BANSOUについて' },
];

function parseHashRoute(hash: string): Route {
  const normalized = hash.replace(/^#\/?/, '').trim();
  if (normalized === 'system') return 'system';
  if (normalized === 'adoption') return 'adoption';
  if (normalized === 'about') return 'about';
  return 'overview';
}

function toHash(route: Route): string {
  return `#/${route}`;
}

function App() {
  const [route, setRoute] = useState<Route>(() =>
    parseHashRoute(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHashRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = toHash('overview');
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href={toHash('overview')}>
            BANSOU
          </a>
          <nav className="header-nav" aria-label="Main navigation">
            {routeItems.map((item) => (
              <a
                key={item.id}
                href={toHash(item.id)}
                className={item.id === route ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div className="hero-main">
            <p className="eyebrow">理解を確認してからマージする</p>
            <h1>未理解のまま進めない、開発フローへ。</h1>
            <p className="hero-copy">
              BANSOUは、差分理解クイズとPRゲートを接続して、
              生成AIを使う開発でも「その変更を説明できるか」を確かめるための仕組みです。
            </p>
          </div>
          <div className="hero-side" aria-hidden="true">
            <div className="hero-chip">
              <span>流れ</span>
              <strong>クイズ → 合格 → ゲート通過</strong>
            </div>
            <div className="hero-chip">
              <span>運用</span>
              <strong>サーバー台帳で証明を管理</strong>
            </div>
            <div className="hero-chip">
              <span>対象</span>
              <strong>チーム開発の継続運用</strong>
            </div>
          </div>
        </section>

        {route === 'overview' && <OverviewPage />}
        {route === 'system' && <SystemPage />}
        {route === 'adoption' && <AdoptionPage />}
        {route === 'about' && <AboutPage />}
      </main>
    </div>
  );
}

function OverviewPage() {
  return (
    <section className="section">
      <header className="section-head">
        <span>01</span>
        <h2>概要</h2>
      </header>
      <p>
        生成AIの活用で実装速度は上がりましたが、変更の背景や挙動を十分に説明できないまま
        開発が進む場面も増えています。BANSOUは、レビュー前に理解確認を行い、
        その結果をPRの判定に結びつけることで、品質と運用の安定を狙います。
      </p>
      <div className="cards three">
        <article className="card">
          <h3>問題</h3>
          <ul>
            <li>未理解の変更が本番へ入りやすい</li>
            <li>レビューの指摘が属人的になりやすい</li>
            <li>保守時に変更意図を追いにくくなる</li>
          </ul>
        </article>
        <article className="card">
          <h3>対応</h3>
          <ul>
            <li>差分単位の理解クイズ</li>
            <li>合格証明のサーバー管理</li>
            <li>PR時の自動判定ゲート</li>
          </ul>
        </article>
        <article className="card">
          <h3>得られること</h3>
          <ul>
            <li>変更内容の説明可能性が上がる</li>
            <li>レビュー観点が揃いやすくなる</li>
            <li>運用時の理解コストを下げられる</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function SystemPage() {
  return (
    <section className="section">
      <header className="section-head">
        <span>02</span>
        <h2>システム</h2>
      </header>
      <p>BANSOUは、拡張機能・サーバー・GitHub Actionの3要素で動作します。</p>
      <div className="cards three">
        <article className="card">
          <h3>VSCode拡張</h3>
          <p>差分の取得、クイズ表示、回答送信を担当します。</p>
        </article>
        <article className="card">
          <h3>BANSOU Server</h3>
          <p>クイズ生成・採点・証明発行・台帳保存・判定APIを担当します。</p>
        </article>
        <article className="card">
          <h3>GitHub Action</h3>
          <p>PR差分と証明の整合を確認し、マージ可否を判定します。</p>
        </article>
      </div>
      <div className="diagram">
        <div className="node">実装者・レビュワー</div>
        <div className="node">VSCode拡張</div>
        <div className="node">サーバー</div>
        <div className="node">GitHub Action</div>
        <div className="node">PR / Merge Gate</div>
      </div>
      <article className="flow">
        <h3>処理フロー</h3>
        <ol>
          <li>差分を取り込み、クイズを生成する</li>
          <li>回答をサーバーで採点する</li>
          <li>合格結果を証明として保存する</li>
          <li>PR時に証明の有無を検証する</li>
          <li>条件を満たした変更のみマージする</li>
        </ol>
      </article>
    </section>
  );
}

function AdoptionPage() {
  return (
    <section className="section">
      <header className="section-head">
        <span>03</span>
        <h2>導入</h2>
      </header>
      <p>最小構成で始められる手順です。まず検証し、運用に合わせて必須化できます。</p>
      <article className="card">
        <h3>導入ステップ</h3>
        <ol>
          <li>サーバーをデプロイし、必要な変数・シークレットを設定する</li>
          <li>GitHub ActionをPRワークフローへ追加する</li>
          <li>拡張機能でサーバーURLと利用者IDを設定する</li>
          <li>Required Checkに検証ジョブを登録する</li>
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
  );
}

function AboutPage() {
  return (
    <section className="section">
      <header className="section-head">
        <span>04</span>
        <h2>BANSOUについて</h2>
      </header>
      <p>
        BANSOUは「生成を止める」ための仕組みではなく、
        生成した変更を理解し、説明できる状態で運用するための仕組みです。
      </p>
      <div className="cards two">
        <article className="card">
          <h3>SecHack365</h3>
          <p>ここにSecHack365でのテーマ背景、取り組んだ課題、開発の狙いを書けます。</p>
        </article>
        <article className="card">
          <h3>開発者プロフィール</h3>
          <p>ここにあなた自身の紹介、問題意識、今後の展望を記載できます。</p>
        </article>
      </div>
      <blockquote className="concept">
        BANSOUはコードを書くためのツールではない。理解をCIに組み込む仕組みである。
      </blockquote>
    </section>
  );
}

export default App;
