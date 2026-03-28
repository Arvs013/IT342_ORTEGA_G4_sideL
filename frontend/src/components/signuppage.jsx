import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/api/users"; // Your backend endpoint

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (loading) return;

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill name, email, and password.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const data = await response.json();
      setSuccess("Account created successfully!");

      localStorage.setItem("loggedUser", JSON.stringify(data));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`signup-container ${isLoaded ? "loaded" : ""}`}>
      <div className="signup-card">

        <div className="logo">sideL</div>

        <h1 className="signup-title">Get Started</h1>
        <p className="signup-subtitle">
          Welcome to sideL. Let's create your account
        </p>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">Sign up with Email</span>
          <span className="line"></span>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          {["name", "email", "password", "phoneNumber", "address"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
              value={formData[field]}
              onChange={handleChange}
              className="input-box"
            />
          ))}
        </div>

        <button
          className="email-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="terms-text">
          By clicking "Sign up", you agree to our{" "}
          <Link to="/terms">Terms</Link>,{" "}
          <Link to="/privacy">Privacy Policy</Link> and{" "}
          <Link to="/cookies">Cookies Policy</Link>.
        </p>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">Log in</Link>
        </p>

      </div>
    </div>
  );
};

export default SignupPage;