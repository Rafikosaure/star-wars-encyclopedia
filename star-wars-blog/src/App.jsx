import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/scrollToTop';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Category from './pages/Category/Category';
import Error404 from './pages/Error404/Error404';
import Article from "./pages/Article/Article"
import Forum from './pages/Forum/Forum';
import Topics from './pages/Topics/Topics';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Topic from './pages/Topic/Topic'
import Account from './pages/Account/Account';
import Admin from './pages/Admin/Admin';
import Legal from './pages/Legal/Legal';
import ShoppingPage from './pages/ShoppingPage/ShoppingPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MarketPage from './pages/MarketPage/MarketPage';
import ProductPage from './pages/ProductPage/ProductPage';
import BasketPage from './pages/BasketPage/BasketPage';
import Success from './pages/Success/Success';



export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/auth' element={<Auth />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path='/article/:paramsIds' element={<Article />} />
              <Route path='/forum' element={<Forum />} />
              <Route path='/topics/:topicsCategoryId' element={<Topics />} />
              <Route path='/account' element={<Account />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/topic/:topicId/page/:page' element={<Topic />} />
              <Route path='/movies' element={<MoviesPage />} />
              <Route path='/shopping' element={<ShoppingPage />}>
                <Route path='market' element={<MarketPage />} />
                <Route path='product/:productId' element={<ProductPage />} />
              </Route>
              <Route path='/basket' element={<BasketPage />} />
              <Route path='/legal' element={<Legal />} />
              <Route path='/success' element={<Success />} />
              <Route path='*' element={<Error404 />} />
            </Routes>
          <Footer />
      </Router>
    </>
  )
}
