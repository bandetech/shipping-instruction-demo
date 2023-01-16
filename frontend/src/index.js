import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {App} from './App';
import {Confirm} from './components/Confirm';
import {Submitted} from './components/Submitted';
import { OrderListProvider } from './providers/OrderListProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OrderListProvider>
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<App />} />
        <Route path={`/confirm`} element={<Confirm />} />
        <Route path={`/submitted`} element={<Submitted />} />
      </Routes>
    </BrowserRouter>
    </OrderListProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
