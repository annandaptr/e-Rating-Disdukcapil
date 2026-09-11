import { Link } from 'react-router-dom'

const steps = [
  { number: 1, title: 'Pilih layanan', desc: 'Cari layanan yang baru saja Anda terima.' },
  { number: 2, title: 'Beri rating dan komentar', desc: 'Nilai dengan bintang, tambahkan masukan jika perlu.' },
  { number: 3, title: 'Kirim, selesai', desc: 'Rating Anda tersimpan dan digunakan untuk perbaikan layanan.' },
]

function LandingPage() {
  return (
    <div className="landing-page">
      <style>{`
        .landing-page {
          --color-bg: #FFFFFF;
          --color-bg-alt: #F3F6F4;
          --color-primary: #0B3D3A;
          --color-accent: #E4A93B;
          --color-accent-dark: #4A2E06;
          --color-text: #16241F;
          --color-text-muted: #5B6B65;
          --font-display: 'Fraunces', serif;
          --font-body: 'Inter', sans-serif;
          font-family: var(--font-body);
          color: var(--color-text);
          background: var(--color-bg);
        }

        .lp-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s;
        }
        .lp-btn:hover { opacity: 0.85; }
        .lp-btn-primary { background: var(--color-accent); color: var(--color-accent-dark); }
        .lp-btn-outline { background: transparent; color: var(--color-primary); border: 1.5px solid var(--color-primary); }

        .lp-navbar {
          background: var(--color-primary);
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lp-navbar-logo {
          font-family: var(--font-display);
          color: var(--color-bg-alt);
          font-size: 20px;
          font-weight: 600;
          text-decoration: none;
        }

        .lp-hero {
          text-align: center;
          padding: 64px 24px 48px;
          max-width: 640px;
          margin: 0 auto;
        }
        .lp-hero-stars { display: flex; justify-content: center; gap: 4px; margin-bottom: 20px; }
        .lp-star { font-size: 24px; }
        .lp-star-filled { color: var(--color-accent); }
        .lp-star-muted { color: var(--color-primary); opacity: 0.25; }
        .lp-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 40px);
          margin-bottom: 16px;
          line-height: 1.25;
        }
        .lp-hero p { color: var(--color-text-muted); font-size: 16px; margin-bottom: 28px; }
        .lp-hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        .lp-how-it-works {
          background: var(--color-bg-alt);
          padding: 40px 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          text-align: center;
        }
        @media (max-width: 640px) {
          .lp-how-it-works { grid-template-columns: 1fr; }
        }
        .lp-step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-primary);
          color: var(--color-bg-alt);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .lp-how-it-works h3 {
          font-family: var(--font-display);
          font-size: 16px;
          margin-bottom: 6px;
        }
        .lp-how-it-works p { font-size: 13px; color: var(--color-text-muted); }

        .lp-footer {
          background: var(--color-bg-alt);
          text-align: center;
          padding: 20px;
          font-size: 13px;
          color: var(--color-text-muted);
        }
      `}</style>

      <nav className="lp-navbar">
        <Link to="/" className="lp-navbar-logo">LayananKita</Link>
        <Link to="/rating" className="lp-btn lp-btn-primary">Beri Rating</Link>
      </nav>

      <section className="lp-hero">
        <div className="lp-hero-stars" aria-hidden="true">
          <span className="lp-star lp-star-filled">★</span>
          <span className="lp-star lp-star-filled">★</span>
          <span className="lp-star lp-star-filled">★</span>
          <span className="lp-star lp-star-muted">★</span>
          <span className="lp-star lp-star-muted">★</span>
        </div>

        <h1>Suara Anda Menentukan Arah Layanan Publik</h1>
        <p>
          Nilai dan beri masukan atas layanan yang Anda terima.
          Setiap rating tersimpan dan dipakai untuk perbaikan.
        </p>

        <div className="lp-hero-actions">
          <Link to="/rating" className="lp-btn lp-btn-primary">Mulai Beri Rating</Link>
          <a href="#layanan" className="lp-btn lp-btn-outline">Lihat Layanan</a>
        </div>
      </section>

      <section className="lp-how-it-works">
        {steps.map((step) => (
          <div key={step.number}>
            <div className="lp-step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </section>

      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} LayananKita — Disdukcapil</p>
      </footer>
    </div>
  )
}

export default LandingPage
