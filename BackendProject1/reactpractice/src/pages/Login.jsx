import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Login() {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  const{setUserInfo}= useContext(UserContext);


  async function loginuser(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'Post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    if(response.ok){
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
        setredirect(true);
      })
     
    }else{
      alert('wrong credentials');
    }
  }
  if(redirect){
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>
        <Header></Header>
        <form
          action=""
          className="max-w-sm mx-auto bg-white rounded-lg shadow-2xl p-6 flex flex-col items-center gap-5 mt-20"
          onSubmit={loginuser}
        >
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            value = {username}
            onChange={ev=> setusername(ev.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value= {password}
            onChange={ev=> setpassword(ev.target.value)}
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
