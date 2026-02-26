import { useEffect, useState } from 'react';
import './App.css';

type Route = 'overview' | 'system' | 'adoption' | 'about';

const routes: Array<{ id: Route; label: string }> = [
  { id: 'overview', label: '概要' },
  { id: 'system', label: 'システム' },
  { id: 'adoption', label: '導入' },
  { id: 'about', label: 'BANSOUについて' },
];

function parseRoute(hash: string): Route {
  const normalized = hash.replace(/^#\/?/, '').replace(/^#/, '');
  if (normalized === 'system') return 'system';
  if (normalized === 'adoption') return 'adoption';
  if (normalized === 'about') return 'about';
  return 'overview';
}

function toHash(route: Route): string {
  return `#/${route}`;
}

function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = toHash('overview');
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="page">
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href={toHash('overview')} className="brand">
            BANSOU
          </a>
          <nav className="nav" aria-label="ページ内ナビゲーション">
            {routes.map((item) => (
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

      <main className="wrap main">
        {route === 'overview' && (
          <section id="overview" className="section">
            <section className="hero">
              <p className="hero-lead">理解を伴う開発のために。</p>
              <h1>理解を確認し、確認されない限りマージしない。</h1>
              <p>
                BANSOUは、生成されたコードを読み、理解を確認し、
                その結果をPRのマージ条件に接続するための仕組みです。
              </p>
              <a className="hero-button" href={toHash('system')}>
                仕組みを見る
              </a>
            </section>
          <h2>概要</h2>
          <p>
            生成AIを使った開発では、実装速度が上がる一方で、変更内容の理解が不足したままPRが進む課題があります。
            BANSOUはこの課題に対して、理解確認を運用フローに組み込みます。
          </p>
          <div className="list-grid">
            <article>
              <h3>課題</h3>
              <ul>
                <li>生成されたコードを十分に読まないまま変更が進む</li>
                <li>レビュー観点が個人依存になりやすい</li>
                <li>保守時に変更意図を追いにくい</li>
              </ul>
            </article>
            <article>
              <h3>BANSOUの役割</h3>
              <ul>
                <li>差分に対する理解クイズを生成する</li>
                <li>回答結果をサーバ側で評価する</li>
                <li>評価結果をPR検証に接続する</li>
              </ul>
            </article>
            <article>
              <h3>制御する対象</h3>
              <ul>
                <li>理解確認が行われたか</li>
                <li>対象差分に対応する証明があるか</li>
                <li>条件を満たさない変更をマージさせないこと</li>
              </ul>
            </article>
          </div>
          </section>
        )}

        {route === 'system' && (
          <section id="system" className="section">
          <h2>システム</h2>
          <p>
            構成要素は、実装者、VSCode拡張、サーバ、GitHub Action、リポジトリです。
            理解証明トークンを介して、merge制御を行います。
          </p>
          <div className="diagram-box">
            <svg viewBox="0 0 980 220" role="img" aria-label="BANSOUのシステム構成図">
              <rect x="20" y="80" width="160" height="56" className="box" />
              <text x="100" y="112" textAnchor="middle" className="label">
                実装者
              </text>

              <rect x="220" y="80" width="170" height="56" className="box" />
              <text x="305" y="112" textAnchor="middle" className="label">
                VSCode拡張
              </text>

              <rect x="430" y="80" width="130" height="56" className="box" />
              <text x="495" y="112" textAnchor="middle" className="label">
                サーバ
              </text>

              <rect x="600" y="80" width="170" height="56" className="box" />
              <text x="685" y="112" textAnchor="middle" className="label">
                GitHub Action
              </text>

              <rect x="810" y="80" width="150" height="56" className="box" />
              <text x="885" y="112" textAnchor="middle" className="label">
                リポジトリ
              </text>

              <line x1="180" y1="108" x2="220" y2="108" className="line" />
              <line x1="390" y1="108" x2="430" y2="108" className="line" />
              <line x1="560" y1="108" x2="600" y2="108" className="line" />
              <line x1="770" y1="108" x2="810" y2="108" className="line" />

              <polygon points="215,108 206,103 206,113" className="arrow" />
              <polygon points="425,108 416,103 416,113" className="arrow" />
              <polygon points="595,108 586,103 586,113" className="arrow" />
              <polygon points="805,108 796,103 796,113" className="arrow" />

              <line x1="495" y1="146" x2="495" y2="185" className="token-line" />
              <rect x="410" y="185" width="170" height="28" className="token-box" />
              <text x="495" y="204" textAnchor="middle" className="token-label">
                理解証明トークン
              </text>
            </svg>
          </div>
          <ol className="flow">
            <li>実装者が差分を取得し、クイズを生成する</li>
            <li>サーバが回答を評価し、理解証明トークンを発行する</li>
            <li>GitHub ActionがPR時に証明と差分を検証する</li>
            <li>条件を満たす場合のみ、リポジトリでmergeを許可する</li>
          </ol>
          </section>
        )}

        {route === 'adoption' && (
          <section id="adoption" className="section">
          <h2>導入</h2>
          <div className="list-grid two-col">
            <article>
              <h3>最小ステップ</h3>
              <ol>
                <li>VSCode拡張を導入し、サーバURLと利用者IDを設定する</li>
                <li>サーバをデプロイし、必要な変数とシークレットを設定する</li>
                <li>GitHub ActionをPRワークフローに追加する</li>
                <li>Required Checkに検証ジョブを登録する</li>
              </ol>
            </article>
            <article>
              <h3>前提条件</h3>
              <ul>
                <li>リポジトリにPR運用とブランチ保護が設定されていること</li>
                <li>サーバ側の署名鍵と検証情報が正しく管理されていること</li>
                <li>チームが「理解確認を必須にする」運用方針を持つこと</li>
              </ul>
            </article>
          </div>
          </section>
        )}

        {route === 'about' && (
          <section id="about" className="section">
          <h2>BANSOUについて</h2>
          <p>
            BANSOUは、コード生成を加速するためのツールではありません。
            生成された変更を読み、理解を確認し、その確認結果をマージ制御に接続するための仕組みです。
          </p>
          <p>
            ここで扱う「理解」とは、変更内容を説明できること、影響範囲を把握できること、
            そして不明点を明確にできることです。BANSOUはこの確認を個人判断に任せず、
            チームの運用として扱える形にします。
          </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
