import React, { useEffect, useState } from 'react';
import { MdSpeakerNotes } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axiosSecure.get('/announcements');
                setAnnouncements(res.data);
            } catch (error) {
                console.error('Failed to load announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [axiosSecure]);

    if (announcements.length === 0) return null;

    return (
        <section className=" px-4 py-8 bg-white rounded-lg shadow-lg border border-purple-300 ">
            <div className="flex items-center gap-3 border-b pb-3 mb-6">
                <h2 className="text-2xl font-bold text-purple-700">📢 Announcements</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {announcements.map((announcement) => (
                    <div
                        key={announcement._id}
                        className="border border-purple-100 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-sm overflow-hidden flex flex-col"
                    >
                        {announcement.authorImage && (
                           
                                <img
                                    src={announcement.authorImage}
                                    alt="Announcement"
                                    className="w-full h-64"
                                />
                           
                        )}

                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-purple-800 mb-1">
                                {announcement.title}
                            </h3>

                            <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                                {announcement.description?.length > 300
                                    ? announcement.description.slice(0, 300) + '...'
                                    : announcement.description}
                            </p>

                            <p className="text-xs text-gray-500 mt-3 italic">
                                Published on: {new Date(announcement.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnnouncementList;
