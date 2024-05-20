import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Data {
  address: string;
  no_of_bedrooms: string;
  no_of_bathrooms: string;
  neighborhood: string;
}

const Posts: React.FC = () => {
  const [data, setData] = useState<Data>({
    address: "",
    no_of_bedrooms: "",
    no_of_bathrooms: "",
    neighborhood: "",
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
      const token = Cookies.get("token");
      if (token) {
        try{
            const response: AxiosResponse = await axios.post(
                "http://localhost:8000/createPost",
                {
                  ...data,
                }
              );
              setLoading(false);
              if (response.data.success === false) {
                return setError(response.data.message);
              } else {
                alert("Posted your property");
              }
        }catch(error : any){
            setError(error.message);
            setLoading(false);
        }
      }else{
        navigate("/login")
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-4">Create a new post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <textarea
          placeholder="Address"
          id="address"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="No_of_bedrooms"
          id="no_of_bedrooms"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="No_of_bathrooms"
          id="no_of_bathrooms"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />

        <textarea
          placeholder="Neighborhood"
          id="neighborhood"
          required
          className="border border-gray-300 p-3 rounded-sm focus:outline-none"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 p-3 rounded-sm text-white uppercase hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Post"}
        </button>
      </form>
      {error && (
        <div className="bg-red-300 p-3 rounded-lg mt-5 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default Posts;
