import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MakeAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        await axiosSecure.post('/announcements', data);
        Swal.fire('Success', 'Announcement created!', 'success');
        reset();
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register('authorImage')} placeholder="Author Image URL" className="input input-bordered w-full" />
                <input {...register('authorName')} placeholder="Author Name" className="input input-bordered w-full" />
                <input {...register('title')} placeholder="Title" className="input input-bordered w-full" />
                <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered w-full" />
                <button className="btn btn-primary">Post Announcement</button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
