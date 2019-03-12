const axios = require('axios');
const express = require('express');


const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://api-test.pfdo.ru");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


const axiosConfig = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer 892ce3dcdac1a13f2b41115dcd6db3958e630bda`,
  },
  data: {  
    "number": "9905000110",  
    "name": "Олег",  
    "soname": "Москаленко",  
    "phname": "Владимирович",  
    "messages_email": "email@gmail.com",
    "birthday":"19.04.2000"
}
}

const instance = axios.create({
  baseURL: 'https://api-test.pfdo.ru/v2/certificates',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 892ce3dcdac1a13f2b41115dcd6db3958e630bda`,
  },
});


instance.get('https://api-test.pfdo.ru/v2/certificates/9905000110', {
  "number": "9905000110",  
  "name": "Олег",  
  "soname": "Москаленко",  
  "phname": "Владимирович",  
  "messages_email": "email@gmail.com",
  "birthday":"19.04.2000"
}).then(res => console.log(res.data)).catch(res => console.log(res));

// const access_token = "892ce3dcdac1a13f2b41115dcd6db3958e630bda"
// axios.get(`https://api-test.pfdo.ru/v2/certificates/9905000110?${access_token}`).then(res => console.log(res.data))


// app.listen(3000, () => console.log('Сервер запущен'));
