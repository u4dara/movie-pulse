import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import MoviePage from './pages/MoviePage.jsx';

const App = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:id" element={<MoviePage />} />
         </Route>
      )
   );
   return <RouterProvider router={router} />;
};
export default App;
