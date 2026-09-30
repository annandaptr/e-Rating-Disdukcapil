import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ClipboardList,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  Star,
  UserCog,
  Users,
  X,
} from "lucide-react";

import logoDisdukcapil from "../assets/logo-disdukcapil.png";
import "./Dashboard.css";

const RATINGS_URL = "http://localhost:3000/api/ratings";
const PELAYANAN_URL = "http://localhost:3000/api/pelayanan";

const getInisial = (nama) => {
  const kata = nama.trim().split(" ");

  if (kata.length >= 2) {
    return (kata[0][0] + kata[1][0]).toUpperCase();
  }

  return nama.substring(0, 2).toUpperCase();
};

const formatTanggalIndo = (isoString) => {
  const tanggal = new Date(isoString);
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function Dashboard() {
  const navigate = useNavigate();

  const adminAuth = JSON.parse(
    localStorage.getItem("adminAuth") || "{}",
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [ratings, setRatings] = useState([]);
  const [jumlahLayanan, setJumlahLayanan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setErrorFetch("");

    try {
      const [ratingsRes, pelayananRes] = await Promise.all([
        fetch(RATINGS_URL, {
          headers: { Authorization: `Bearer ${adminAuth.token}` },
        }),
        fetch(PELAYANAN_URL),
      ]);

      if (ratingsRes.status === 401) {
        localStorage.removeItem("adminAuth");
        navigate("/login");
        return;
      }

      const ratingsHasil = await ratingsRes.json();
      const pelayananHasil = await pelayananRes.json();

      if (ratingsHasil.success && pelayananHasil.success) {
        setRatings(ratingsHasil.data);
        setJumlahLayanan(pelayananHasil.data.length);
      } else {
        setErrorFetch(
          ratingsHasil.message ||
            pelayananHasil.message ||
            "Gagal memuat data dashboard",
        );
      }
    } catch (error) {
      setErrorFetch("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hitung semua statistik dari data ratings asli
  const totalPenilaian = ratings.length;

  const rataRataRating =
    totalPenilaian > 0
      ? (
          ratings.reduce((jumlah, item) => jumlah + item.rating, 0) /
          totalPenilaian
        ).toFixed(1)
      : "0.0";

  const jumlahPuas = ratings.filter((item) => item.rating >= 4).length;
  const persenPuas =
    totalPenilaian > 0
      ? Math.round((jumlahPuas / totalPenilaian) * 100)
      : 0;

  const jumlahSangatPuas = ratings.filter((item) => item.rating === 5).length;
  const jumlahPuasSaja = ratings.filter((item) => item.rating === 4).length;
  const jumlahCukup = ratings.filter((item) => item.rating === 3).length;
  const jumlahTidakPuas = ratings.filter((item) => item.rating <= 2).length;

  const persen = (jumlah) =>
    totalPenilaian > 0 ? Math.round((jumlah / totalPenilaian) * 100) : 0;

  const penilaianTerbaru = ratings.slice(0, 3);

  const tanggalTerbaru =
    ratings.length > 0 ? formatTanggalIndo(ratings[0].created_at) : "-";

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <img
            className="sidebar-logo disdukcapil-logo"
            src={logoDisdukcapil}
            alt="Logo Disdukcapil Kabupaten Subang"
          />

          <div>
            <h2>e-Rating</h2>
            <p>Disdukcapil Subang</p>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <p className="menu-title">MENU UTAMA</p>

        <nav className="sidebar-menu">
          <a
            href="/admin/dashboard"
            className="menu-item active"
            style={{ textDecoration: "none" }}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a
            href="/admin/laporan"
            className="menu-item"
            style={{ textDecoration: "none" }}
          >
            <ClipboardList size={20} />
            Laporan
          </a>

          <a
            href="/admin/kelola"
            className="menu-item"
            style={{ textDecoration: "none" }}
          >
            <UserCog size={20} />
            Kelola Admin
          </a>
        </nav>

        <div className="sidebar-access">
          <ShieldCheck size={20} />

          <div>
            <strong>
              {adminAuth.role === "super_admin" ? "Super Admin" : "Admin"}
            </strong>
            <span>Akses terverifikasi</span>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Keluar
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="navbar">
          <div className="navbar-left">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>
              <p>Admin / Dashboard</p>
              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="navbar-right">
            <div className="navbar-search">
              <Search size={18} />
              <input type="text" placeholder="Cari data..." />
            </div>

            <button type="button" className="notification-button">
              <Bell size={20} />
              <span />
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">
                {adminAuth.role === "super_admin" ? "SA" : "AD"}
              </div>

              <div className="admin-info">
                <strong>{adminAuth.nama}</strong>
                <span>NIK: {adminAuth.nik}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <h2>Selamat Datang, {adminAuth.nama}!</h2>
              <p>Berikut ringkasan penilaian pelayanan Disdukcapil.</p>
            </div>

            <div className="dashboard-date">Data terbaru: {tanggalTerbaru}</div>
          </section>

          {loading && (
            <p style={{ padding: "40px", textAlign: "center", color: "#54604C" }}>
              Memuat data...
            </p>
          )}

          {!loading && errorFetch && (
            <p style={{ padding: "40px", textAlign: "center", color: "#B23A2E" }}>
              {errorFetch}
            </p>
          )}

          {!loading && !errorFetch && (
            <>
              <section className="statistic-grid">
                <article className="statistic-card">
                  <div className="statistic-icon blue">
                    <FileBarChart size={24} />
                  </div>

                  <div>
                    <span>Total Penilaian</span>
                    <h3>{totalPenilaian}</h3>
                  </div>
                </article>

                <article className="statistic-card">
                  <div className="statistic-icon yellow">
                    <Star size={24} />
                  </div>

                  <div>
                    <span>Rata-rata Rating</span>
                    <h3>{rataRataRating}</h3>
                    <p>Dari 5 bintang</p>
                  </div>
                </article>

                <article className="statistic-card">
                  <div className="statistic-icon green">
                    <Users size={24} />
                  </div>

                  <div>
                    <span>Masyarakat Puas</span>
                    <h3>{persenPuas}%</h3>
                  </div>
                </article>

                <article className="statistic-card">
                  <div className="statistic-icon purple">
                    <ClipboardList size={24} />
                  </div>

                  <div>
                    <span>Jenis Layanan</span>
                    <h3>{jumlahLayanan}</h3>
                    <p>Layanan aktif</p>
                  </div>
                </article>
              </section>

              <section className="dashboard-panels">
                <article className="dashboard-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Penilaian Terbaru</h3>
                      <p>Data penilaian yang baru masuk</p>
                    </div>

                    <a
                      href="/admin/laporan"
                      style={{
                        color: "#3D7A5C",
                        textDecoration: "none",
                        fontWeight: "700",
                        fontSize: "12px",
                      }}
                    >
                      Lihat Semua
                    </a>
                  </div>

                  <div className="rating-list">
                    {penilaianTerbaru.length === 0 && (
                      <p style={{ padding: "20px", color: "#54604C" }}>
                        Belum ada penilaian masuk.
                      </p>
                    )}

                    {penilaianTerbaru.map((item) => (
                      <div className="rating-item" key={item.id}>
                        <div className="rating-avatar">
                          {getInisial(item.nama_pelayanan)}
                        </div>

                        <div className="rating-description">
                          <strong>Pelayanan {item.nama_pelayanan}</strong>
                          <span>{item.comment || "-"}</span>
                        </div>

                        <div className="rating-score">★ {item.rating}</div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="dashboard-panel satisfaction-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Tingkat Kepuasan</h3>
                      <p>Hasil keseluruhan penilaian</p>
                    </div>
                  </div>

                  <div className="satisfaction-content">
                    <div className="satisfaction-circle">
                      <strong>{persenPuas}%</strong>
                      <span>Puas</span>
                    </div>

                    <div className="satisfaction-details">
                      <div>
                        <span className="indicator very-satisfied" />
                        Sangat Puas
                        <strong>{persen(jumlahSangatPuas)}%</strong>
                      </div>

                      <div>
                        <span className="indicator satisfied" />
                        Puas
                        <strong>{persen(jumlahPuasSaja)}%</strong>
                      </div>

                      <div>
                        <span className="indicator enough" />
                        Cukup
                        <strong>{persen(jumlahCukup)}%</strong>
                      </div>

                      <div>
                        <span className="indicator dissatisfied" />
                        Tidak Puas
                        <strong>{persen(jumlahTidakPuas)}%</strong>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;