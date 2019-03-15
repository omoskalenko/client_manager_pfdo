const axios = require('axios');
const express = require('express');


const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.put('/activate', function(req, res, next) {
  axios({
    method: 'PUT',
    baseURL: `https://api-test.pfdo.ru/v2/certificates/9905000110/actual`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 97fb44c5fe492b3e57704d89b6075549f2e39604`,
    },
    data: req.data
  }).then(pfdo_req => {
    res.send(pfdo_req);
  })
 
});

app.listen(3000, () => console.log('Сервер запущен'));

// app.post('/', function(req, res, next) {
//  // Handle the post for this route
// });




// const axiosConfig = {
//   headers: {
//     'Accept': 'application/json',
//     'Authorization': `Bearer 892ce3dcdac1a13f2b41115dcd6db3958e630bda`,
//   },
//   data: {  
//     "number": "9905000110",  
//     "name": "Олег",  
//     "soname": "Москаленко",  
//     "phname": "Владимирович",  
//     "messages_email": "email@gmail.com",
//     "birthday":"19.04.2000"
// }
// }

// const instance = axios.create({
//   baseURL: 'https://api-test.pfdo.ru/v2/certificates',
//   timeout: 1000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer b277615c608b0866f514a8c444ad9058b8aea6e4`,
//   },
// });

// axios({
//   method: 'PUT',
//   baseURL: `https://api-test.pfdo.ru/v2/certificates/9905000110/actual`,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer 97fb44c5fe492b3e57704d89b6075549f2e39604`,
//   },
//   data: {     
//     "actual": 1
// }
// })
// .then(res => console.log(res.data)).catch(error => console.error(error));

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



