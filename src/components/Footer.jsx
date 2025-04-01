import { FaGithub, FaLinkedin, FaYoutube, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full h-auto bg-purple-800 rounded-md p-4 text-white py-2 sm:py-2 sm:px-8 mt-5 sm:text-xs">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
        <p className="text-center sm:text-left text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Made with ❤️ by Aslam Beg. All Rights Reserved.
        </p>
        
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 sm:mt-0 sm:text-sm">
          <a
            href="https://mirzaaslambeg.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 flex items-center gap-1"
          >
            <FaGlobe size={20} /> Portfolio
          </a>
          <a
            href="https://github.com/Aslam554"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 flex items-center gap-1"
          >
            <FaGithub size={20} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aslambeg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 flex items-center gap-1"
          >
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a
            href="https://www.youtube.com/@aslamdsa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 flex items-center gap-1"
          >
            <FaYoutube size={20} /> YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
