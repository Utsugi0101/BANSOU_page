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
          <a href={toHash('overview')} className="brand" aria-label="BANSOU トップへ">
            <img src="/アイコン.png" alt="BANSOU ロゴ" className="brand-logo" />
            <span>BANSOU</span>
          </a>
          <nav className="nav" aria-label="ページ内ナビゲーション">
            {routes.map((item) => (
              <a key={item.id} href={toHash(item.id)} className={item.id === route ? 'active' : ''}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="wrap main">
        {route === 'overview' && (
          <section id="overview" className="section">
            <div className="hero-block">
              <p className="eyebrow">理解を伴う開発</p>
              <h1>変更内容を説明可能な状態で、開発を前進させる。</h1>
              <p className="hero-copy">
                BANSOUは、生成されたコードを読むこと、理解を確認すること、
                確認されない限りマージしないことを、開発フローとして扱うための仕組みです。
              </p>
              <a className="primary-btn" href={toHash('system')}>
                仕組みを見る
              </a>
            </div>

            <div className="status-strip" aria-label="概要サマリー">
              <p>
                <strong>対象</strong>
                生成AIを活用するチーム開発
              </p>
              <p>
                <strong>制御</strong>
                差分ごとの理解確認とマージ条件
              </p>
              <p>
                <strong>目的</strong>
                未理解コードの本番流入を抑制
              </p>
            </div>

            <h2>概要</h2>
            <div className="grid two">
              <article className="panel">
                <h3>課題</h3>
                <ul>
                  <li>実装速度が上がり、理解の確認が後回しになりやすい</li>
                  <li>レビュワーの負荷が上がり、確認作業が属人化しやすい</li>
                  <li>説明しづらい変更がそのまま本番に入るリスクがある</li>
                </ul>
              </article>
              <article className="panel">
                <h3>BANSOUの役割</h3>
                <ul>
                  <li>差分からクイズを作成し、理解確認を実行する</li>
                  <li>合格結果を理解証明として記録・照会可能にする</li>
                  <li>証明が不足するPRをGitHub Actionsで停止する</li>
                </ul>
              </article>
            </div>

            <article className="panel table-panel">
              <h3>制御する範囲</h3>
              <dl className="definition-list">
                <div>
                  <dt>できること</dt>
                  <dd>理解確認をPR判定に接続し、運用として継続すること</dd>
                </div>
                <div>
                  <dt>前提</dt>
                  <dd>サーバ設定、Action設定、チームの運用合意があること</dd>
                </div>
                <div>
                  <dt>限界</dt>
                  <dd>クイズは理解の補助であり、設計判断の代替にはならないこと</dd>
                </div>
              </dl>
            </article>
          </section>
        )}

        {route === 'system' && (
          <section id="system" className="section">
            <h2>システム</h2>
            <p className="section-copy">
              BANSOUは、VSCode拡張・サーバ・GitHub Actionを連携させ、
              「理解確認済みの差分のみをマージ可能」にする構成です。
            </p>

            <div className="diagram-box">
              <svg viewBox="0 0 1040 280" role="img" aria-label="BANSOUシステム構成図">
                <rect x="24" y="38" width="160" height="60" className="box" />
                <text x="104" y="74" textAnchor="middle" className="label">実装者</text>

                <rect x="224" y="38" width="186" height="60" className="box" />
                <text x="317" y="74" textAnchor="middle" className="label">VSCode拡張</text>

                <rect x="450" y="38" width="148" height="60" className="box" />
                <text x="524" y="74" textAnchor="middle" className="label">サーバ</text>

                <rect x="638" y="38" width="184" height="60" className="box" />
                <text x="730" y="74" textAnchor="middle" className="label">GitHub Action</text>

                <rect x="862" y="38" width="154" height="60" className="box" />
                <text x="939" y="74" textAnchor="middle" className="label">リポジトリ</text>

                <line x1="184" y1="68" x2="224" y2="68" className="line" />
                <line x1="410" y1="68" x2="450" y2="68" className="line" />
                <line x1="598" y1="68" x2="638" y2="68" className="line" />
                <line x1="822" y1="68" x2="862" y2="68" className="line" />

                <polygon points="219,68 210,63 210,73" className="arrow" />
                <polygon points="445,68 436,63 436,73" className="arrow" />
                <polygon points="633,68 624,63 624,73" className="arrow" />
                <polygon points="857,68 848,63 848,73" className="arrow" />

                <rect x="450" y="134" width="148" height="58" className="token-box" />
                <text x="524" y="168" textAnchor="middle" className="token-label">理解証明台帳</text>

                <line x1="524" y1="98" x2="524" y2="134" className="token-line" />
                <line x1="598" y1="163" x2="638" y2="163" className="token-line" />
                <polygon points="633,163 624,158 624,168" className="token-arrow" />

                <rect x="862" y="134" width="154" height="58" className="box" />
                <text x="939" y="168" textAnchor="middle" className="label">merge制御</text>
                <line x1="822" y1="163" x2="862" y2="163" className="line" />
                <polygon points="857,163 848,158 848,168" className="arrow" />
              </svg>
            </div>

            <div className="grid two">
              <article className="panel">
                <h3>典型フロー</h3>
                <ol>
                  <li>PR差分をVSCode拡張で取得する</li>
                  <li>差分単位でクイズを生成し、回答する</li>
                  <li>サーバが採点し、理解証明を台帳に記録する</li>
                  <li>ActionがPR情報を添えて`/gate/evaluate`を照会する</li>
                  <li>必要差分が揃っていればチェック成功、未達なら失敗</li>
                </ol>
              </article>
              <article className="panel">
                <h3>責務分担</h3>
                <ul>
                  <li>拡張: 差分抽出、クイズUI、回答送信</li>
                  <li>サーバ: 生成、採点、署名、台帳管理、ゲート判定</li>
                  <li>Action: PR文脈の収集、判定API呼び出し、結果反映</li>
                </ul>
              </article>
            </div>

            <article className="panel table-panel">
              <h3>運用上の前提と限界</h3>
              <dl className="definition-list">
                <div>
                  <dt>狙い</dt>
                  <dd>理解確認をレビュー補助ではなく必須フローとして扱う</dd>
                </div>
                <div>
                  <dt>前提</dt>
                  <dd>sub（利用者ID）、repo、commitの整合が取れていること</dd>
                </div>
                <div>
                  <dt>限界</dt>
                  <dd>クイズ品質は改善余地があり、運用で継続調整が必要</dd>
                </div>
              </dl>
            </article>
          </section>
        )}

        {route === 'adoption' && (
          <section id="adoption" className="section">
            <h2>導入</h2>
            <p className="section-copy">
              このリポジトリ（`BANSOU-VSCode` / `BANSOU-server` / `BANSOU-action` / `BANSOU-test`）の実装に沿った、
              実運用向けの導入手順です。
            </p>

            <article className="panel table-panel">
              <h3>1. 拡張機能のインストール</h3>
              <p>
                Marketplace:
                {' '}
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=utsugi0101.bansou"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://marketplace.visualstudio.com/items?itemName=utsugi0101.bansou
                </a>
              </p>
              <p>
                VSCodeで拡張機能をインストールし、対象リポジトリを開いて
                `BANSOU: Open Sidebar` を実行します。
              </p>
            </article>

            <div className="grid two">
              <article className="panel">
                <h3>2. ローカル設定</h3>
                <ol>
                  <li>`understandingQuiz.attestationServerUrl` にサーバURLを設定（例: `https://bansou-server.soraki0101.workers.dev`）</li>
                  <li>`understandingQuiz.attestationSubject` にGitHubログイン名を設定（`sub` として使われる）</li>
                  <li>必要な場合のみ `understandingQuiz.gateApiToken` を設定（`/gate/evaluate` が認証必須の場合）</li>
                  <li>差分取得 → クイズ生成 → 回答提出が通ることを確認</li>
                </ol>
              </article>
              <article className="panel">
                <h3>3. サーバ設定</h3>
                <ul>
                  <li>`BANSOU-server` を Cloudflare Workers にデプロイする</li>
                  <li>`ATTEST_PUBLIC_JWK` / `ATTEST_PRIVATE_JWK` / `ISSUER` を設定する</li>
                  <li>D1を `ATTEST_DB` としてバインドし、ledger modeを有効化する</li>
                  <li>`OPENAI_API_KEY` と `GATE_API_TOKEN` を Secret に設定する</li>
                  <li>`GET /gate/health` が `ok:true` になることを確認する</li>
                </ul>
              </article>
            </div>

            <div className="grid two">
              <article className="panel">
                <h3>4. GitHub Actions連携</h3>
                <ol>
                  <li>PRワークフローに `Utsugi0101/bansou-action@v1` を追加する</li>
                  <li>Action入力に `issuer` `jwks_url` `required_quiz_id` `gate_url` `github_token` を設定する</li>
                  <li>必要なら `gate_api_token` に `secrets.BANSOU_GATE_API_TOKEN` を渡す</li>
                  <li>Branch protectionで `Verify BANSOU Token` を Required Check に設定する</li>
                </ol>
              </article>
              <article className="panel">
                <h3>5. リポジトリ側の変数/Secrets</h3>
                <ul>
                  <li>Variables: `BANSOU_ISSUER` / `BANSOU_JWKS_URL` / `BANSOU_GATE_URL`</li>
                  <li>Secrets: `BANSOU_GATE_API_TOKEN`</li>
                  <li>`required_quiz_id` は拡張とActionで同じ値（通常 `core-pr`）に揃える</li>
                  <li>`attestationSubject` とPR作成者（GitHub login）の一致を運用ルール化する</li>
                </ul>
              </article>
            </div>

            <article className="panel table-panel">
              <h3>6. 検証リポジトリでの受け入れ確認</h3>
              <dl className="definition-list">
                <div>
                  <dt>クイズ生成</dt>
                  <dd>`src/*.ts` など本質ファイル差分でクイズが生成されること（`.md/.json/.sh` は対象外）</dd>
                </div>
                <div>
                  <dt>合格時</dt>
                  <dd>回答提出後、サーバに証明が記録され、PRゲート事前確認が成功すること</dd>
                </div>
                <div>
                  <dt>未合格時</dt>
                  <dd>証明不足のPRは `Verify BANSOU Token` が失敗すること</dd>
                </div>
                <div>
                  <dt>最終状態</dt>
                  <dd>「クイズに合格しない限り、対象PRはマージできない」状態になること</dd>
                </div>
              </dl>
            </article>
          </section>
        )}

        {route === 'about' && (
          <section id="about" className="section">
            <h2>BANSOUについて</h2>
            <p className="section-copy">
              このページでは、BANSOUの制作情報と作成者情報を公開しています。
            </p>

            <div className="grid two">
              <article className="panel">
                <h3>プロジェクト情報</h3>
                <ul>
                  <li>プロジェクト名: BANSOU</li>
                  <li>形態: VSCode拡張 + サーバ + GitHub Action</li>
                  <li>公開先: Visual Studio Marketplace / GitHub</li>
                  <li>作成時期: 2025年度</li>
                </ul>
              </article>
              <article className="panel">
                <h3>作成者情報</h3>
                <ul>
                  <li>表示名: Utsugi0101</li>
                  <li>X: @Utsugi0101</li>
                  <li>GitHub: https://github.com/Utsugi0101</li>
                  <li>所属: 筑波大学 情報学群 知識情報・図書館学類</li>
                </ul>
              </article>
            </div>

            <div className="grid two">
              <article className="panel">
                <h3>制作情報</h3>
                <ul>
                  <li>本作品は SecHack365 2025年度 思索駆動コースで作成しました</li>
                  <li>制作の主眼は「理解を工程として扱う開発運用」の実装です</li>
                  <li>研究・開発・運用をまたぐ形で継続的に改善しています</li>
                </ul>
              </article>
              <article className="panel">
                <h3>公開ノート</h3>
                <ul>
                  <li>導入手順と運用情報は、このページおよび各リポジトリREADMEで更新します</li>
                  <li>プロダクトの仕様は検証結果に合わせて調整します</li>
                  <li>公開情報は、実装と整合する範囲で記載します</li>
                </ul>
              </article>
            </div>

            <article className="panel table-panel">
              <h3>記載ポリシー</h3>
              <dl className="definition-list">
                <div>
                  <dt>事実確認</dt>
                  <dd>README・実装・運用設定と整合した内容のみ記載する</dd>
                </div>
                <div>
                  <dt>機微情報</dt>
                  <dd>トークン・秘密鍵・個人情報を公開文面に含めない</dd>
                </div>
                <div>
                  <dt>更新運用</dt>
                  <dd>導入手順と設定項目は、仕様変更ごとに更新する</dd>
                </div>
              </dl>
            </article>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <small>© BANSOU Project</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
