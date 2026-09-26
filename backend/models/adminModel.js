const db = require("../config/db");

const findByNik = async (nik) => {
  const [rows] = await db.execute(
    "SELECT * FROM admins WHERE nik = ?",
    [nik]
  );
  return rows[0];
};

const findById = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, nik, nama, role, status, created_at FROM admins WHERE id = ?",
    [id]
  );
  return rows[0];
};

const getAllAdmins = async () => {
  const [rows] = await db.execute(
    "SELECT id, nik, nama, role, status, created_at FROM admins ORDER BY created_at DESC"
  );
  return rows;
};

const createAdmin = async (nik, nama, hashedPassword, role) => {
  const [result] = await db.execute(
    "INSERT INTO admins (nik, nama, password, role) VALUES (?, ?, ?, ?)",
    [nik, nama, hashedPassword, role]
  );
  return result.insertId;
};

const updateAdmin = async (id, nama, role, status) => {
  await db.execute(
    "UPDATE admins SET nama = ?, role = ?, status = ? WHERE id = ?",
    [nama, role, status, id]
  );
};

const deleteAdmin = async (id) => {
  await db.execute("DELETE FROM admins WHERE id = ?", [id]);
};

module.exports = {
  findByNik,
  findById,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};