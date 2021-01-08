import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import './_sass/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bulma/css/bulma.css';
// import 'bulma-pageloader/dist/css/bulma-pageloader.min.css';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
