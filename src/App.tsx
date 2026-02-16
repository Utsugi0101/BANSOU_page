import { useState } from 'react'
import './App.css'

type Page = 'home' | 'detail'

function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <main className="app">
      {page === 'home' ? (
        <section className="card">
          <p className="eyebrow">Top Page</p>
          <h1>BANSOU</h1>
          <p>ここはBANSOUの仮トップページです。</p>
          <button onClick={() => setPage('detail')}>詳細ページを見る</button>
        </section>
      ) : (
        <section className="card">
          <p className="eyebrow">Detail Page</p>
          <h1>BANSOUの詳細ページ</h1>
          <p>ここにサービス説明や機能詳細などの情報を掲載する想定です。</p>
          <button onClick={() => setPage('home')}>トップへ戻る</button>
        </section>
      )}
    </main>
  )
}

export default App
