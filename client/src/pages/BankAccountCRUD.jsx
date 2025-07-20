import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";




const BankAccountCRUD = () => {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    branchName: "",
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");
const navigate = useNavigate();
  const fetchAccounts = async () => {
    try {
      const res = await axios.get("https://bank-management-ss.onrender.com/api/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
      //  navigate("/dashboard");
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`https://bank-management-ss.onrender.com/api/accounts/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("https://bank-management-ss.onrender.com/api/accounts", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        branchName: "",
      });
      setEditingId(null);
      //  navigate("/dashboard");
      fetchAccounts();
    } catch (err) {
      console.error("Submit error", err);
    }
  };

  const handleEdit = (acc) => {
    setForm({
      bankName: acc.bankName,
      accountNumber: acc.accountNumber,
      accountHolderName: acc.accountHolderName,
      ifscCode: acc.ifscCode,
      branchName: acc.branchName,
    });
    setEditingId(acc._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bank-management-ss.onrender.com/api/accounts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAccounts();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          {editingId ? "Edit Bank Account" : "Add Bank Account"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Account Holder Name"
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IFSC Code"
              name="ifscCode"
              value={form.ifscCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Branch Name"
              name="branchName"
              value={form.branchName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
            >
              {editingId ? "Update" : "Add Account"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Your Bank Accounts
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {accounts.map((acc) => (
            <React.Fragment key={acc._id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton edge="end" onClick={() => handleEdit(acc)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(acc._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={`${acc.bankName} (${acc.accountHolderName})`}
                  secondary={
                    <>
                      Account No: {acc.accountNumber} — IFSC: {acc.ifscCode} — Branch:{" "}
                      {acc.branchName}
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BankAccountCRUD;
