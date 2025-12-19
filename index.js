const express = require("express");
const cors = require("cors");
const { ktpgen } = require("./ktp");

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// cek server hidup
app.get("/", (req, res) => {
  res.send("API KTP hidup ✅");
});

// ENDPOINT UTAMA
app.post("/api/ktp", async (req, res) => {
  try {
    const buffer = await ktpgen(req.body);

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Gagal generate KTP"
    });
  }
});

// Render pakai PORT dari env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});