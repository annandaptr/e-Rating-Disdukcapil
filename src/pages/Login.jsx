import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoDisdukcapil from "./logo-disdukcapil.images.jfif";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pesanError, setPesanError] = useState("");
  const [sedangLogin, setSedangLogin] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    setPesanError("");
    setSedangLogin(true);

    const daftarAkun = [
      {
        nama: "Super Admin",
        email: "superadmin@disdukcapil.go.id",
        password: "admin123",
        role: "Super Admin",
      },
      {
        nama: "Admin Pelayanan",
        email: "admin@disdukcapil.go.id",
        password: "admin123",
        role: "Admin",
      },
    ];

    const akunDitemukan = daftarAkun.find(
      (akun) =>
        akun.email === email &&
        akun.password === kataSandi,
    );

    setTimeout(() => {
      if (akunDitemukan) {
        const dataLogin = {
          nama: akunDitemukan.nama,
          email: akunDitemukan.email,
          role: akunDitemukan.role,
        };

        localStorage.setItem(
          "userLogin",
          JSON.stringify(dataLogin),
        );

        navigate("/dashboard");
      } else {
        setPesanError(
          "Email atau kata sandi yang dimasukkan salah.",
        );

        setSedangLogin(false);
      }
    }, 500);
  };

  return (
    <main className="login-page">
      <section className="information-panel">
        <div className="brand">
          <img
            className="brand-logo disdukcapil-logo"
            src={logoDisdukcapil}
            alt="Logo Disdukcapil Kabupaten Subang"
          />

          <div>
            <h1>e-Rating Disdukcapil</h1>
            <p>Kabupaten Subang</p>
          </div>
        </div>

        <div className="welcome-text">
          <span className="badge">
            Sistem Penilaian Pelayanan
          </span>

          <h2>
            Tingkatkan kualitas pelayanan melalui
            penilaian masyarakat.
          </h2>

          <p>
            Kelola laporan, pantau kepuasan masyarakat,
            dan lihat hasil penilaian pelayanan Disdukcapil
            dalam satu tempat.
          </p>
        </div>

        <p className="copyright">
          © 2026 Dinas Kependudukan dan Pencatatan Sipil
        </p>
      </section>

      <section className="form-panel">
        <form
          className="login-card"
          onSubmit={handleLogin}
        >
          <div className="form-heading">
            <span>ADMINISTRATOR</span>

            <h2>Selamat Datang</h2>

            <p>
              Masukkan akun admin untuk melanjutkan.
            </p>
          </div>

          {pesanError && (
            <div
              style={{
                padding: "12px 14px",
                marginBottom: "18px",
                borderRadius: "9px",
                background: "#fee2e2",
                color: "#b91c1c",
                fontSize: "14px",
              }}
            >
              {pesanError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Masukkan email admin"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Kata Sandi
            </label>

            <div className="password-field">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Masukkan kata sandi"
                value={kataSandi}
                onChange={(event) =>
                  setKataSandi(event.target.value)
                }
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? "Sembunyikan"
                  : "Lihat"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Ingat saya
            </label>
          </div>

          <button
            className="login-button"
            type="submit"
            disabled={sedangLogin}
          >
            {sedangLogin
              ? "Sedang masuk..."
              : "Masuk"}
          </button>

          <p className="security-message">
            Halaman ini hanya dapat diakses oleh admin.
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;