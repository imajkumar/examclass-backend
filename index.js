'use strict';
 
const express = require('express');
 
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('Hello World AP CICD....test');
=======
  res.send('Hello World AP CICD... completed.');
>>>>>>> 096e5d670874c7cd95d9b48593fb11979954f0e1
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
