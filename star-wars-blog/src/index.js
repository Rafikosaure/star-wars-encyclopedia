import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import App from './App'
import { Toaster } from 'sonner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <Toaster />
      <App />
  </ReduxProvider> 
);