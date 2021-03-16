const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post('/post', (req, res) => {
  res.send('Hello World!');
});
app.get('/name/:n', (req,res)=>res.send({name : req.params.n}));
app.get('/', (req,res)=>res.send('<H1>Bonjour</H1>'));
app.get('/home', (req,res)=>res.send('<H1>Bonsoir</H1>'));
app.listen(3000,(() => console.log(`${port}`)))