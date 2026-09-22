const pelayananModel = require("../models/pelayananModel");

const getPelayanan = async (req, res) => {
  try {
    const data = await pelayananModel.getAllPelayanan();
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error getPelayanan:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data pelayanan",
    });
  }
};

module.exports = { getPelayanan };