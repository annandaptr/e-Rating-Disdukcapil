const db = require("../config/db");

// Simpan rating baru
const createRating = async (pelayanan_id, rating, comment) => {
  const [result] = await db.execute(
    "INSERT INTO ratings (pelayanan_id, rating, comment) VALUES (?, ?, ?)",
    [pelayanan_id, rating, comment]
  );
  return result.insertId;
};

module.exports = { createRating };