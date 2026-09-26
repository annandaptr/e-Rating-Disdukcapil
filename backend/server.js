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
const authRoutes = require("./routes/authRoutes");             // ← TAMBAH INI
const adminRoutes = require("./routes/adminRoutes");

// Route testing
app.get("/", (req, res) => {
    res.json({
        message: "Backend e-Rating Disdukcapil berjalan!"
    });
});

// Daftarkan routes
app.use("/api/pelayanan", pelayananRoutes);
app.use("/api/ratings", ratingRoutes);                          // ← TAMBAH INI
app.use("/api/auth", authRoutes);                                // ← TAMBAH INI 
app.use("/api/admins", adminRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});