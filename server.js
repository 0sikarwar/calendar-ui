const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(compression());

app.use('/', express.static(path.join(__dirname,'build/')));

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'build/index.html'));
})

app.listen(9000, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at 9000`);
});
