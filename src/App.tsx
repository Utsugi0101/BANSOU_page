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
            <p className="eyebrow">理解確認を前提としたマージ判定</p>
            <h1>変更内容を説明可能な状態で、開発を前進させる。</h1>
            <p className="hero-copy">
              BANSOUは、差分理解クイズとPRゲートを接続し、
              変更理解の確認を開発フローに組み込みます。
            </p>
          </div>
          <div className="hero-side" aria-hidden="true">
            <div className="hero-chip">
              <span>流れ</span>
              <strong>クイズ実施 → 合格判定 → ゲート検証</strong>
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
        生成AI活用で実装速度は向上しました。一方で、変更意図や影響範囲の共有不足が課題です。
        BANSOUは理解確認をPR判定と接続し、品質と保守性の維持を支援します。
      </p>
      <div className="cards three">
        <article className="card">
          <h3>問題</h3>
          <ul>
            <li>未理解の変更が本番へ入りやすい</li>
            <li>レビュー観点が属人化しやすい</li>
            <li>保守時に変更意図を追いにくい</li>
          </ul>
        </article>
        <article className="card">
          <h3>対応方針</h3>
          <ul>
            <li>差分単位の理解クイズ</li>
            <li>合格証明のサーバー管理</li>
            <li>PR時の自動判定ゲート</li>
          </ul>
        </article>
        <article className="card">
          <h3>期待効果</h3>
          <ul>
            <li>説明可能性の向上</li>
            <li>レビュー品質の平準化</li>
            <li>運用時の理解コスト低減</li>
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
      <p>拡張機能・サーバー・GitHub Actionの3要素で構成されます。</p>
      <div className="cards three">
        <article className="card">
          <h3>VSCode拡張</h3>
          <p>差分取得、クイズ表示、回答送信を担当。</p>
        </article>
        <article className="card">
          <h3>BANSOU Server</h3>
          <p>クイズ生成、採点、証明発行、台帳保存、判定APIを担当。</p>
        </article>
        <article className="card">
          <h3>GitHub Action</h3>
          <p>PR差分と証明を照合し、マージ可否を判定。</p>
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
          <li>差分からクイズを生成</li>
          <li>サーバーで採点</li>
          <li>合格結果を証明として保存</li>
          <li>PR時に証明を検証</li>
          <li>条件充足時のみマージ可能</li>
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
      <p>最小構成での導入手順です。検証後に必須化できます。</p>
      <article className="card">
        <h3>導入ステップ</h3>
        <ol>
          <li>サーバーをデプロイし、必要な変数・シークレットを設定する</li>
          <li>GitHub ActionをPRワークフローへ追加する</li>
          <li>拡張機能でサーバーURLと利用者ID（sub）を設定する</li>
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
        BANSOUは生成AI利用を止める仕組みではなく、
        生成された変更を理解可能な状態で運用するための基盤です。
      </p>
      <div className="cards two">
        <article className="card">
          <h3>SecHack365</h3>
          <p>ここにSecHack365での取り組み背景、課題設定、開発意図を記載できます。</p>
        </article>
        <article className="card">
          <h3>開発者プロフィール</h3>
          <p>ここに開発者の経歴、問題意識、今後の展望を記載できます。</p>
        </article>
      </div>
      <blockquote className="concept">
        BANSOUはコードを書くためのツールではない。理解をCIに組み込む仕組みである。
      </blockquote>
    </section>
  );
}

export default App;
