import express from 'express';
import path from 'path';

var app = express();

app.use(express.static(path.resolve(__dirname, './public/')));

app.get('/*', (req, res) => {
  res.sendFile('index.html', {
    root: 'public/'
  });
});

var server = app.listen(5000, () => {
  console.log('Listening on port 5000');
});

export default server;