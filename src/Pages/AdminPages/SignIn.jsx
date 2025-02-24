import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
export const SignIn = () => {
  const [authError, setAuthError] = useState(null);
  const { setUser, user, userLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAuthError(null);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Admin successfully loged in!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state ? `${location.state}` : "/");
        form.reset();
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setAuthError("The email address you entered is not valid.");
        } else if (err.code === "auth/wrong-password") {
          setAuthError("The password you entered is incorrect.");
        } else if (err.code === "auth/user-not-found") {
          setAuthError("No account exists with the provided email.");
        } else {
          setAuthError("An unexpected error occurred.");
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>SN-Admin Login</title>
      </Helmet>
      <div className="min-h-screen flex justify-center bg-green-50 items-center bg-sand">
        <div className="w-full max-w-md px-6 py-8 bg-background rounded-lg shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img className="h-20" src={logo} alt="TourHub Logo" />
          </div>
          <h2 className="text-xl font-nunito text-chocolate text-center mb-4">
            Welcome Back!
          </h2>

          {/* Login Form */}
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
                type="email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password*
              </label>
              <input
                id="password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
                type="password"
                required
              />
            </div>
            {authError && <p className="text-red-500 mb-3">{authError}</p>}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-white font-medium tracking-wide capitalize bg-green-500 rounded-lg hover:bg-green-400 transition focus:outline-none focus:ring focus:ring-chocolate"
            >
              Login
            </button>
          </form>

          <div className="divider my-6"></div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-sm text-dark font-heebo hover:underline"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
