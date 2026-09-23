import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
  X,
} from "lucide-react";

import logoDisdukcapil from "../assets/logo-disdukcapil.png";
import "./Dashboard.css";
import "./KelolaAdmin.css";

const dataAdminAwal = [
  {
    id: 1,
    nama: "Super Admin",
    email: "superadmin@disdukcapil.go.id",
    role: "Super Admin",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Admin Pelayanan",
    email: "admin@disdukcapil.go.id",
    role: "Admin",
    status: "Aktif",
  },
];

function KelolaAdmin() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [pencarian, setPencarian] =
    useState("");

  const [modalTerbuka, setModalTerbuka] =
    useState(false);

  const [adminDiedit, setAdminDiedit] =
    useState(null);

  const dataLogin = JSON.parse(
    localStorage.getItem("userLogin") || "{}",
  );

  const [daftarAdmin, setDaftarAdmin] =
    useState(() => {
      const dataTersimpan =
        localStorage.getItem("daftarAdmin");

      return dataTersimpan
        ? JSON.parse(dataTersimpan)
        : dataAdminAwal;
    });

  const [formAdmin, setFormAdmin] = useState({
    nama: "",
    email: "",
    role: "Admin",
    status: "Aktif",
  });

  const simpanDataAdmin = (dataBaru) => {
    setDaftarAdmin(dataBaru);

    localStorage.setItem(
      "daftarAdmin",
      JSON.stringify(dataBaru),
    );
  };

  const bukaTambahAdmin = () => {
    setAdminDiedit(null);

    setFormAdmin({
      nama: "",
      email: "",
      role: "Admin",
      status: "Aktif",
    });

    setModalTerbuka(true);
  };

  const bukaEditAdmin = (admin) => {
    setAdminDiedit(admin);

    setFormAdmin({
      nama: admin.nama,
      email: admin.email,
      role: admin.role,
      status: admin.status,
    });

    setModalTerbuka(true);
  };

  const tutupModal = () => {
    setModalTerbuka(false);
    setAdminDiedit(null);
  };

  const handleSimpan = (event) => {
    event.preventDefault();

    if (adminDiedit) {
      const dataBaru = daftarAdmin.map(
        (admin) =>
          admin.id === adminDiedit.id
            ? {
                ...admin,
                ...formAdmin,
              }
            : admin,
      );

      simpanDataAdmin(dataBaru);
    } else {
      const adminBaru = {
        id: Date.now(),
        ...formAdmin,
      };

      simpanDataAdmin([
        ...daftarAdmin,
        adminBaru,
      ]);
    }

    tutupModal();
  };

  const handleHapus = (admin) => {
    if (admin.role === "Super Admin") {
      alert(
        "Akun Super Admin utama tidak dapat dihapus.",
      );

      return;
    }

    const yakinHapus = window.confirm(
      `Apakah kamu yakin ingin menghapus ${admin.nama}?`,
    );

    if (yakinHapus) {
      const dataBaru = daftarAdmin.filter(
        (item) => item.id !== admin.id,
      );

      simpanDataAdmin(dataBaru);
    }
  };

  const hasilPencarian = daftarAdmin.filter(
    (admin) => {
      const kataKunci =
        pencarian.toLowerCase();

      return (
        admin.nama
          .toLowerCase()
          .includes(kataKunci) ||
        admin.email
          .toLowerCase()
          .includes(kataKunci) ||
        admin.role
          .toLowerCase()
          .includes(kataKunci)
      );
    },
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
            href="/dashboard"
            className="menu-item"
            style={{ textDecoration: "none" }}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a
            href="/laporan"
            className="menu-item"
            style={{ textDecoration: "none" }}
          >
            <ClipboardList size={20} />
            Laporan
          </a>

          <a
            href="/kelola-admin"
            className="menu-item active"
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
              <p>Admin / Kelola Admin</p>
              <h1>Kelola Admin</h1>
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
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="admin-page-heading">
            <div>
              <h2>Daftar Administrator</h2>

              <p>
                Kelola akun yang dapat mengakses
                E-Rating.
              </p>
            </div>

            <button
              type="button"
              className="add-admin-button"
              onClick={bukaTambahAdmin}
            >
              <Plus size={19} />
              Tambah Admin
            </button>
          </section>

          <section className="admin-card">
            <div className="admin-toolbar">
              <div className="admin-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Cari nama, email, atau peran..."
                  value={pencarian}
                  onChange={(event) =>
                    setPencarian(event.target.value)
                  }
                />
              </div>

              <span>
                {hasilPencarian.length} akun
              </span>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Admin</th>
                    <th>Email</th>
                    <th>Peran</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {hasilPencarian.map(
                    (admin) => (
                      <tr key={admin.id}>
                        <td>
                          <div className="admin-name-cell">
                            <div className="table-avatar">
                              {admin.nama
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <strong>
                              {admin.nama}
                            </strong>
                          </div>
                        </td>

                        <td>{admin.email}</td>

                        <td>
                          <span
                            className={
                              admin.role ===
                              "Super Admin"
                                ? "role-label super-admin"
                                : "role-label"
                            }
                          >
                            <UserCog size={14} />
                            {admin.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              admin.status === "Aktif"
                                ? "admin-status active-status"
                                : "admin-status inactive-status"
                            }
                          >
                            {admin.status}
                          </span>
                        </td>

                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() =>
                                bukaEditAdmin(admin)
                              }
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              className="delete-button"
                              onClick={() =>
                                handleHapus(admin)
                              }
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {modalTerbuka && (
        <div className="admin-modal-overlay">
          <form
            className="admin-modal"
            onSubmit={handleSimpan}
          >
            <div className="admin-modal-heading">
              <div>
                <h3>
                  {adminDiedit
                    ? "Edit Admin"
                    : "Tambah Admin"}
                </h3>

                <p>
                  Lengkapi data akun administrator.
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
              >
                <X size={22} />
              </button>
            </div>

            <label>Nama lengkap</label>

            <input
              type="text"
              placeholder="Masukkan nama admin"
              value={formAdmin.nama}
              onChange={(event) =>
                setFormAdmin({
                  ...formAdmin,
                  nama: event.target.value,
                })
              }
              required
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="nama@disdukcapil.go.id"
              value={formAdmin.email}
              onChange={(event) =>
                setFormAdmin({
                  ...formAdmin,
                  email: event.target.value,
                })
              }
              required
            />

            <div className="admin-form-grid">
              <div>
                <label>Peran</label>

                <select
                  value={formAdmin.role}
                  onChange={(event) =>
                    setFormAdmin({
                      ...formAdmin,
                      role: event.target.value,
                    })
                  }
                >
                  <option value="Admin">
                    Admin
                  </option>

                  <option value="Super Admin">
                    Super Admin
                  </option>
                </select>
              </div>

              <div>
                <label>Status</label>

                <select
                  value={formAdmin.status}
                  onChange={(event) =>
                    setFormAdmin({
                      ...formAdmin,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="Aktif">
                    Aktif
                  </option>

                  <option value="Nonaktif">
                    Nonaktif
                  </option>
                </select>
              </div>
            </div>

            <div className="admin-modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={tutupModal}
              >
                Batal
              </button>

              <button
                type="submit"
                className="save-button"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default KelolaAdmin;