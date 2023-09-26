import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostForm from '../post/PostForm';
import FeedHeader from '../feed_header/FeedHeader';


const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          sortByDate(data.posts)
          setPosts(data.posts);
         
        })
    }
  }, [])
    
  const sortByDate = (array) => {
    array.sort((a,b) => { 
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  
    if(token) {
      return(
        <>
          <FeedHeader logout={logout} />
          <h2>Posts</h2>
          <PostForm token={ token } setToken={ setToken }/>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } token={token} setToken={setToken} /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
