import { Link } from 'react-router-dom'

function SuccessPage() {
  return (
    <div className="sp-page">
      <style>{`
        .sp-page {
          --color-primary: #0B3D3A;
          --color-accent: #E4A93B;
          --color-accent-dark: #4A2E06;
          --color-text: #16241F;
          --color-text-muted: #5B6B65;
          --font-display: 'Fraunces', serif;
          --font-body: 'Inter', sans-serif;
          font-family: var(--font-body);
          color: var(--color-text);
          max-width: 480px;
          margin: 0 auto;
          padding: 96px 24px;
          text-align: center;
        }
        .sp-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-primary);
          color: #fff;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .sp-page h1 {
          font-family: var(--font-display);
          font-size: 26px;
          margin-bottom: 12px;
        }
        .sp-page p {
          color: var(--color-text-muted);
          margin-bottom: 28px;
        }
        .sp-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 6px;
          background: var(--color-accent);
          color: var(--color-accent-dark);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }
      `}</style>

      <div className="sp-icon" aria-hidden="true">✓</div>
      <h1>Terima Kasih Atas Penilaian Anda</h1>
      <p>Rating dan komentar Anda sudah kami terima, dan akan digunakan untuk perbaikan layanan.</p>
      <Link to="/" className="sp-btn">Kembali ke Beranda</Link>
    </div>
  )
}

export default SuccessPage
