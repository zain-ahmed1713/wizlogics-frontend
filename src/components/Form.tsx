import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface FormProps {
  mode: "LOGIN" | "SIGNUP" | "VERIFY";
}

interface FormData {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  otp?: number;
}

const schema = yup.object().shape({
  name: yup.string().when("$mode", {
    is: "SIGNUP", // Only required in SIGNUP mode
    then: (name: any) => name.required("Name is required"),
    otherwise: (name: any) => name.notRequired(),
  }),
  username: yup.string().when("$mode", {
    is: (mode: any) => mode !== "VERIFY",
    then: (username: any) => username.required("Username is required"),
    otherwise: (username: any) => username.notRequired(),
  }),
  email: yup.string().when("$mode", {
    is: "SIGNUP", // Only required in SIGNUP mode
    then: (email: any) =>
      email.email("Please enter a valid email").required("Email is required"),
    otherwise: (email: any) => email.notRequired(),
  }),
  password: yup.string().when("$mode", {
    is: (mode: any) => mode !== "VERIFY", // Required for both LOGIN and SIGNUP
    then: (password: any) =>
      password
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number"),
    otherwise: (password: any) => password.notRequired(),
  }),
  otp: yup.number().when("$mode", {
    is: (mode: any) => mode === "VERIFY", // Only required in VERIFY mode
    then: (otp: any) => otp.required("OTP is required"),
    otherwise: (otp: any) => otp.notRequired(),
  }),
});

const Form = ({ mode }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    context: { mode },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      if (mode === "SIGNUP") {
        const response = await axios.post("/api/users/register", data);
        if (response.status === 201) {
          setIsLoading(false);
          navigate(`/verify/${data.username}`);
        }
      }

      if (mode === "VERIFY") {
        const response = await axios.post("/api/users/verify", {
          username: params.username,
          OTP: Number(data.otp),
        });
        if (response.status === 201) {
          setIsLoading(false);
          navigate("/login");
        }
      }

      if (mode === "LOGIN") {
        const response = await login(data.username!, data.password!);
        if (response.role === "admin") {
          setIsLoading(false);
          navigate("/admin-panel");
        }
        if (response.role === "user") {
          setIsLoading(false);
          navigate("/feed");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full mb-5">
        <h2 className="text-white text-center font-bold text-2xl mb-2">
          {mode === "LOGIN"
            ? "Sign In"
            : mode !== "SIGNUP"
            ? "Verify"
            : "Sign Up"}
        </h2>
        <p className="text-white text-center text-sm">
          {mode === "LOGIN"
            ? "Login to WizLogics and continue your learning journey"
            : mode !== "SIGNUP"
            ? "Enter OTP sent to your email"
            : "Become a part of WizLogics Community and embark on a journey of growth."}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto md:w-1/2 lg:w-1/4"
      >
        {mode === "SIGNUP" && (
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
            />
            <p className="text-red-600">{errors.name?.message}</p>
          </div>
        )}
        {mode === "SIGNUP" && (
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="someone@example.com"
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
        )}
        {mode !== "VERIFY" && (
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john_doe"
            />
            <p className="text-red-600">{errors.username?.message}</p>
          </div>
        )}
        {mode !== "VERIFY" && (
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="********"
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
        )}
        {mode === "VERIFY" && (
          <div className="mb-5">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OTP
            </label>
            <input
              type="number"
              id="otp"
              {...register("otp")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="1234"
              required
            />
            <p className="text-red-600">{errors.otp?.message}</p>
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {mode === "LOGIN"
            ? "Sign In"
            : mode !== "SIGNUP"
            ? "Verify"
            : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Form;
