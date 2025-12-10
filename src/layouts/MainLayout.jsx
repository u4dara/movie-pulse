import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer.jsx';

const MainLayout = () => {
   return (
      <>
         <Outlet />
         <Footer />
      </>
   );
};
export default MainLayout;
