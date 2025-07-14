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
        <section className="px-4 py-10 bg-white rounded-lg shadow-lg border border-purple-300 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 border-b pb-4 mb-6 justify-center sm:justify-start">
                <MdSpeakerNotes className="text-purple-600 text-2xl" />
                <h2 className="text-2xl font-bold text-purple-700">Announcements</h2>
            </div>

            <div className="space-y-6">
                {announcements.map((announcement) => (
                    <div
                        key={announcement._id}
                        className="border border-purple-100 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-sm p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-md transition duration-300"
                    >
                        {/* Author Image */}
                        {announcement.authorImage && (
                            <img
                                src={announcement.authorImage}
                                alt="Author"
                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border-2 border-purple-300"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1 w-full text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-800">
                                    {announcement.title}
                                </h3>
                                <span className="text-xs text-gray-500 italic">
                                    Published: {new Date(announcement.createdAt).toLocaleString()}
                                </span>
                            </div>

                            <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                                {announcement.description?.length > 300
                                    ? `${announcement.description.slice(0, 300)}...`
                                    : announcement.description}
                            </p>

                            <p className="mt-3 text-sm text-gray-600">
                                <span className="font-medium text-purple-600">By:</span>{' '}
                                {announcement.authorName || 'Admin'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnnouncementList;
