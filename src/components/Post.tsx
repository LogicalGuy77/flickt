"use client";

import Image from 'next/image';
import Heart from "react-animated-heart";
import { useState } from 'react';

interface PostProps {
  imageProfile: string;
  imagePost: string;
  title: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ imageProfile, imagePost, title, content }) => {
  const [isClick, setClick] = useState(false);
  const [comment, setComment] = useState('');
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log(comment); 
    setComment('');
  };

  return (
    <div className="relative z-[10] w-[45vw] border-2 border-gray-700 p-2 rounded-md m-3 text-white">
      <div className="flex m-3">
        <Image 
          src={imageProfile} 
          width={32} 
          height={32} 
          className="rounded-full h-8 w-8 mr-3" 
          alt={`${title} profile picture`} 
        />
        <div className='flex flex-col'>
          <h1 className="text-xl font-bold">{title}</h1>
          <p>{content}</p>
          <Image 
            src={imagePost} 
            width={400} 
            height={500} 
            className="rounded-2xl object-cover" 
            alt={`Post image of ${title}`} 
          />  
        </div>
      </div>
      
      <div className='w-full flex items-center ml-3 pr-5'>
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
        <textarea 
          name="comment" 
          id="comment" 
          className='bg-transparent border-2 border-gray-50 rounded-full h-10 w-[70%] p-1.5 overflow-hidden' 
          placeholder='comment'
          value={comment}
          onChange={handleCommentChange}
        />
       
          <button 
            type='button' 
            onClick={handleCommentSubmit} 
            className='bg-blue-500 text-white rounded-full px-3 py-1 ml-2 w-15'
          >
            Comment
          </button>

      </div>
    </div>
  );
}

export default Post;
