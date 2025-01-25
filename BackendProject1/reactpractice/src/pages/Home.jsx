import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Post from '../Components/Post'

function Home() {

  const [posts, setposts] = useState({});
  useEffect(()=> {
    fetch("http://localhost:4000/post").then(response => {
      response.json().then(posts => {
        setposts(posts);
      })
    })
  },[])


  return (
    <div>
     
        <Header/>
        <h1 className='text-2xl text-blue-600 text-center font-bold font-sans mb-5'>Blog Posts</h1>
        {
          posts.length > 0 && 
          
          posts.map(post=> {
            
          return  <Post key={post._id} {...post} />;
          })
        }
    </div>
  )
}

export default Home