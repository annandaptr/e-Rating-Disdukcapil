import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  ClipboardList,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserCog,
  X,
} from "lucide-react";

import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import logoDisdukcapil from "../assets/logo-disdukcapil.png";
import "./Dashboard.css";
import "./Laporan.css";

const dataRating = [
  {
    id: "RTG-001",
    tanggal: "2026-09-08",
    layanan: "KTP Elektronik",
    rating: 5,
    status: "Sangat Puas",
    ulasan: "Pelayanan cepat dan petugasnya ramah.",
  },
  {
    id: "RTG-002",
    tanggal: "2026-09-08",
    layanan: "Kartu Keluarga",
    rating: 4,
    status: "Puas",
    ulasan: "Prosesnya cukup cepat dan jelas.",
  },
  {
    id: "RTG-003",
    tanggal: "2026-09-07",
    layanan: "Akta Kelahiran",
    rating: 3,
    status: "Cukup",
    ulasan: "Antrean cukup lama tetapi petugas membantu.",
  },
  {
    id: "RTG-004",
    tanggal: "2026-09-07",
    layanan: "Kartu Identitas Anak",
    rating: 5,
    status: "Sangat Puas",
    ulasan: "Proses mudah dan sangat memuaskan.",
  },
  {
    id: "RTG-005",
    tanggal: "2026-09-06",
    layanan: "Akta Kematian",
    rating: 2,
    status: "Kurang Puas",
    ulasan: "Informasi persyaratan perlu diperjelas.",
  },
  {
    id: "RTG-006",
    tanggal: "2026-09-05",
    layanan: "Pindah Datang",
    rating: 4,
    status: "Puas",
    ulasan: "Petugas responsif dan informatif.",
  },
];

function Laporan() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pencarian, setPencarian] = useState("");
  const [layanan, setLayanan] = useState("Semua");
  const [rating, setRating] = useState("Semua");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const dataLogin = JSON.parse(
    localStorage.getItem("userLogin") || "{}",
  );

  const hasilFilter = useMemo(() => {
    return dataRating.filter((item) => {
      const kataKunci = pencarian.toLowerCase();

      const sesuaiPencarian =
        item.id.toLowerCase().includes(kataKunci) ||
        item.layanan.toLowerCase().includes(kataKunci) ||
        item.ulasan.toLowerCase().includes(kataKunci);

      const sesuaiLayanan =
        layanan === "Semua" ||
        item.layanan === layanan;

      const sesuaiRating =
        rating === "Semua" ||
        item.rating === Number(rating);

      const sesuaiTanggalAwal =
        tanggalAwal === "" ||
        item.tanggal >= tanggalAwal;

      const sesuaiTanggalAkhir =
        tanggalAkhir === "" ||
        item.tanggal <= tanggalAkhir;

      return (
        sesuaiPencarian &&
        sesuaiLayanan &&
        sesuaiRating &&
        sesuaiTanggalAwal &&
        sesuaiTanggalAkhir
      );
    });
  }, [
    pencarian,
    layanan,
    rating,
    tanggalAwal,
    tanggalAkhir,
  ]);

  const resetFilter = () => {
    setPencarian("");
    setLayanan("Semua");
    setRating("Semua");
    setTanggalAwal("");
    setTanggalAkhir("");
  };

  const exportExcel = () => {
    const dataExcel = hasilFilter.map((item) => ({
      ID: item.id,
      Tanggal: item.tanggal,
      Layanan: item.layanan,
      Rating: item.rating,
      Status: item.status,
      Ulasan: item.ulasan,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(dataExcel);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Laporan E-Rating",
    );

    XLSX.writeFile(
      workbook,
      "laporan-e-rating.xlsx",
    );
  };

  const exportPDF = () => {
    const documentPDF = new jsPDF({
      orientation: "landscape",
    });

    documentPDF.setFontSize(16);

    documentPDF.text(
      "Laporan E-Rating Disdukcapil Kabupaten Subang",
      14,
      16,
    );

    documentPDF.setFontSize(10);

    documentPDF.text(
      `Jumlah data: ${hasilFilter.length}`,
      14,
      23,
    );

    autoTable(documentPDF, {
      startY: 30,

      head: [
        [
          "ID",
          "Tanggal",
          "Layanan",
          "Rating",
          "Status",
          "Ulasan",
        ],
      ],

      body: hasilFilter.map((item) => [
        item.id,
        item.tanggal,
        item.layanan,
        `${item.rating} Bintang`,
        item.status,
        item.ulasan,
      ]),

      headStyles: {
        fillColor: [14, 116, 144],
      },

      styles: {
        fontSize: 8,
      },
    });

    documentPDF.save("laporan-e-rating.pdf");
  };

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
            href="/dashboard"
            className="menu-item"
            style={{ textDecoration: "none" }}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a
            href="/laporan"
            className="menu-item active"
            style={{ textDecoration: "none" }}
          >
            <ClipboardList size={20} />
            Laporan
          </a>

          <a
            href="/kelola-admin"
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
              <p>Admin / Laporan</p>
              <h1>Laporan</h1>
            </div>
          </div>

          <div className="navbar-right">
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

              <ChevronDown size={18} />
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="report-heading">
            <div>
              <h2>Laporan Penilaian</h2>

              <p>
                Cari, filter, dan unduh data penilaian
                masyarakat.
              </p>
            </div>

            <div className="export-buttons">
              <button
                type="button"
                className="export-button excel"
                onClick={exportExcel}
              >
                <FileSpreadsheet size={18} />
                Export Excel
              </button>

              <button
                type="button"
                className="export-button pdf"
                onClick={exportPDF}
              >
                <FileText size={18} />
                Export PDF
              </button>
            </div>
          </section>

          <section className="filter-card">
            <div className="filter-title">
              <div>
                <SlidersHorizontal size={19} />
                <strong>Filter Laporan</strong>
              </div>

              <button
                type="button"
                onClick={resetFilter}
              >
                Reset Filter
              </button>
            </div>

            <div className="filter-grid">
              <div className="report-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Cari ID, layanan, atau ulasan..."
                  value={pencarian}
                  onChange={(event) =>
                    setPencarian(event.target.value)
                  }
                />
              </div>

              <select
                value={layanan}
                onChange={(event) =>
                  setLayanan(event.target.value)
                }
              >
                <option value="Semua">
                  Semua Layanan
                </option>

                <option value="KTP Elektronik">
                  KTP Elektronik
                </option>

                <option value="Kartu Keluarga">
                  Kartu Keluarga
                </option>

                <option value="Akta Kelahiran">
                  Akta Kelahiran
                </option>

                <option value="Kartu Identitas Anak">
                  Kartu Identitas Anak
                </option>

                <option value="Akta Kematian">
                  Akta Kematian
                </option>

                <option value="Pindah Datang">
                  Pindah Datang
                </option>
              </select>

              <select
                value={rating}
                onChange={(event) =>
                  setRating(event.target.value)
                }
              >
                <option value="Semua">
                  Semua Rating
                </option>

                <option value="5">5 Bintang</option>
                <option value="4">4 Bintang</option>
                <option value="3">3 Bintang</option>
                <option value="2">2 Bintang</option>
                <option value="1">1 Bintang</option>
              </select>

              <input
                type="date"
                value={tanggalAwal}
                onChange={(event) =>
                  setTanggalAwal(event.target.value)
                }
              />

              <input
                type="date"
                value={tanggalAkhir}
                onChange={(event) =>
                  setTanggalAkhir(event.target.value)
                }
              />
            </div>
          </section>

          <section className="report-table-card">
            <div className="table-heading">
              <div>
                <FileBarChart size={20} />

                <div>
                  <h3>Data Penilaian</h3>

                  <p>
                    Menampilkan {hasilFilter.length} dari{" "}
                    {dataRating.length} data
                  </p>
                </div>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tanggal</th>
                    <th>Layanan</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Ulasan</th>
                  </tr>
                </thead>

                <tbody>
                  {hasilFilter.length > 0 ? (
                    hasilFilter.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.id}</strong>
                        </td>

                        <td>{item.tanggal}</td>

                        <td>{item.layanan}</td>

                        <td>
                          <span className="table-rating">
                            ★ {item.rating}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`report-status status-${item.rating}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="review-column">
                          {item.ulasan}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <div className="no-data">
                          <Search size={30} />
                          <strong>
                            Data tidak ditemukan
                          </strong>
                          <span>
                            Coba ubah pencarian atau filter.
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Laporan;