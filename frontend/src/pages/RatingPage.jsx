import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const dummyLayanan = [
  { id: 1, nama_layanan: 'Kartu Keluarga' },
  { id: 2, nama_layanan: 'KTP Elektronik' },
  { id: 3, nama_layanan: 'Akta Kelahiran' },
  { id: 4, nama_layanan: 'Akta Kematian' },
  { id: 5, nama_layanan: 'Surat Pindah Domisili' },
]

async function getLayanan() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyLayanan
}

async function postRating({ layanan_id, rating, komentar }) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log('Rating dikirim (dummy):', { layanan_id, rating, komentar })
  return { success: true }
}

function RatingPage() {
  const navigate = useNavigate()

  const [layananList, setLayananList] = useState([])
  const [loadingLayanan, setLoadingLayanan] = useState(true)

  const [layananId, setLayananId] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [komentar, setKomentar] = useState('')

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getLayanan()
      .then((data) => setLayananList(data))
      .catch(() => setErrors((prev) => ({ ...prev, layanan: 'Gagal memuat daftar layanan.' })))
      .finally(() => setLoadingLayanan(false))
  }, [])

  function validate() {
    const newErrors = {}
    if (!layananId) newErrors.layananId = 'Pilih layanan terlebih dahulu.'
    if (rating === 0) newErrors.rating = 'Berikan rating minimal 1 bintang.'
    if (!komentar.trim()) newErrors.komentar = 'Komentar tidak boleh kosong.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      await postRating({
        layanan_id: Number(layananId),
        rating,
        komentar: komentar.trim(),
      })
      navigate('/success')
    } catch {
      setErrors((prev) => ({ ...prev, submit: 'Gagal mengirim rating. Coba lagi.' }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rp-page">
      <style>{`
        .rp-page {
          --color-bg-alt: #F3F6F4;
          --color-primary: #0B3D3A;
          --color-accent: #E4A93B;
          --color-accent-dark: #4A2E06;
          --color-text: #16241F;
          --color-text-muted: #5B6B65;
          --color-error: #B23A3A;
          --font-display: 'Fraunces', serif;
          --font-body: 'Inter', sans-serif;
          font-family: var(--font-body);
          color: var(--color-text);
        }
        .rp-navbar {
          background: var(--color-primary);
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .rp-navbar-logo {
          font-family: var(--font-display);
          color: var(--color-bg-alt);
          font-size: 20px;
          font-weight: 600;
          text-decoration: none;
        }
        .rp-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          border: none;
        }
        .rp-btn-primary { background: var(--color-accent); color: var(--color-accent-dark); }
        .rp-content { max-width: 520px; margin: 0 auto; padding: 48px 24px 64px; }
        .rp-content h1 { font-family: var(--font-display); font-size: 28px; margin-bottom: 8px; }
        .rp-content > p { color: var(--color-text-muted); margin-bottom: 32px; }
        .rp-field { margin-bottom: 24px; }
        .rp-field label { display: block; font-weight: 500; margin-bottom: 8px; }
        .rp-field select, .rp-field textarea {
          width: 100%; padding: 10px 12px; border: 1.5px solid var(--color-bg-alt);
          border-radius: 6px; font-family: var(--font-body); font-size: 14px;
        }
        .rp-field select:focus, .rp-field textarea:focus { outline: none; border-color: var(--color-primary); }
        .rp-field textarea { resize: vertical; min-height: 100px; }
        .rp-field-error { color: var(--color-error); font-size: 13px; margin-top: 6px; }
        .rp-stars { display: flex; gap: 6px; }
        .rp-star-btn {
          background: none; border: none; cursor: pointer; font-size: 32px;
          padding: 0; line-height: 1; color: var(--color-bg-alt);
        }
        .rp-star-btn.active { color: var(--color-accent); }
        .rp-submit-btn {
          width: 100%; padding: 12px 24px; border-radius: 6px; border: none;
          background: var(--color-accent); color: var(--color-accent-dark);
          font-size: 15px; font-weight: 500; cursor: pointer;
        }
        .rp-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .rp-footer {
          background: var(--color-bg-alt); text-align: center; padding: 20px;
          font-size: 13px; color: var(--color-text-muted);
        }
      `}</style>

      <nav className="rp-navbar">
        <Link to="/" className="rp-navbar-logo">e-Rating Disdukcapil</Link>
        <Link to="/rating" className="rp-btn rp-btn-primary">Beri Rating</Link>
      </nav>

      <div className="rp-content">
        <h1>Beri Rating Layanan</h1>
        <p>Pilih layanan yang Anda terima, lalu beri penilaian.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rp-field">
            <label htmlFor="layanan">Layanan</label>
            <select
              id="layanan"
              value={layananId}
              onChange={(e) => setLayananId(e.target.value)}
              disabled={loadingLayanan}
            >
              <option value="">
                {loadingLayanan ? 'Memuat layanan...' : '-- Pilih layanan --'}
              </option>
              {layananList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama_layanan}
                </option>
              ))}
            </select>
            {errors.layananId && <p className="rp-field-error">{errors.layananId}</p>}
            {errors.layanan && <p className="rp-field-error">{errors.layanan}</p>}
          </div>

          <div className="rp-field">
            <label>Rating</label>
            <div className="rp-stars" role="radiogroup" aria-label="Rating bintang">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`rp-star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${star} bintang`}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && <p className="rp-field-error">{errors.rating}</p>}
          </div>

          <div className="rp-field">
            <label htmlFor="komentar">Komentar</label>
            <textarea
              id="komentar"
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              placeholder="Ceritakan pengalaman Anda menggunakan layanan ini"
            />
            {errors.komentar && <p className="rp-field-error">{errors.komentar}</p>}
          </div>

          {errors.submit && <p className="rp-field-error">{errors.submit}</p>}

          <button type="submit" className="rp-submit-btn" disabled={submitting}>
            {submitting ? 'Mengirim...' : 'Kirim Rating'}
          </button>
        </form>
      </div>

      <footer className="rp-footer">
        <p>© {new Date().getFullYear()} e-Rating Disdukcapil — Disdukcapil</p>
      </footer>
    </div>
  )
}

export default RatingPage