import axios from 'axios';
  
 export const HTTP = axios.create({
    baseURL: "https://marketingapi.seruce.com/api/v1",
    withCredentials: true,
    // // 'Access-Control-Allow-Credentials' : true,
    // headers: {
    //   'Content-Type' : 'application/json',
    //   'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
    // }
    // ,
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
})