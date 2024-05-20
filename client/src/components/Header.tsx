import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

interface HeaderProps {
  isLoggedIn: boolean;
  type?: any;
}
const Header = ({ isLoggedIn, type }: HeaderProps) => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const handleLogOut = () => {
    console.log("done");
    Cookies.remove("token");
    alert("User logged out")
  }
  return (
    <header className="fixed top-2 left-1/2 transform -translate-x-1/2 w-full sm:w-2/5 flex justify-between items-center border border-gray-300 border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] text-gray-950 text-center p-4 px-8 rounded-full">
      <Link to="/">
        <h1 className="text-2xl font-bold">RENTIFY</h1>
      </Link>
      <div className="relative">
        <button
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          <CgProfile size={30} />
        </button>
        {!hidden ? (
          <div className="h-[8rem] w-[10rem] shadow-md bg-white border rounded-sm border-gray-300 absolute top-8 -left-16 flex flex-col justify-evenly items-center">
            {isLoggedIn ? (
              <div className="flex flex-col gap-1">
                {type == "seller" ? (
                  <Link to="/posts" className="text-gray-950">
                    Create Post
                  </Link>
                ) : null}
                <Link to='/profile' className="text-gray-950">
                  View profile
                </Link>
                <button onClick={handleLogOut} className="p-4 rounded-sm bg-red-500 h-10 w-26 flex items-center">
                  LOG OUT
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => {navigate('/login')}} className="p-4 rounded-sm bg-blue-500 h-10 w-26 flex items-center">
                  LOG IN
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
