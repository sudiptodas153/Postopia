import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const MyPosts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/posts?email=${user.email}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="overflow-x-auto md:h-96 max-w-5xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">My Posts</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Post Title</th>
            <th className="p-3 border-b">Votes</th>
            <th className="p-3 border-b">Comment</th>
            <th className="p-3 border-b">Delete</th>
          </tr>
        </thead>
        <tbody className="">
          {posts.length === 0 && (
            <tr>
              <td colSpan="4" className="md:h-40 text-center p-4 text-gray-600">
                No posts found.
              </td>
            </tr>
          )}
          {posts.map(({ _id, title, upVote, downVote }) => (
            <tr
              key={_id}
              className="hover:bg-gray-50 cursor-default text-center"
            >
              <td className="p-3 border-b">{title}</td>
              <td className="p-3 border-b">
                {upVote - downVote}
              </td>
              <td className="p-3 border-b">
                <button
                  onClick={() => navigate(`/comments/${_id}`)}
                  className="btn btn-sm btn-info"
                >
                  Comments
                </button>
              </td>
              <td className="p-3 border-b">
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;
