import { FaXTwitter, FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa6';

const Footer = () => {
   return (
      <div className="footer">
         <div className="flex flex-col items-center gap-5 text-gray-500 my-8 md:flex-row md:justify-center">
            <p>Browse Movies</p>
            <p>Requests</p>
            <p>Contact</p>
            <p>Language</p>
         </div>
         <div>
            <div className="">
               <div className="social-icons flex justify-center gap-5 text-gray-500">
                  <FaXTwitter size={20} />
                  <FaLinkedin size={20} />
                  <FaFacebook size={20} />
                  <FaGithub size={20} />
               </div>
               <div>
                  <p className="copyright-text my-5 flex justify-center text-gray-500">
                     &copy; 2025 MoviePulse. All rights reserved.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Footer;
