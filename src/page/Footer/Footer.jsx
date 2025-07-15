import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Logo from '../../Components/Logo/Logo';

const Footer = () => {
    return (
        <footer className="bg-[#ad4df142]  md:h-44 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Left side */}
                <div className="mb-6 md:mb-0 text-center md:text-left">
                   <Logo></Logo>
                    <p className="text-sm mt-3">© {new Date().getFullYear()} Postpia. All rights reserved.</p>
                </div>

                {/* Center - Navigation */}
                <nav className="flex gap-6 mb-6 md:mb-0">
                    <a href="/" className="hover:text-white transition">Home</a>
                    <a href="/top" className="hover:text-white transition">Leaderboard</a>
                    <a href="/about" className="hover:text-white transition">About</a>
                    <a href="/contact" className="hover:text-white transition">Contact</a>
                </nav>

                {/* Right side - Social Icons */}
                <div className="flex gap-5 ">
                    <a href="https://www.facebook.com/sudipto.das.601834" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition">
                        <FaFacebookF size={20} />
                    </a>
                  
                    <a href="https://www.linkedin.com/in/sudiptodas59/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition">
                        <FaLinkedinIn size={20} />
                    </a>
                    <a href="https://github.com/sudiptodas153" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition">
                        <FaGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
