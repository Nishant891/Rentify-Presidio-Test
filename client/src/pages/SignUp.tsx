import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AxiosResponse } from "axios";

interface Data {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  type: string;
}

const SignUp: React.FC = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [data, setData] = useState<Data>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    type: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const response : AxiosResponse = await axios.post("http://localhost:8000/signup", {
        ...data
      });
      setLoading(false);
      if (response.data.success === false) {
        return setError(response.data.message);
      } else {
        setCookie("token", response.data.token, {
          path: "/",
          maxAge: 3600, // Expires after 1 hour
          sameSite: "strict",
        });
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-4">SIGN UP</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Firstname"
          id="firstname"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Lastname"
          id="lastname"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Phone No."
          id="phone"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <h3 className="text-xl font-semibold">Select Account Type: </h3>

        <div className="flex gap-4 justify-start items-center">
          <label className="flex gap-1">
            <input
              type="radio"
              name="type"
              value="seller"
              required
              onChange={(e) =>
                setData({ ...data, type: e.target.value })
              }
            />
            Seller
          </label>

          <label className="flex gap-1">
            <input
              type="radio"
              name="type"
              value="buyer"
              required
              onChange={(e) =>
                setData({ ...data, type: e.target.value })
              }
            />
            Buyer
          </label>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 p-3 rounded-sm text-white uppercase hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/login">
          <span className="text-blue-800 hover:underline">Log In</span>
        </Link>
      </div>
      {error && (
        <div className="bg-red-300 p-3 rounded-lg mt-5 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default SignUp;
