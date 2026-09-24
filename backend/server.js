const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Import routes
const pelayananRoutes = require("./routes/pelayananRoutes");
const ratingRoutes = require("./routes/ratingRoutes");         // ← TAMBAH INI

// Route testing
app.get("/", (req, res) => {
    res.json({
        message: "Backend e-Rating Disdukcapil berjalan!"
    });
});

// Daftarkan routes
app.use("/api/pelayanan", pelayananRoutes);
app.use("/api/ratings", ratingRoutes);                          // ← TAMBAH INI

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});