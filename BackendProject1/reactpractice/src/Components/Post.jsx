import React from 'react';
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

function Post({_id, title, summary, author, createdAt}) {
  return (
    <>
    
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-10">
      
        <div className="p-6">
        <Link to={`/post/${_id}`}><h1 className="text-2xl font-bold text-blue-600 mb-4">{title}</h1></Link>
          <p>
          <a className="text-blue-500 font-medium">{author.username}</a>
            <span className="text-gray-500 text-sm ml-2">
              <time>{formatISO9075(new Date(createdAt))}</time>
            </span>
          </p>
          <p className="text-gray-700">
            {summary}
          </p>
        </div>
      </div>
     
    </>
  );
}

export default Post;
