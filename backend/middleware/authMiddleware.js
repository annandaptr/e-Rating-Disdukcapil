const jwt = require("jsonwebtoken");

// Cek token JWT valid, tolak kalau gak ada/salah
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan, silakan login kembali",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { id, nik, role }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};

// Cek role super_admin, dipakai buat endpoint sensitif (tambah/hapus admin)
const requireSuperAdmin = (req, res, next) => {
  if (req.admin.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Hanya Super Admin yang boleh melakukan ini",
    });
  }
  next();
};

module.exports = { verifyToken, requireSuperAdmin };