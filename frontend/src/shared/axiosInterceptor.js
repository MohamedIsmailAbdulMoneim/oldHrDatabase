import axios from 'axios';

let counter=0;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    if(counter === 0&& !document.getElementById('cover-spin')) {

        var root = document.getElementById('root');

        root.insertAdjacentHTML('afterbegin', '<div id="cover-spin"></div>');
    }
    counter++;

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    counter--;


        if(counter === 0&& document.getElementById('cover-spin')) {

            document.getElementById('cover-spin').remove();
        }
 

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    counter--;


        if(counter === 0&& document.getElementById('cover-spin')) {

            document.getElementById('cover-spin').remove();
        }

    return Promise.reject(error);
  });

export default axios;