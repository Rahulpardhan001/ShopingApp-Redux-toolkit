import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './reduxToolkit/Store.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={100} hideProgressBar={true} closeOnClick/>
  </Provider>
  </BrowserRouter>
  </StrictMode>,
)
