# Postopia

## Project Purpose
Postopia is a modern forum platform designed to help users share their thoughts, ask questions, and engage in meaningful discussions. The platform offers a clean, user-friendly interface with features tailored to foster a vibrant online community.

## Live URL
[https://postopia-1ce53.web.app/](https://postopia-1ce53.web.app/)

## Key Features
- User Authentication (Email/Password and Google Sign-In)
- Post Creation, Editing, and Deletion
- Commenting on Posts with threaded replies
- Tagging system for posts to categorize content
- Voting system to upvote/downvote posts and comments
- Membership and Badge system for active users
- Admin Dashboard with user management and announcements
- Responsive design for desktop and mobile devices
- Real-time updates and notifications

## Admin Report Management

### Overview  
The Admin Report Management feature allows forum administrators to effectively oversee and moderate all user reports submitted against inappropriate comments or activities. This functionality is designed to help maintain a healthy, respectful, and engaging community environment.

### What Admins Can See  
Admins get access to a comprehensive list of all reports, each displaying key information to help assess and prioritize moderation tasks:

- **Reported Content:** The actual comment or activity text, with an option to expand and read fully.
- **Report Reason:** The feedback or category selected by the reporting user (e.g., spam, offensive language, off-topic).
- **Reporter Details:** Email and name of the user who submitted the report.
- **Report Timestamp:** Date and time when the report was filed.
- **Report Frequency:** Number of times the same content has been reported, helping prioritize urgent cases.

### Admin Actions  
To empower admins with meaningful control, the following actions are implemented:

- **Mark as Reviewed:** Admins can mark reports as reviewed once they’ve been addressed.
- **Delete or Hide Content:** Remove inappropriate comments or activities from public view.
- **Warn or Suspend User:** Issue warnings or suspend users responsible for repeated violations.
- **Dismiss Report:** Ignore reports deemed invalid or non-issues, keeping the moderation queue clean.
- **Make Announcements:** Post announcements or reminders to the community regarding posting guidelines based on trends seen in reports.

### Additional Functionalities  
- **Search and Filter Reports:** Quickly find specific reports by reason, user, or date.
- **Pagination:** Efficiently browse large volumes of reports.
- **Confirmations on Actions:** Prevent accidental moderation through confirmation dialogs.

### UI Design  
The admin interface presents reports in a clear and organized manner, using tables or cards with action buttons. It is fully responsive, enabling admins to moderate content on desktops or mobile devices easily.

### Importance of This Feature  
By giving admins a robust toolset to handle reports, the platform fosters a safer and more positive user experience. Quick resolution of reported content discourages harmful behavior and encourages community engagement.

## NPM Packages Used
- `react` — Frontend UI library
- `react-router-dom` — Client-side routing
- `axios` — HTTP client for API requests
- `react-helmet` / `react-helmet-async` — Manage document head for SEO
- `react-fast-marquee` — Smooth marquee scrolling effects
- `firebase` — Authentication and backend services
- `stripe` — Payment gateway integration
- `tailwindcss` — Utility-first CSS framework for styling
- `daisyui` — Tailwind CSS component library
- `jsonwebtoken` — JWT token generation and verification
- `cors` — Enable CORS in Express backend
- `express` — Node.js web framework
- `mongodb` — Database driver for MongoDB
- `helmet` — Express middleware for security headers
- `sweetalert2` — Beautiful alert messages
- Other utilities and hooks as needed

---

Feel free to customize this README file as per your project updates.

