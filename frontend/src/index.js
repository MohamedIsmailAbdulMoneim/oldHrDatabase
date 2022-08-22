import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './css/rtl/sb-admin-2.css';
// import './css/plugins/timeline.css';
// import './css/plugins/metisMenu/metisMenu.css';
// import './css/plugins/metisMenu/metisMenu.min.css';
// import './css/font-awesome/font-awesome.min.css'
import All from './All';
import reportWebVitals from './reportWebVitals';
import './fonts/NotoKufiArabic.ttf'
import { BrowserRouter } from 'react-router-dom';
import { install } from "resize-observer";

install()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <All />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
