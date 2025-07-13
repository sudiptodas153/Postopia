import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const MakeAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [image, setImage] = useState('');

    const queryClient = useQueryClient();

    const onSubmit = async (data) => {
        if (!image) {
            return Swal.fire('Error', 'Please upload an image', 'error');
        }

        const announcementData = {
            ...data,
            authorImage: image,
            createdAt: new Date()
        };

        await axiosSecure.post('/announcements', announcementData);
        Swal.fire('Success', 'Announcement created!', 'success');
        setImage('');
        reset();

        // ✅ Navbar-এর announcement count আপডেট করার জন্য:
        queryClient.invalidateQueries({ queryKey: ['announcements'] });
    };


    const handleImage = async e => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
        try {
            const res = await axios.post(imageUrl, formData);
            setImage(res.data.data.url);
            Swal.fire('Image Uploaded', '', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Image Upload Failed', '', 'error');
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="file"
                    required
                    onChange={handleImage}
                    className="file-input file-input-bordered w-full"
                />
                <input {...register('authorName')} placeholder="Author Name" className="input input-bordered w-full" />
                <input {...register('title')} placeholder="Title" className="input input-bordered w-full" />
                <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered w-full" />
                <button type="submit" className="btn text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7] w-full">Post Announcement</button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
