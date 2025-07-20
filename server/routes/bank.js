const express = require("express");
const BankAccount = require("../models/BankAccount.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const data = { ...req.body, user: req.user.id };
  const newAccount = new BankAccount(data);
  await newAccount.save();
  res.status(201).json(newAccount);
});

router.get("/", async (req, res) => {
  const accounts = await BankAccount.find({ user: req.user.id });
  res.json(accounts);
});

router.put("/:id", async (req, res) => {
  const updated = await BankAccount.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await BankAccount.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Deleted" });
});

module.exports = router;
