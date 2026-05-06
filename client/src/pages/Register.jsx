import { useState, useEffect } from "react";
import API from "../api";
import "../styles/auth.css";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    setSuccessMsg("");
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = data;
      await API.post("auth/register", registerData);
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        
        {successMsg && <div className="success-message">{successMsg}</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            className={errors.name ? "error" : ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={data.email}
            className={errors.email ? "error" : ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            className={errors.password ? "error" : ""}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            className={errors.confirmPassword ? "error" : ""}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>
        
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? "Creating Account..." : "Register"}
        </button>
        
        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;