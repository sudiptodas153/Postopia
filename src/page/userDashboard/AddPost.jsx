import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const AddPost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [postCount, setPostCount] = useState(0);
    const {
        register,
        handleSubmit,
        control,
        reset
    } = useForm();

    const tagOptions = [
        { value: 'react', label: 'React' },
        { value: 'mern', label: 'MERN' },
        { value: 'javascript', label: 'JavaScript' },
    ];

    // Fetch post count
    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:5000/api/posts/count?email=${user.email}`)
                .then((res) => setPostCount(res.data.count))
                .catch((err) => console.error(err));
        }
    }, [user]);

    // Submit form
    const onSubmit = async (data) => {
        console.log(data)
        const newPost = {
            authorName: user.displayName,
            authorEmail: user.email,
            authorImage: user.photoURL,
            title: data.title,
            description: data.description,
            tag: data.tag?.value || '',
            upVote: 0,
            downVote: 0,
            createdAt: new Date(),
        };

        try {
            await axios.post('http://localhost:5000/api/posts', newPost);
            reset(); // clear form
            navigate('/user-dashboard/myPosts');
        } catch (error) {
            console.error('Post failed:', error);
        }
    };

    // If post limit reached
    if (postCount >= 5) {
        return (
            <div className="text-center mt-10 px-4">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Post Limit Reached</h2>
                <p className="mb-4 text-gray-600">You can only add 5 posts as a free user.</p>
                <button
                    onClick={() => navigate('/membership')}
                    className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                >
                    Become a Member 🚀
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 border p-6 rounded-xl shadow-md bg-white px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">📝 Add New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Author Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered w-full"
                        placeholder="Author Name"
                    />
                    <input
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                        placeholder="Author Email"
                    />
                    <input
                        value={user?.photoURL}
                        readOnly
                        className="input input-bordered w-full"
                        placeholder="Author Image"
                    />
                </div>

                {/* Post Title */}
                <input
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="Post Title"
                    className="input input-bordered w-full"
                />

                {/* Description */}
                <textarea
                    {...register("description", { required: true })}
                    placeholder="Post Description"
                    className="textarea textarea-bordered w-full"
                />

                {/* Tag (with react-select + Controller) */}
                <Controller
                    name="tag"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={tagOptions}
                            placeholder="Select a Tag"
                            className="w-full"
                        />
                    )}
                />

                {/* Submit Button */}
                <div className="text-center pt-4">
                    <button type="submit" className="btn btn-primary w-full sm:w-1/2">
                        ➕ Submit Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
