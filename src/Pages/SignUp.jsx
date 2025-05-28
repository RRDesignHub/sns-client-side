import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
export const SignUp = () => {
  const [authError, setAuthError] = useState(null);
  const { setUser, userCreate } = useAuth();
  const navigate = useNavigate();
  const handleUserSignUp = async(e) => {
    e.preventDefault();
    setAuthError(null);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    try{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/sign-up-user?name=${name}&email=${email}&password=${password}`);
      if(data.message){
        return setAuthError(data.message);
      }
      userCreate(email, password)
            .then((result) => {
              setUser(result.user);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `ইউজার রেজিস্ট্রেশন সফল হয়েছে!`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashboard");
              form.reset();
            })
            .catch((err) => {
              if (err.code === "auth/invalid-email") {
                setAuthError("The email address you entered is not valid.");
              } else if (err.code === "auth/wrong-password") {
                setAuthError("সঠিক পাসওয়ার্ড প্রদান করুন!!!");
              } else if (err.code === "auth/user-not-found") {
                setAuthError("প্রদত্ত ইমেইল দিয়ে কোনো ইউজার নেই!!!");
              } else {
                setAuthError("প্রদত্ত তথ্য দিয়ে ইউজার রেজিস্ট্রেশন করা আছে!!!");
              }
            });
    }catch(err){
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>রেজিস্ট্রেশন</title>
      </Helmet>
      <div className="min-h-screen flex justify-center bg-green-50 items-center bg-sand">
        <div className="w-full max-w-md px-6 py-8 bg-background rounded-lg shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img className="h-20" src={logo} alt="TourHub Logo" />
          </div>
          <h2 className="text-xl font-nunito text-chocolate text-center mb-4">
            সঠিক তথ্য প্রদান করে রেজিস্ট্রেশন করুন
          </h2>

          {/* Login Form */}
          <form onSubmit={handleUserSignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary">পূর্ণ নাম</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="নাম লিখুন"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary">ইমেইল</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary">পাসওয়ার্ড</span>
              </label>
              <input
                type="password"
                name="password"
                // onChange={(e) => validatePassword(e.target.value)}
                placeholder="********"
                className="input input-bordered"
                required
              />
            </div>
            <p className="text-red-400 text-sm text-center py-2">{authError}</p>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full px-6 py-3 text-white font-medium tracking-wide capitalize bg-green-500 rounded-lg hover:bg-green-400 transition focus:outline-none focus:ring focus:ring-chocolate"
            >
              রেজিস্ট্রেশন করুন
            </button>
          </form>

          <div className="divider my-6"></div>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="btn btn-sm bg-green-100 text-sm text-green-900 font-heebo hover:underline"
            >
              হোম পেইজে ফিরুন
            </Link>
            <Link
              to="/login"
              className="btn btn-sm bg-green-100 text-green-900 text-sm text-dark font-heebo hover:underline"
            >
              লগইন পেইজে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
