import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import BankAccountCRUD from "./pages/BankAccountCRUD";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Header title="Dashboard" subtitle="Welcome to your dashboard" />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin-Only Route */}
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly>
              <>
                <Header title="All Users" subtitle="Manage user bank accounts" />
                <Users />
              </>
            </ProtectedRoute>
          }
        />   
        <Route path="/create" element={<BankAccountCRUD />} />

      </Routes>
    </Router>
  );
};

export default App;
