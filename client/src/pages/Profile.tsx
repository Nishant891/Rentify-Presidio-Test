import { useEffect, useState } from "react";
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

const Profile = () => {
    const [data, setData] = useState<Data>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        type: "buyer",
      })
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('token');
            if(token){
                const response : AxiosResponse = await axios.get("http://localhost:8000/getUser", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setData(response.data.data);
            }
        } 
        fetchData();
    }, [])
    
  return (
    <>
      <div className={`flex flex-col gap-y-2 justify-center items-center w-screen h-screen p-3 overflow-x-hidden`}>
      <div className="w-4/5 sm:w-1/2 rounded-lg border border-gray-100 shadow-xl">
        <dl className="divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Title</dt>
            
              <dd className="text-gray-700 sm:col-span-2">
                {data.type}
              </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Firstame</dt>
            
              <dd className="text-gray-700 sm:col-span-2">{data.firstname}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Lastame</dt>
            
              <dd className="text-gray-700 sm:col-span-2">{data.lastname}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            
              <dd className="text-gray-700 sm:col-span-2">{data.email}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Phone</dt>
            
              <dd className="text-gray-700 sm:col-span-2">{data.phone}</dd>
          </div>
        </dl>
      </div>
    </div>
    </>
  );
};

export default Profile;
