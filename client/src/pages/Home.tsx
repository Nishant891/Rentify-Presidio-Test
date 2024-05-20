import { useEffect, useState } from "react";
import Header from "../components/Header";
import Cookies from 'js-cookie'
import { AxiosResponse } from "axios";
import axios from "axios";

interface Data {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    type: string;
  }

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [data, setData] = useState<Data>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        type: "buyer",
      })
    const [posts, setPosts] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('token');
            if(token){
                setIsLoggedIn(true);
                const response : AxiosResponse = await axios.get("http://localhost:8000/getUser", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setData(response.data.data);
            }
        } 
        fetchData();

        const fetchPosts = async () => {
            try {
              const response = await axios.get("http://localhost:8000/posts");
              setPosts(response.data.posts);
            } catch (error) {
              console.error("Error fetching posts:", error);
            }
          };
          fetchPosts();
    }, [])
  return (
    <>
      <Header isLoggedIn={isLoggedIn} type={data.type}/>
      <div className="w-screen flex justify-center items-center pt-[6rem] px-2">
        <div className="w-full md:w-3/5 h-full overflow-y-scroll border boder-black rounded-sm p-2">
        <ul className="flex flex-col gap-2">
        {posts.map((post,index) => (
          <li key={index} className="w-full border border-gray-950 shadow-sm rounded-lg p-2">
            <p>Address: {post.address}</p>
            <p>Bedrooms: {post.no_of_bedrooms}</p>
            <p>Bathrooms: {post.no_of_bathrooms}</p>
            <p>Neighborhood: {post.neighborhood}</p>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
