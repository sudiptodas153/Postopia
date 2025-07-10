// components/NotificationBell.jsx
import { FaBell } from 'react-icons/fa';

const Notification = ({ count = 0 }) => {
  return (
    <div className="relative cursor-pointer">
      <FaBell className="text-xl text-purple-700" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default Notification;
