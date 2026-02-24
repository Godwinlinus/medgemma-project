import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthToggle from "./AuthToggle";

const isEmail = (s = "") => /\S+@\S+\.\S+/.test(s);

const SignUpForm = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("signup"); // signup | signin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Shared validation
    if (!isEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Signup-only validation
    if (mode === "signup") {
      if (!form.fullName.trim()) {
        setError("Full name is required.");
        return;
      }

      if (!form.licenseNumber.trim()) {
        setError("Medical license number is required.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    // Simulated auth
    setTimeout(() => {
      setLoading(false);
      navigate("/clinical-workspace");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border-dark bg-surface-dark p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-white">
            {mode === "signup" ? "Create Clinician Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-[#7fa3a1] mt-1">
            {mode === "signup"
              ? "Secure access to AI-powered clinical tools."
              : "Sign in to continue your clinical workspace."}
          </p>
        </div>

        <AuthToggle mode={mode} setMode={setMode} />

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="text-xs">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg- border border-border-dark px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="text-xs">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border-dark px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="text-xs">Medical License Number</label>
              <input
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border-dark px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="text-xs">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border-dark px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="text-xs">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border-dark px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <button
            disabled={loading}
            className="mt-2 h-12 rounded-lg bg-primary font-semibold text-white transition hover:bg-[#1b2727] disabled:opacity-50"
          >
            {loading
              ? "Authenticating..."
              : mode === "signup"
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#527a78]">
          HIPAA & GDPR compliant. Clinical-grade security.
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
