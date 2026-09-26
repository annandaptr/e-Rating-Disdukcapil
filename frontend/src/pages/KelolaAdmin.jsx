import { useState, useEffect } from "react";
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

const API_URL = "http://localhost:3000/api/admins";

function KelolaAdmin() {
  const navigate = useNavigate();

  const adminAuth = JSON.parse(
    localStorage.getItem("adminAuth") || "{}",
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pencarian, setPencarian] = useState("");
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [adminDiedit, setAdminDiedit] = useState(null);

  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState("");

  const [formAdmin, setFormAdmin] = useState({
    nik: "",
    nama: "",
    password: "",
    role: "admin",
    status: "aktif",
  });
  const [formError, setFormError] = useState("");
  const [sedangSimpan, setSedangSimpan] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    setErrorFetch("");

    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${adminAuth.token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("adminAuth");
        navigate("/login");
        return;
      }

      const hasil = await response.json();

      if (hasil.success) {
        setDaftarAdmin(hasil.data);
      } else {
        setErrorFetch(hasil.message || "Gagal memuat data admin");
      }
    } catch (error) {
      setErrorFetch("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bukaTambahAdmin = () => {
    setAdminDiedit(null);
    setFormError("");

    setFormAdmin({
      nik: "",
      nama: "",
      password: "",
      role: "admin",
      status: "aktif",
    });

    setModalTerbuka(true);
  };

  const bukaEditAdmin = (admin) => {
    setAdminDiedit(admin);
    setFormError("");

    setFormAdmin({
      nik: admin.nik,
      nama: admin.nama,
      password: "",
      role: admin.role,
      status: admin.status,
    });

    setModalTerbuka(true);
  };

  const tutupModal = () => {
    setModalTerbuka(false);
    setAdminDiedit(null);
    setFormError("");
  };

  const handleSimpan = async (event) => {
    event.preventDefault();

    setFormError("");
    setSedangSimpan(true);

    try {
      let response;

      if (adminDiedit) {
        // Edit: cuma nama, role, status yang bisa diubah (NIK & password tetap)
        response = await fetch(`${API_URL}/${adminDiedit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminAuth.token}`,
          },
          body: JSON.stringify({
            nama: formAdmin.nama,
            role: formAdmin.role,
            status: formAdmin.status,
          }),
        });
      } else {
        // Tambah admin baru
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminAuth.token}`,
          },
          body: JSON.stringify({
            nik: formAdmin.nik,
            nama: formAdmin.nama,
            password: formAdmin.password,
            role: formAdmin.role,
          }),
        });
      }

      if (response.status === 401) {
        localStorage.removeItem("adminAuth");
        navigate("/login");
        return;
      }

      const hasil = await response.json();

      if (hasil.success) {
        tutupModal();
        fetchAdmins();
      } else {
        setFormError(hasil.message || "Gagal menyimpan data admin");
      }
    } catch (error) {
      setFormError("Tidak bisa terhubung ke server.");
    } finally {
      setSedangSimpan(false);
    }
  };

  const handleHapus = async (admin) => {
    if (admin.id === adminAuth.id) {
      alert("Tidak bisa menghapus akun sendiri.");
      return;
    }

    const yakinHapus = window.confirm(
      `Apakah kamu yakin ingin menghapus ${admin.nama}?`,
    );

    if (!yakinHapus) return;

    try {
      const response = await fetch(`${API_URL}/${admin.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminAuth.token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("adminAuth");
        navigate("/login");
        return;
      }

      const hasil = await response.json();

      if (hasil.success) {
        fetchAdmins();
      } else {
        alert(hasil.message || "Gagal menghapus admin");
      }
    } catch (error) {
      alert("Tidak bisa terhubung ke server.");
    }
  };

  const labelRole = (role) =>
    role === "super_admin" ? "Super Admin" : "Admin";

  const labelStatus = (status) =>
    status === "aktif" ? "Aktif" : "Nonaktif";

  const hasilPencarian = daftarAdmin.filter((admin) => {
    const kataKunci = pencarian.toLowerCase();

    return (
      admin.nama.toLowerCase().includes(kataKunci) ||
      admin.nik.includes(kataKunci) ||
      labelRole(admin.role).toLowerCase().includes(kataKunci)
    );
  });

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

      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
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

        <p className="menu-title">MENU UTAMA</p>

        <nav className="sidebar-menu">
          <a
            href="/admin/dashboard"
            className="menu-item"
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
            <strong>{labelRole(adminAuth.role)}</strong>
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
          <section className="admin-page-heading">
            <div>
              <h2>Daftar Administrator</h2>
              <p>Kelola akun yang dapat mengakses E-Rating.</p>
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
                  placeholder="Cari nama, NIK, atau peran..."
                  value={pencarian}
                  onChange={(event) => setPencarian(event.target.value)}
                />
              </div>

              <span>{hasilPencarian.length} akun</span>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Admin</th>
                    <th>NIK</th>
                    <th>Peran</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "30px" }}>
                        Memuat data...
                      </td>
                    </tr>
                  )}

                  {!loading && errorFetch && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", padding: "30px", color: "#B23A2E" }}
                      >
                        {errorFetch}
                      </td>
                    </tr>
                  )}

                  {!loading && !errorFetch && hasilPencarian.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "30px" }}>
                        Tidak ada data admin.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    !errorFetch &&
                    hasilPencarian.map((admin) => (
                      <tr key={admin.id}>
                        <td>
                          <div className="admin-name-cell">
                            <div className="table-avatar">
                              {admin.nama.charAt(0).toUpperCase()}
                            </div>

                            <strong>{admin.nama}</strong>
                          </div>
                        </td>

                        <td>{admin.nik}</td>

                        <td>
                          <span
                            className={
                              admin.role === "super_admin"
                                ? "role-label super-admin"
                                : "role-label"
                            }
                          >
                            <UserCog size={14} />
                            {labelRole(admin.role)}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              admin.status === "aktif"
                                ? "admin-status active-status"
                                : "admin-status inactive-status"
                            }
                          >
                            {labelStatus(admin.status)}
                          </span>
                        </td>

                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() => bukaEditAdmin(admin)}
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              className="delete-button"
                              onClick={() => handleHapus(admin)}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {modalTerbuka && (
        <div className="admin-modal-overlay">
          <form className="admin-modal" onSubmit={handleSimpan}>
            <div className="admin-modal-heading">
              <div>
                <h3>{adminDiedit ? "Edit Admin" : "Tambah Admin"}</h3>
                <p>Lengkapi data akun administrator.</p>
              </div>

              <button type="button" onClick={tutupModal}>
                <X size={22} />
              </button>
            </div>

            {formError && (
              <div
                style={{
                  padding: "12px 14px",
                  margin: "17px 0 0",
                  borderRadius: "9px",
                  background: "#F6E7E4",
                  color: "#B23A2E",
                  fontSize: "13px",
                }}
              >
                {formError}
              </div>
            )}

            <label>Nama lengkap</label>

            <input
              type="text"
              placeholder="Masukkan nama admin"
              value={formAdmin.nama}
              onChange={(event) =>
                setFormAdmin({ ...formAdmin, nama: event.target.value })
              }
              required
            />

            {!adminDiedit && (
              <>
                <label>NIK</label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={16}
                  placeholder="16 digit NIK"
                  value={formAdmin.nik}
                  onChange={(event) =>
                    setFormAdmin({
                      ...formAdmin,
                      nik: event.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                />

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={formAdmin.password}
                  onChange={(event) =>
                    setFormAdmin({
                      ...formAdmin,
                      password: event.target.value,
                    })
                  }
                  minLength={8}
                  required
                />
              </>
            )}

            <div className="admin-form-grid">
              <div>
                <label>Peran</label>

                <select
                  value={formAdmin.role}
                  onChange={(event) =>
                    setFormAdmin({ ...formAdmin, role: event.target.value })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              {adminDiedit && (
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
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                </div>
              )}
            </div>

            <div className="admin-modal-actions">
              <button type="button" className="cancel-button" onClick={tutupModal}>
                Batal
              </button>

              <button type="submit" className="save-button" disabled={sedangSimpan}>
                {sedangSimpan ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default KelolaAdmin;
