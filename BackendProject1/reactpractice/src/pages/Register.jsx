import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";


function Register() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function registerUser(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'Post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      
    });
    if(response.ok){
      alert('Registration Succesfull');
      navigate('/login');
    }else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.error || "Unknown error"}`);
    }
  }


  return (
    <>
      <div >
        <Header></Header>
        <form
          action=""
          className="max-w-sm mx-auto bg-white rounded-lg shadow-2xl p-6 flex flex-col items-center gap-5 mt-20"
          onSubmit={registerUser}
        >
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={ev => setusername(ev.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
