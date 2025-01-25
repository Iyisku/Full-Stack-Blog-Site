import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext); 
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else{
          console.log("You are loggedOut");
        }
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);
  

  function logout(){
    fetch("http://localhost:4000/logout", {
      credentials: 'include',
      method: 'POST',
    }).then(()=>{
      setUserInfo(null); 
     navigate('/');
    }
    );


  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center bg-slate-200 px-6 py-4 shadow-md mb-5">
      {/* Logo / Title */}
      <Link
        to="/"
        className="text-blue-800 text-2xl font-serif font-extrabold hover:text-sky-500 transition duration-300"
      >
        My Blog Post
      </Link>

      {/* Navigation */}
      <nav className="flex space-x-6">
        {username && (
          <>
            <Link
              to="/create"
              className="text-blue-700 font-bold hover:text-sky-500 transition duration-300"
            >
              Create new post
            </Link>
            <a onClick={logout}  className="text-blue-700 font-bold hover:text-sky-500 hover:cursor-pointer transition duration-300">Logout {username}</a>
          </>
        )}
        {!username && (
          <>
            <Link
              to="/login"
              className="text-blue-700 font-bold hover:text-sky-500 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-700 font-bold hover:text-sky-500 transition duration-300"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
