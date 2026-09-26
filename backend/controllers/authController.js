const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const login = async (req, res) => {
  try {
    const { nik, password } = req.body;

    // Validasi: NIK & password wajib diisi
    if (!nik || !password) {
      return res.status(400).json({
        success: false,
        message: "NIK dan password wajib diisi",
      });
    }

    // Validasi: NIK harus 16 digit angka
    if (!/^\d{16}$/.test(nik)) {
      return res.status(400).json({
        success: false,
        message: "NIK harus 16 digit angka",
      });
    }

    const admin = await adminModel.findByNik(nik);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "NIK atau password salah",
      });
    }

    if (admin.status !== "aktif") {
      return res.status(403).json({
        success: false,
        message: "Akun ini nonaktif, hubungi super admin",
      });
    }

    const passwordCocok = await bcrypt.compare(password, admin.password);

    if (!passwordCocok) {
      return res.status(401).json({
        success: false,
        message: "NIK atau password salah",
      });
    }

    const token = jwt.sign(
      { id: admin.id, nik: admin.nik, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        token,
        admin: {
          id: admin.id,
          nik: admin.nik,
          nama: admin.nama,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

module.exports = { login };