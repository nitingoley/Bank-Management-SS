const express = require("express");
const BankAccount = require("../models/BankAccount.js");
const { authenticate } = require("../middleware/auth.js");

const router = express.Router();

// Middleware to verify admin
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }
  next();
};

// Apply authentication to all admin routes
router.use(authenticate);

// @route   GET /admin/users
// @desc    Get all users' bank accounts (admin only)
// @access  Admin
router.get("/users", isAdmin, async (req, res) => {
  try {
    const accounts = await BankAccount.find().populate("user", "username email");
    res.status(200).json(accounts);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   GET /admin/search?query=abc
// @desc    Search bank accounts by bankName, ifscCode, or accountHolderName
// @access  Admin
router.get("/search", isAdmin, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const results = await BankAccount.find({
      $or: [
        { bankName: { $regex: query, $options: "i" } },
        { ifscCode: { $regex: query, $options: "i" } },
        { accountHolderName: { $regex: query, $options: "i" } },
      ],
    }).populate("user", "username email");

    res.status(200).json(results);
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
