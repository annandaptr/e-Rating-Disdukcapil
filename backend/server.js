const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Backend SIPELA berjalan");
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});