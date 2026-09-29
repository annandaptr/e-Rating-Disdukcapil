const db = require("../config/db");

// Simpan rating baru
const createRating = async (pelayanan_id, rating, comment) => {
  const [result] = await db.execute(
    "INSERT INTO ratings (pelayanan_id, rating, comment) VALUES (?, ?, ?)",
    [pelayanan_id, rating, comment]
  );
  return result.insertId;
};

// Ambil semua rating, sekalian nama pelayanannya
const getAllRatings = async () => {
  const [rows] = await db.execute(`
    SELECT 
      ratings.id, 
      ratings.pelayanan_id, 
      pelayanan.nama_pelayanan,
      ratings.rating, 
      ratings.comment, 
      ratings.created_at
    FROM ratings
    JOIN pelayanan ON ratings.pelayanan_id = pelayanan.id
    ORDER BY ratings.created_at DESC
  `);
  return rows;
};

module.exports = { createRating, getAllRatings };