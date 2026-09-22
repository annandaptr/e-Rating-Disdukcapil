const db = require("../config/db");

// Ambil semua data pelayanan
const getAllPelayanan = async () => {
  const [rows] = await db.execute(
    "SELECT id, nama_pelayanan FROM pelayanan ORDER BY id ASC"
  );
  return rows;
};

module.exports = { getAllPelayanan };