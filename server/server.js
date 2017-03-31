const express = require('express');
const port = 8080;
const jwtSecret = require('./config').jwtSecret;
const fs = require('fs');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./../webpack.config.js');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const mongoose = require('mongoose');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/ts');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/protected', expressJWT({ secret: jwtSecret }));
app.use('/', router);
app.use(webpackMiddleware(webpack(webpackConfig), {
    noInfo: false,
    quiet: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    publicPath: '/dist/',
    index: '/index.html',
    serverSideRender: false
  }
));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Listening on port:' + port);
});
