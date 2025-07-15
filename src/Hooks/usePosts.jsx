// src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';

const usePosts = (page, view) => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  // const {setLoading2} = useAuth();
  const [loading2, setLoading2] = useState(true)

  useEffect(() => {
    // setLoading2(true);
    let url = '';

    if (view === 'popular') {
      url = `/posts/popular?page=${page}`;
    } else if (view === 'comments') {
      url = `/posts-with-comments?page=${page}`;
    } else {
      url = `/all-posts?page=${page}`;
    }

   
    const prevPage = parseInt(localStorage.getItem('prevPage'));
    const prevView = localStorage.getItem('view');

    if (posts.length === 0 || prevView !== view || prevPage !== page) {
      axiosSecure.get(url)
        .then(res => {
          if (res.data.posts) {
            setPosts(res.data.posts);
            setTotalPages(res.data.totalPages);
          } else {
            setPosts(res.data);
            setTotalPages(1);
          }
          setLoading2(false);
          localStorage.setItem('view', view);
          localStorage.setItem('prevPage', page); // ✅ নতুন পেজ সেভ করো
        })
        .catch(() => {
          setLoading2(false);
        });
    }

  }, [page, view, axiosSecure]);


  return { posts, totalPages, loading2, setPosts };
};

export default usePosts;
