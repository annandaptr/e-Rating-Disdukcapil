const ratingModel = require("../models/ratingModel");

const createRating = async (req, res) => {
  try {
    const { pelayanan_id, rating, comment } = req.body;

    // Validasi: field wajib ada
    if (!pelayanan_id || !rating) {
      return res.status(400).json({
        success: false,
        message: "pelayanan_id dan rating wajib diisi",
      });
    }

    // Validasi: rating harus angka 1-5
    const ratingNum = Number(rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating harus antara 1 sampai 5",
      });
    }

       // Validasi: komentar gak boleh kepanjangan
    if (comment && comment.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Komentar maksimal 500 karakter",
      });
    }

    const insertId = await ratingModel.createRating(
      pelayanan_id,
      rating,
      comment || null
    );

    res.status(201).json({
      success: true,
      message: "Rating berhasil dikirim",
      data: { id: insertId },
    });
  } catch (error) {
    console.error("Error createRating:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menyimpan rating",
    });
  }
};

module.exports = { createRating };