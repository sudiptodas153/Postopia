// src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePosts = (page, view) => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const {setLoading2} = useAuth()

  useEffect(() => {
//    setLoading2(true)
    let url = '';

    if (view === 'popular') {
      url = `/posts/popular?page=${page}`;
    } else if (view === 'comments') {
      url = `/posts-with-comments?page=${page}`;
    } else {
      url = `/all-posts?page=${page}`;
    }

    axiosSecure.get(url)
      .then(res => {
        // backend sends {posts, totalPosts, currentPage, totalPages} except posts-with-comments 
        // যেহেতু /posts-with-comments route তে তুমি এই ফরম্যাট দিয়েছো
        if (res.data.posts) {
          setPosts(res.data.posts);
          setTotalPages(res.data.totalPages);
        } else {
          setPosts(res.data);
          setTotalPages(1);
        }
        setLoading2(false);
        
      })
      .catch(() =>{
        setLoading2(false);
      });
  }, [page, view, axiosSecure]);

  return { posts, totalPages};
};

export default usePosts;
