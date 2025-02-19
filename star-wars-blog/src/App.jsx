import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './sharedFunctions/scrollToTop';
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
import Laboratory from './pages/Laboratory/Laboratory';


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
              <Route path='/legal' element={<Legal />} />
              <Route path='/laboratory' element={<Laboratory />} />
              <Route path='*' element={<Error404 />} />
            </Routes>
          <Footer />
      </Router>
    </>
  )
}
