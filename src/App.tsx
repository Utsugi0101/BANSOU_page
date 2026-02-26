import { useMemo, useState } from 'react';
import './App.css';

type PageId = 'overview' | 'system' | 'adoption' | 'about';

type NavItem = {
  id: PageId;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'overview', label: 'トップ' },
  { id: 'system', label: 'システム' },
  { id: 'adoption', label: '導入' },
  { id: 'about', label: 'BANSOUについて' },
];

function App() {
  const [page, setPage] = useState<PageId>('overview');
  const current = useMemo(() => navItems.find((item) => item.id === page), [page]);

  return (
    <div className="layout">
      <header className="hero">
        <p className="hero-tag">UNDERSTANDING GATE FOR AI ERA</p>
        <h1>BANSOU</h1>
        <p className="hero-copy">
          理解をCIに組み込む。生成AI時代の開発チーム向けに、
          <br />
          「読めているコードだけを本番へ」運ぶ仕組み。
        </p>
        <nav className="main-nav" aria-label="BANSOU pages">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-pill ${item.id === page ? 'active' : ''}`}
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="panel">
        <p className="section-label">{current?.label}</p>
        {page === 'overview' && <OverviewPage />}
        {page === 'system' && <SystemPage />}
        {page === 'adoption' && <AdoptionPage />}
        {page === 'about' && <AboutPage />}
      </main>
    </div>
  );
}

function OverviewPage() {
  return (
    <section className="section-grid">
      <article className="feature-card">
        <h2>概要</h2>
        <p>
          BANSOUは、実装差分への理解クイズと証明トークンを使って、
          マージ前に「理解したこと」を可視化・検証する仕組みです。
        </p>
      </article>
      <article className="feature-card">
        <h2>解くべき課題</h2>
        <ul>
          <li>未理解コードの本番流入</li>
          <li>レビュー負荷の偏り</li>
          <li>生成AI導入後の保守品質低下</li>
        </ul>
      </article>
      <article className="feature-card full">
        <h2>コア体験</h2>
        <ol>
          <li>差分を検知してクイズ生成</li>
          <li>回答・評価で理解を確認</li>
          <li>証明をサーバー台帳へ保存</li>
          <li>PRゲートでマージ可否を自動判定</li>
        </ol>
      </article>
    </section>
  );
}

function SystemPage() {
  return (
    <section className="section-grid">
      <article className="feature-card">
        <h2>VSCode Extension</h2>
        <p>差分取得、クイズUI、回答送信を担当。開発者が最初に触れる入口です。</p>
      </article>
      <article className="feature-card">
        <h2>BANSOU Server</h2>
        <p>
          クイズ生成・採点・attestation発行・ledger保存・gate評価を一元的に提供します。
        </p>
      </article>
      <article className="feature-card">
        <h2>GitHub Action</h2>
        <p>
          PR差分を取得し、サーバーの <code>/gate/evaluate</code> を照会してマージ可否を判定します。
        </p>
      </article>
      <article className="feature-card full">
        <h2>技術スタック</h2>
        <ul className="chip-list">
          <li>VSCode Extension API</li>
          <li>Cloudflare Workers + D1</li>
          <li>JWT (EdDSA / JWKS)</li>
          <li>GitHub Actions</li>
          <li>OpenAI API (Quiz generation)</li>
        </ul>
      </article>
    </section>
  );
}

function AdoptionPage() {
  return (
    <section className="section-grid">
      <article className="feature-card full">
        <h2>導入ステップ</h2>
        <ol>
          <li>BANSOU Server をデプロイし、ISSUER/JWKS/GATE API TOKEN を設定</li>
          <li>リポジトリへ BANSOU Action workflow を追加</li>
          <li>VSCode拡張で server URL と sub を設定</li>
          <li>ブランチ保護で Verify BANSOU Token を Required Check にする</li>
        </ol>
      </article>
      <article className="feature-card full">
        <h2>最小設定例</h2>
        <pre>
          <code>{`issuer: https://bansou-server.example.workers.dev
jwks_url: https://bansou-server.example.workers.dev/.well-known/jwks.json
gate_url: https://bansou-server.example.workers.dev`}</code>
        </pre>
      </article>
      <article className="feature-card full">
        <h2>公開URL</h2>
        <ul>
          <li>
            VSCode Marketplace:{' '}
            <a href="https://marketplace.visualstudio.com/items?itemName=utsugi0101.bansou" target="_blank" rel="noreferrer">
              https://marketplace.visualstudio.com/items?itemName=utsugi0101.bansou
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section-grid">
      <article className="feature-card">
        <h2>SecHack365について</h2>
        <p>
          この枠にSecHack365の参加テーマや活動背景、なぜBANSOUを作るに至ったかを記載できます。
        </p>
      </article>
      <article className="feature-card">
        <h2>開発者プロフィール</h2>
        <p>
          ここにあなたの経歴、問題意識、今後の展望を記載してください。
          チームや採用向け説明としても使えるセクションです。
        </p>
      </article>
      <article className="feature-card full">
        <h2>コンセプト</h2>
        <blockquote>「BANSOUはコードを書くためのツールではない。理解をCIに組み込む仕組みである。」</blockquote>
      </article>
    </section>
  );
}

export default App;
