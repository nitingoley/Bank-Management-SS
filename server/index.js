const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const bankRoutes = require("./routes/bank");
const adminRoutes = require("./routes/admin");

const { authenticate } = require("./middleware/auth");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bank-management-ss.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("API is working hroku🚀");
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", authenticate, bankRoutes);
app.use("/api/admin", authenticate, adminRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
