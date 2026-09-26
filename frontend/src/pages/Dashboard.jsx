import { useState } from "react";
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

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const dataLogin = JSON.parse(
    localStorage.getItem("userLogin") || "{}",
  );

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
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

        <p className="menu-title">
          MENU UTAMA
        </p>

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
              {dataLogin.role || "Super Admin"}
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

              <input
                type="text"
                placeholder="Cari data..."
              />
            </div>

            <button
              type="button"
              className="notification-button"
            >
              <Bell size={20} />
              <span />
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">
                {dataLogin.role === "Admin"
                  ? "AD"
                  : "SA"}
              </div>

              <div className="admin-info">
                <strong>
                  {dataLogin.nama || "Super Admin"}
                </strong>

                <span>
                  {dataLogin.email ||
                    "superadmin@disdukcapil.go.id"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <h2>
                Selamat Datang,{" "}
                {dataLogin.nama || "Super Admin"}!
              </h2>

              <p>
                Berikut ringkasan penilaian pelayanan
                Disdukcapil.
              </p>
            </div>

            <div className="dashboard-date">
              Data terbaru: 8 September 2026
            </div>
          </section>

          <section className="statistic-grid">
            <article className="statistic-card">
              <div className="statistic-icon blue">
                <FileBarChart size={24} />
              </div>

              <div>
                <span>Total Penilaian</span>
                <h3>1.248</h3>

                <p className="increase">
                  +12% bulan ini
                </p>
              </div>
            </article>

            <article className="statistic-card">
              <div className="statistic-icon yellow">
                <Star size={24} />
              </div>

              <div>
                <span>Rata-rata Rating</span>
                <h3>4.6</h3>
                <p>Dari 5 bintang</p>
              </div>
            </article>

            <article className="statistic-card">
              <div className="statistic-icon green">
                <Users size={24} />
              </div>

              <div>
                <span>Masyarakat Puas</span>
                <h3>89%</h3>

                <p className="increase">
                  +5% bulan ini
                </p>
              </div>
            </article>

            <article className="statistic-card">
              <div className="statistic-icon purple">
                <ClipboardList size={24} />
              </div>

              <div>
                <span>Jenis Layanan</span>
                <h3>6</h3>
                <p>Layanan aktif</p>
              </div>
            </article>
          </section>

          <section className="dashboard-panels">
            <article className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <h3>Penilaian Terbaru</h3>

                  <p>
                    Data penilaian yang baru masuk
                  </p>
                </div>

                <a
                  href="/admin/laporan"
                  style={{
                    color: "#0891b2",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "12px",
                  }}
                >
                  Lihat Semua
                </a>
              </div>

              <div className="rating-list">
                <div className="rating-item">
                  <div className="rating-avatar">
                    AK
                  </div>

                  <div className="rating-description">
                    <strong>
                      Pelayanan KTP Elektronik
                    </strong>

                    <span>
                      Proses cepat dan petugasnya ramah.
                    </span>
                  </div>

                  <div className="rating-score">
                    ★ 5.0
                  </div>
                </div>

                <div className="rating-item">
                  <div className="rating-avatar">
                    KK
                  </div>

                  <div className="rating-description">
                    <strong>
                      Pelayanan Kartu Keluarga
                    </strong>

                    <span>
                      Informasi yang diberikan cukup
                      jelas.
                    </span>
                  </div>

                  <div className="rating-score">
                    ★ 4.0
                  </div>
                </div>

                <div className="rating-item">
                  <div className="rating-avatar">
                    AL
                  </div>

                  <div className="rating-description">
                    <strong>
                      Pelayanan Akta Kelahiran
                    </strong>

                    <span>
                      Pelayanannya baik dan mudah.
                    </span>
                  </div>

                  <div className="rating-score">
                    ★ 4.5
                  </div>
                </div>
              </div>
            </article>

            <article className="dashboard-panel satisfaction-panel">
              <div className="panel-heading">
                <div>
                  <h3>Tingkat Kepuasan</h3>

                  <p>
                    Hasil keseluruhan penilaian
                  </p>
                </div>
              </div>

              <div className="satisfaction-content">
                <div className="satisfaction-circle">
                  <strong>89%</strong>
                  <span>Puas</span>
                </div>

                <div className="satisfaction-details">
                  <div>
                    <span className="indicator very-satisfied" />
                    Sangat Puas
                    <strong>68%</strong>
                  </div>

                  <div>
                    <span className="indicator satisfied" />
                    Puas
                    <strong>21%</strong>
                  </div>

                  <div>
                    <span className="indicator enough" />
                    Cukup
                    <strong>8%</strong>
                  </div>

                  <div>
                    <span className="indicator dissatisfied" />
                    Tidak Puas
                    <strong>3%</strong>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;