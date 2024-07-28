import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Category from './pages/Category';
import Error404 from './pages/Error404';
import Article from "./pages/Article"
import Forum from './pages/Forum';
import Topics from './pages/Topics';
import Header from './components/Header';
import Footer from './components/Footer';
import Topic from './pages/Topic'
import Account from './pages/Account';
import TestPage from './pages/TestPage';


export default function App() {
  return (
    <>
      <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/auth' element={<Auth />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path='/article/:paramsIds' element={<Article />} />
              <Route path='/forum' element={<Forum />} />
              <Route path='/topics/:topicsCategoryId' element={<Topics />} />
              <Route path='/account' element={<Account />} />
              <Route path='/topic/:topicId' element={<Topic />} />
              <Route path='/testPage' element={<TestPage />} />
              <Route path='*' element={<Error404 />} />
          </Routes>
          <Footer />
      </Router>
    </>
  )
}
