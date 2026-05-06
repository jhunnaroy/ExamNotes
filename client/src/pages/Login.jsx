import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await API.post("/auth/login", data);

      console.log("✅ LOGIN RESPONSE:", res.data); // Debug

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user (optional)
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // ✅ Navigate properly (NO page reload)
      navigate("/dashboard");

    } catch (error) {
      console.log("❌ LOGIN ERROR:", error);

      const errorMsg =
        error.response?.data?.message || "Invalid email or password";

      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Welcome Back</h2>

        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={data.email}
            className={errors.email ? "error" : ""}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            className={errors.password ? "error" : ""}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <div className="form-options">
          <label className="checkbox-label">
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password" className="forgot-link">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link">
          Don't have an account?{" "}
          <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;