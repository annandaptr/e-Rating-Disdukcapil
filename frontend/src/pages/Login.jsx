import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoDisdukcapil from "../assets/logo-disdukcapil.png";
import "../App.css";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [nik, setNik] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pesanError, setPesanError] = useState("");
  const [sedangLogin, setSedangLogin] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setPesanError("");
    setSedangLogin(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik,
          password: kataSandi,
        }),
      });

      const hasil = await response.json();

      if (hasil.success) {
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({
            token: hasil.data.token,
            id: hasil.data.admin.id,
            nik: hasil.data.admin.nik,
            nama: hasil.data.admin.nama,
            role: hasil.data.admin.role,
          }),
        );

        navigate("/admin/dashboard");
      } else {
        setPesanError(hasil.message || "NIK atau kata sandi salah.");
        setSedangLogin(false);
      }
    } catch (error) {
      setPesanError(
        "Tidak bisa terhubung ke server. Coba lagi beberapa saat.",
      );
      setSedangLogin(false);
    }
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
                background: "#F6E7E4",
                color: "#B23A2E",
                fontSize: "14px",
              }}
            >
              {pesanError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nik">
              NIK
            </label>

            <input
              id="nik"
              type="text"
              inputMode="numeric"
              maxLength={16}
              placeholder="Masukkan NIK admin (16 digit)"
              value={nik}
              onChange={(event) =>
                setNik(event.target.value.replace(/\D/g, ""))
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