import React, { useState,useEffect, useContext } from 'react'
import Header from '../Components/Header'
import { Link, Navigate, useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import { UserContext } from '../UserContext';


function PostDetail() {

  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
   const [redirect, setredirect] = useState(false);
  const {id} = useParams();
  useEffect(()=>{
    fetch(`http://localhost:4000/post/${id}`).then(response => {
      response.json().then(postinfo => {
        setPostInfo(postinfo);
      },[])
    })
  })
  if(!postInfo) return '';

  async function DeletePost(ev){
    ev.preventDefault();
   const response = await fetch(`http://localhost:4000/post/${postInfo._id}`, {
      method: "DELETE",
      credentials: "include", // Include credentials if your backend uses cookies for authentication
    })
   if(response.ok){
    alert("Post deleted");
    setredirect(true);
   }
   
  }
  if(redirect){
   return  <Navigate to='/' />
  }
  
  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-sky-500 mb-4">
        {postInfo.title}
      </h1>
      <div className="text-center text-gray-600 mb-6">
        <h3 className="text-lg font-medium">by {postInfo.author.username}</h3>
        <time className="text-sm">{formatISO9075(new Date(postInfo.createdAt))}</time>
        {userInfo.id === postInfo.author._id && (
  <div className=" flex justify-between mt-4">
    <Link
      to={`/edit/${postInfo._id}`}
      className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      Edit this post
    </Link>
    <button onClick={DeletePost} className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">Delete Post</button>
  </div>
)}

          
      </div>
      
      <div
        className="bg-gray-50 p-8 rounded-lg shadow-lg leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  </>
  
  )
}

export default PostDetail