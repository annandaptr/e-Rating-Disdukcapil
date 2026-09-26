const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");

const getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.getAllAdmins();
    res.json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { nik, nama, password, role } = req.body;

    if (!nik || !nama || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "NIK, nama, password, dan role wajib diisi",
      });
    }

    if (!/^\d{16}$/.test(nik)) {
      return res.status(400).json({
        success: false,
        message: "NIK harus 16 digit angka",
      });
    }

    if (!["super_admin", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role tidak valid",
      });
    }

    const existing = await adminModel.findByNik(nik);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "NIK sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertId = await adminModel.createAdmin(nik, nama, hashedPassword, role);

    res.status(201).json({
      success: true,
      message: "Admin berhasil ditambahkan",
      data: { id: insertId, nik, nama, role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, role, status } = req.body;

    if (!nama || !role || !status) {
      return res.status(400).json({
        success: false,
        message: "Nama, role, dan status wajib diisi",
      });
    }

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin tidak ditemukan" });
    }

    await adminModel.updateAdmin(id, nama, role, status);

    res.json({ success: true, message: "Admin berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number(id) === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: "Tidak bisa menghapus akun sendiri",
      });
    }

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin tidak ditemukan" });
    }

    await adminModel.deleteAdmin(id);

    res.json({ success: true, message: "Admin berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

module.exports = { getAdmins, createAdmin, updateAdmin, deleteAdmin };