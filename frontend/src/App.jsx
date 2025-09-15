import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import ScrollToTop from './utils/scrollToTop';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Category from './pages/Category/Category';
import Error404 from './pages/Error404/Error404';
import Article from './pages/Article/Article';
import Forum from './pages/Forum/Forum';
import Topics from './pages/Topics/Topics';
import Topic from './pages/Topic/Topic';
import Account from './pages/Account/Account';
import Admin from './pages/Admin/Admin';
import Legal from './pages/Legal/Legal';
import ShoppingPage from './pages/ShoppingPage/ShoppingPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MarketPage from './pages/MarketPage/MarketPage';
import ProductPage from './pages/ProductPage/ProductPage';
import BasketPage from './pages/BasketPage/BasketPage';
import Success from './pages/Success/Success';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ReturnToTop from './components/ReturnToTop/ReturnToTop';


// 👇 Layout pour entourer toutes les routes
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet /> {/* Rend les enfants (routes imbriquées) ici */}
      <ReturnToTop />
      <Footer />
    </>
  );
}


// 👇 Définition des routes au format V7
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <Auth /> },
      { path: 'category/:categoryId', element: <Category /> },
      { path: 'article/:paramsIds', element: <Article /> },
      { path: 'forum', element: <Forum /> },
      { path: 'topics/:topicsCategoryId', element: <Topics /> },
      { path: 'account', element: <Account /> },
      { path: 'admin', element: <Admin /> },
      { path: 'topic/:topicId/page/:page', element: <Topic /> },
      { path: 'movies', element: <MoviesPage /> },
      {
        path: 'shopping',
        element: <ShoppingPage />,
        children: [
          { path: 'market', element: <MarketPage /> },
          { path: 'product/:productId', element: <ProductPage /> },
        ],
      },
      { path: 'basket', element: <BasketPage /> },
      { path: 'legal', element: <Legal /> },
      { path: 'success', element: <Success /> },
    ],
  },
]);


// 👇 Le composant principal
export default function App() {
  return <RouterProvider router={router} />;
}
