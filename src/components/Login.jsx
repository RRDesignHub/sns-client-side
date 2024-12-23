import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export const Login = () => {
  const [authError, setAuthError] = useState(null);
  const { setUser, user, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleUserLogin = (e) => {
    e.preventDefault();
    setAuthError(null)
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password)
      .then((result) => {
        
        setUser(result.user);
        Swal.fire({
          position: "top-end",
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
      <div className="hero  w-11/12 mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="flex-1 card bg-green-50  max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleUserLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <p className="text-red-500">{authError}</p>
              <div className="form-control mt-6">
                <button className="btn bg-green-600 text-white hover:bg-green-700">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
