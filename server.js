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
    'Authorization': `Bearer b277615c608b0866f514a8c444ad9058b8aea6e4`,
  },
});

axios({
  method: 'POST',
  baseURL: `https://api-test.pfdo.ru/oauth2/token`,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer b2ee86c55b01ded14087b950aaa7c1c924e0a152`,
  },
  data: {
    "grant_type": 'refresh_token',
    "refresh_token": '6e94ad3eca0cd571bfe0827094b355da2c5badc2',
    "client_id": "candidate_app",
    "client_secret": "vuejsispower"
  }
})
.then(res => console.log(res.data)).catch(error => console.error(error));

// instance.get('https://api-test.pfdo.ru/v2/certificates/9905000110', {
//   "number": "9905000110",  
//   "name": "Олег",  
//   "soname": "Москаленко",  
//   "phname": "Владимирович",  
//   "messages_email": "email@gmail.com",
//   "birthday":"19.04.2000"
// }).then(res => console.log(res.data)).catch(res => console.log(res));

// const access_token = "892ce3dcdac1a13f2b41115dcd6db3958e630bda"
// axios.get(`https://api-test.pfdo.ru/v2/certificates/9905000110?${access_token}`).then(res => console.log(res.data))


// app.listen(3000, () => console.log('Сервер запущен'));
