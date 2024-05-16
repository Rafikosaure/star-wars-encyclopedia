import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import Category from './pages/Category';
import Error404 from './pages/Error404';
import Article from "./pages/Article"
import Blog from './pages/Blog';
import Discussion from './pages/Discussion';
import Header from './components/Header';
import Footer from './components/Footer';
// import TestingPage from './pages/TestingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <Header />
          <Routes>
            {/* <Route path='/testing-page' element={<TestingPage />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path='/article/:paramsIds' element={<Article />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/discussion' element={<Discussion />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        <Footer />
      </Router>
    </ReduxProvider> 
  </React.StrictMode>
);