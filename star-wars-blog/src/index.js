import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import App from './App'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider> 
  </React.StrictMode>
);