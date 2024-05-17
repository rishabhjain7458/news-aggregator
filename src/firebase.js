import { initializeApp } from 'firebase/app'

const firebaseConfig = {

    apiKey: "AIzaSyAjO0DUJzfSUeJ7jLl05J_7dmhwp69gcrk",
  
    authDomain: "news-aggregator-381b1.firebaseapp.com",
  
    projectId: "news-aggregator-381b1",
  
    storageBucket: "news-aggregator-381b1.appspot.com",
  
    messagingSenderId: "238518521555",
  
    appId: "1:238518521555:web:9652b7712f43b48fcdce26",

    databaseURL: 'https://news-aggregator-381b1-default-rtdb.firebaseio.com'
  
  };

  export const app = initializeApp(firebaseConfig);
