import React, { useEffect, useState } from "react";
import Reactquill from "react-quill";
import Header from "../Components/Header";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { Navigate,useParams } from "react-router-dom";

function EditPost() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
        const [summary,setSummary] = useState('');
        const [content,setContent] = useState('');
        const [redirect, setredirect] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:4000/post/'+ id).then(response=>{
            response.json().then(postinfo => {
                setTitle(postinfo.title);
                setContent(postinfo.content);
                setSummary(postinfo.summary);
            })
        })
    }, [])

    async function editpost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);  
        data.set('id', id);  

     const response =   await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include', 
        });
        if(response.ok){
            setredirect(true);
        }
       
    }

        if(redirect){
            return <Navigate to={`/post/${id}`} />;
          }
  return (
    <>
      
    <Header />
    <form onSubmit={editpost} className="space-y-4">
      <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Reactquill 
        value={content} 
        onChange={newvalue => setContent(newvalue)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></Reactquill>
      <button 
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Update Post
      </button>
    </form>
  </>
  )
}

export default EditPost