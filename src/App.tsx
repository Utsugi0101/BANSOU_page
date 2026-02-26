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
              <p className="hero-lead">理解を置いていかない開発のために。</p>
              <h1>理解を確認し、確認されない限りマージしない。</h1>
              <p>
                BANSOUは、開発の加速に対して置いていかれやすい「理解」を、
                支援・測定・確認の流れでチーム開発に戻すための仕組みです。
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
              <h3>影響（技術・組織・心理）</h3>
              <ul>
                <li>技術: 脆弱性や障害要因を見落としやすい</li>
                <li>組織: レビュワー依存と属人化が進みやすい</li>
                <li>心理: 制御できない感覚が負担になりやすい</li>
              </ul>
            </article>
            <article>
              <h3>BANSOUの役割</h3>
              <ul>
                <li>理解支援: 差分読解と関連ドキュメント参照を促す</li>
                <li>理解測定: クイズ回答をサーバ側で評価する</li>
                <li>理解確認: 結果をPRの判定条件に接続する</li>
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
            <li>生成AIで実装する</li>
            <li>差分に対する理解確認クイズを実施する</li>
            <li>サーバが評価し、理解証明トークンを発行する</li>
            <li>GitHub ActionがPR時に証明と差分を検証する</li>
            <li>条件を満たす場合のみ、mergeを許可する</li>
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
            BANSOUは、コード生成を速くするためのツールではありません。
            「理解したいと思えば理解できる状態」を維持しながら、
            生成された変更をチームで扱うための運用基盤です。
          </p>
          <p>
            ここで扱う「理解」は、変更内容の説明、影響範囲の把握、不明点の明確化です。
            個人の努力に依存せず、チームの運用として継続できる形を目指します。
          </p>
        </section>
        )}
      </main>
    </div>
  );
}

export default App;
